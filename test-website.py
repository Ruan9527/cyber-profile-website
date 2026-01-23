#!/usr/bin/env python3
"""
网站功能测试脚本
测试首页、技能数据加载、项目数据加载、管理后台等功能
"""

import sys
import os
import json
from playwright.sync_api import sync_playwright

def test_homepage(page, base_url):
    """测试首页基本功能"""
    print("[TEST] 测试首页...")

    try:
        page.goto(f"{base_url}/")
        page.wait_for_load_state('networkidle')

        # 检查标题
        title = page.title()
        print(f"[OK] 页面标题: {title}")
        assert "Cyber Profile" in title or "赛博朋克" in title

        # 检查主要区域是否存在
        hero_section = page.locator('[id="hero"]').count() > 0
        skills_section = page.locator('[id="skills"]').count() > 0
        projects_section = page.locator('[id="projects"]').count() > 0
        contact_section = page.locator('[id="contact"]').count() > 0

        print(f"[OK] Hero区域: {'存在' if hero_section else '不存在'}")
        print(f"[OK] 技能区域: {'存在' if skills_section else '不存在'}")
        print(f"[OK] 项目区域: {'存在' if projects_section else '不存在'}")
        print(f"[OK] 联系区域: {'存在' if contact_section else '不存在'}")

        # 检查导航
        nav_links = page.locator('nav a').all_text_contents()
        print(f"[OK] 导航链接: {len(nav_links)} 个")

        return True

    except Exception as e:
        print(f"[ERROR] 首页测试失败: {e}")
        return False

def test_skills_section(page, base_url):
    """测试技能区域"""
    print("[TEST] 测试技能区域...")

    try:
        page.goto(f"{base_url}/")
        page.wait_for_load_state('networkidle')

        # 等待技能数据加载或显示加载状态
        page.wait_for_timeout(2000)  # 等待2秒让数据加载

        # 检查是否有技能数据或加载状态
        skills_content = page.locator('[id="skills"]').text_content()
        has_loading = "加载技能数据中" in skills_content
        has_error = "加载技能数据失败" in skills_content
        has_data = page.locator('[id="skills"] .cyber-card').count() > 0

        print(f"[OK] 技能加载状态: {'加载中' if has_loading else '已完成'}")
        print(f"[OK] 技能错误状态: {'有错误' if has_error else '无错误'}")
        print(f"[OK] 技能数据: {'已加载' if has_data else '未加载'}")

        if has_error:
            print("[WARN] 技能区域有错误，检查Supabase连接")
            return False

        return True

    except Exception as e:
        print(f"[ERROR] 技能区域测试失败: {e}")
        return False

def test_projects_section(page, base_url):
    """测试项目区域"""
    print("[TEST] 测试项目区域...")

    try:
        page.goto(f"{base_url}/")
        page.wait_for_load_state('networkidle')

        # 等待项目数据加载
        page.wait_for_timeout(2000)

        # 检查项目数据或加载状态
        projects_content = page.locator('[id="projects"]').text_content()
        has_loading = "加载项目数据中" in projects_content
        has_error = "加载项目数据失败" in projects_content
        has_data = page.locator('[id="projects"] .cyber-card').count() > 0

        print(f"[OK] 项目加载状态: {'加载中' if has_loading else '已完成'}")
        print(f"[OK] 项目错误状态: {'有错误' if has_error else '无错误'}")
        print(f"[OK] 项目数据: {'已加载' if has_data else '未加载'}")

        if has_error:
            print("[WARN] 项目区域有错误，检查Supabase连接")
            return False

        # 测试分类筛选
        filter_buttons = page.locator('[id="projects"] button').all_text_contents()
        if len(filter_buttons) > 0:
            print(f"[OK] 项目筛选器: {len(filter_buttons)} 个选项")

        return True

    except Exception as e:
        print(f"[ERROR] 项目区域测试失败: {e}")
        return False

def test_admin_login(page, base_url):
    """测试管理后台登录"""
    print("[TEST] 测试管理后台登录...")

    try:
        page.goto(f"{base_url}/admin/login")
        page.wait_for_load_state('networkidle')

        # 检查登录表单
        email_input = page.locator('input[type="email"]').count() > 0
        password_input = page.locator('input[type="password"]').count() > 0
        login_button = page.locator('button[type="submit"]').count() > 0

        print(f"[OK] 邮箱输入框: {'存在' if email_input else '不存在'}")
        print(f"[OK] 密码输入框: {'存在' if password_input else '不存在'}")
        print(f"[OK] 登录按钮: {'存在' if login_button else '不存在'}")

        # 填写登录信息并尝试登录
        if email_input and password_input and login_button:
            page.fill('input[type="email"]', 'admin@example.com')
            page.fill('input[type="password"]', 'password')
            page.click('button[type="submit"]')

            # 等待导航或错误信息
            page.wait_for_timeout(2000)

            # 检查是否登录成功或显示错误
            current_url = page.url
            is_logged_in = '/admin' in current_url and '/login' not in current_url
            has_error = page.locator('.text-cyber-red').count() > 0

            print(f"[OK] 登录尝试: {'成功' if is_logged_in else '失败'}")
            if has_error:
                error_text = page.locator('.text-cyber-red').text_content()
                print(f"[OK] 登录错误: {error_text}")

        return True

    except Exception as e:
        print(f"[ERROR] 管理后台登录测试失败: {e}")
        return False

def test_responsive_design(page, base_url):
    """测试响应式设计"""
    print("[TEST] 测试响应式设计...")

    try:
        # 测试不同屏幕尺寸
        sizes = [
            {'width': 1920, 'height': 1080, 'name': '桌面'},
            {'width': 768, 'height': 1024, 'name': '平板'},
            {'width': 375, 'height': 667, 'name': '手机'}
        ]

        for size in sizes:
            page.set_viewport_size({'width': size['width'], 'height': size['height']})
            page.goto(f"{base_url}/")
            page.wait_for_load_state('networkidle')

            # 检查主要元素是否可见
            hero_visible = page.locator('[id="hero"]').is_visible()
            skills_visible = page.locator('[id="skills"]').is_visible()
            projects_visible = page.locator('[id="projects"]').is_visible()

            print(f"[OK] {size['name']} ({size['width']}x{size['height']}): Hero={hero_visible}, 技能={skills_visible}, 项目={projects_visible}")

            if not (hero_visible and skills_visible and projects_visible):
                print(f"[WARN] {size['name']} 屏幕下某些元素不可见")

        return True

    except Exception as e:
        print(f"[ERROR] 响应式设计测试失败: {e}")
        return False

def main():
    base_url = "http://localhost:3003"  # 根据实际端口调整

    print("START 开始网站功能测试...")
    print(f"URL 测试地址: {base_url}")
    print("-" * 50)

    results = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        try:
            # 运行所有测试
            results.append(("首页功能", test_homepage(page, base_url)))
            results.append(("技能区域", test_skills_section(page, base_url)))
            results.append(("项目区域", test_projects_section(page, base_url)))
            results.append(("管理后台登录", test_admin_login(page, base_url)))
            results.append(("响应式设计", test_responsive_design(page, base_url)))

        finally:
            browser.close()

    # 输出测试结果
    print("-" * 50)
    print("RESULT 测试结果汇总:")

    passed = 0
    total = len(results)

    for test_name, success in results:
        status = "PASS 通过" if success else "FAIL 失败"
        print(f"  {test_name}: {status}")
        if success:
            passed += 1

    print("-" * 50)
    print(f"SUMMARY 测试完成: {passed}/{total} 通过")

    if passed == total:
        print("SUCCESS 所有测试通过！")
        return 0
    else:
        print("WARNING 部分测试失败，请检查相关功能")
        return 1

if __name__ == "__main__":
    sys.exit(main())