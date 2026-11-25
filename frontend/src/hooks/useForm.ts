import { useState, type ChangeEvent, type FormEvent } from 'react'
import { getErrorMessage } from '@/api/errors'
import type { FieldErrors } from '@/types/form'

interface UseFormOptions<T> {
  initialValues: T
  validate: (values: T) => FieldErrors<T>
  /** Csak érvényes adatokkal hívódik. Dobott hiba esetén a `submitError` jelenik meg. */
  onSubmit: (values: T) => Promise<void>
}

/**
 * Egyszerű, újrafelhasználható űrlapkezelés:
 * értékek, mezőnkénti hibák, beküldési (betöltési) állapot és szerverhiba.
 * Az első beküldési kísérlet után gépelés közben is újraellenőriz.
 */
export function useForm<T extends { [K in keyof T]: string }>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValuesState] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FieldErrors<T>>({})
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const setValues = (next: T) => {
    setValuesState(next)
    setErrors(hasTriedSubmit ? validate(next) : {})
    setSubmitError(null)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    setHasTriedSubmit(true)
    const nextErrors = validate(values)
    setErrors(nextErrors)

    const firstInvalidField = Object.keys(nextErrors)[0]
    if (firstInvalidField) {
      const element = event.currentTarget.elements.namedItem(firstInvalidField)
      if (element instanceof HTMLElement) element.focus()
      return
    }

    setSubmitError(null)
    setIsSubmitting(true)
    try {
      await onSubmit(values)
    } catch (error) {
      setSubmitError(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return { values, errors, isSubmitting, submitError, handleChange, handleSubmit, setValues }
}
