import { useState, useCallback } from 'react'

export interface FormError {
  field: string
  message: string
}

export interface FormValidationConfig {
  minNameLength?: number
  maxNameLength?: number
  minMessageLength?: number
  maxMessageLength?: number
  requireEmail?: boolean
  requireSubject?: boolean
}

export function useFormValidation(config: FormValidationConfig = {}) {
  const {
    minNameLength = 2,
    maxNameLength = 50,
    minMessageLength = 10,
    maxMessageLength = 500,
    requireEmail = true,
    requireSubject = false
  } = config

  const [errors, setErrors] = useState<FormError[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [characterCounts, setCharacterCounts] = useState<Record<string, number>>({})

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }, [])

  const validateName = useCallback((name: string): boolean => {
    const trimmed = name.trim()
    return trimmed.length >= minNameLength && trimmed.length <= maxNameLength
  }, [minNameLength, maxNameLength])

  const validateMessage = useCallback((message: string): boolean => {
    const trimmed = message.trim()
    return trimmed.length >= minMessageLength && trimmed.length <= maxMessageLength
  }, [minMessageLength, maxMessageLength])

  const validateSubject = useCallback((subject: string): boolean => {
    if (!requireSubject) return true
    const trimmed = subject.trim()
    return trimmed.length >= 3 && trimmed.length <= 100
  }, [requireSubject])

  const validateForm = useCallback((formData: Record<string, any>): FormError[] => {
    const newErrors: FormError[] = []

    if (formData.name !== undefined) {
      if (!validateName(formData.name)) {
        if (formData.name.trim().length < minNameLength) {
          newErrors.push({
            field: 'name',
            message: `Name must be at least ${minNameLength} characters`
          })
        } else if (formData.name.trim().length > maxNameLength) {
          newErrors.push({
            field: 'name',
            message: `Name must be less than ${maxNameLength} characters`
          })
        } else {
          newErrors.push({
            field: 'name',
            message: 'Name is required'
          })
        }
      }
    }

    if (formData.email !== undefined && requireEmail) {
      if (!validateEmail(formData.email)) {
        newErrors.push({
          field: 'email',
          message: 'Please enter a valid email address'
        })
      }
    }

    if (formData.content !== undefined) {
      if (!validateMessage(formData.content)) {
        if (formData.content.trim().length < minMessageLength) {
          newErrors.push({
            field: 'content',
            message: `Message must be at least ${minMessageLength} characters`
          })
        } else if (formData.content.trim().length > maxMessageLength) {
          newErrors.push({
            field: 'content',
            message: `Message must be less than ${maxMessageLength} characters`
          })
        } else {
          newErrors.push({
            field: 'content',
            message: 'Message is required'
          })
        }
      }
    }

    if (formData.subject !== undefined && requireSubject) {
      if (!validateSubject(formData.subject)) {
        if (formData.subject.trim().length < 3) {
          newErrors.push({
            field: 'subject',
            message: 'Subject must be at least 3 characters'
          })
        } else if (formData.subject.trim().length > 100) {
          newErrors.push({
            field: 'subject',
            message: 'Subject must be less than 100 characters'
          })
        } else {
          newErrors.push({
            field: 'subject',
            message: 'Subject is required'
          })
        }
      }
    }

    return newErrors
  }, [validateName, validateEmail, validateMessage, validateSubject, minNameLength, maxNameLength, minMessageLength, maxMessageLength, requireEmail, requireSubject])

  const handleFieldChange = useCallback((field: string, value: string) => {
    setCharacterCounts(prev => ({
      ...prev,
      [field]: value.length
    }))

    // Clear error for this field if user starts typing
    setErrors(prev => prev.filter(error => error.field !== field))
  }, [])

  const clearErrors = useCallback(() => {
    setErrors([])
  }, [])

  const clearFieldError = useCallback((field: string) => {
    setErrors(prev => prev.filter(error => error.field !== field))
  }, [])

  const getFieldError = useCallback((field: string): string | null => {
    const error = errors.find(e => e.field === field)
    return error ? error.message : null
  }, [errors])

  const getCharacterCount = useCallback((field: string): number => {
    return characterCounts[field] || 0
  }, [characterCounts])

  const getMaxLength = useCallback((field: string): number => {
    switch (field) {
      case 'name': return maxNameLength
      case 'content': return maxMessageLength
      case 'subject': return 100
      default: return 255
    }
  }, [maxNameLength, maxMessageLength])

  return {
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    validateEmail,
    validateName,
    validateMessage,
    validateSubject,
    validateForm,
    handleFieldChange,
    clearErrors,
    clearFieldError,
    getFieldError,
    getCharacterCount,
    getMaxLength,
    characterCounts
  }
}

export default useFormValidation