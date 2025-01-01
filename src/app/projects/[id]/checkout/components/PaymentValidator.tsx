'use client'

import { useState, useEffect } from 'react'
import { mockValidatePayment } from '@/mocks/payment'

interface Props {
  paymentId: string
  onValidationComplete: (success: boolean) => void
}

export default function PaymentValidator({ paymentId, onValidationComplete }: Props) {
  const [validating, setValidating] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const validatePayment = async () => {
      try {
        const isValid = await mockValidatePayment(paymentId)
        if (isValid) {
          onValidationComplete(true)
        } else {
          setError('결제 검증에 실패했습니다.')
          onValidationComplete(false)
        }
      } catch (err) {
        setError('결제 검증 중 오류가 발생했습니다.')
        onValidationComplete(false)
      } finally {
        setValidating(false)
      }
    }

    validatePayment()
  }, [paymentId, onValidationComplete])

  if (validating) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300">결제를 검증하고 있습니다...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">⚠️</div>
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return null
} 