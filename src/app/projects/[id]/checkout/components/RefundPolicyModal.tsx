'use client'

import { useState } from 'react'
import { MOCK_REFUND_POLICIES } from '@/mocks/payment'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function RefundPolicyModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          환불 정책
        </h2>
        
        <div className="space-y-4">
          {MOCK_REFUND_POLICIES.map((policy) => (
            <div
              key={policy.id}
              className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
            >
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                {policy.description}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                환불률: {policy.refundPercentage}%
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  )
} 