'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RefundPolicyModal from './components/RefundPolicyModal'
import { mockGenerateReceipt } from '@/mocks/payment'

export default function CheckoutPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [agreed, setAgreed] = useState(false)
  const [showRefundPolicy, setShowRefundPolicy] = useState(false)
  const [processing, setProcessing] = useState(false)

  const handlePayment = async () => {
    if (!agreed) {
      alert('약관에 동의해주세요.')
      return
    }

    setProcessing(true)
    try {
      // 결제 처리 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 90% 확률로 성공
      if (Math.random() > 0.1) {
        router.push('/projects/1/checkout/complete')
      } else {
        alert('결제에 실패했습니다. 다시 시도해주세요.')
      }
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            결제하기
          </h1>

          {/* 상품 정보 */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              상품 정보
            </h2>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-900 dark:text-white font-medium">
                  리액트로 투두리스트 만들기
                </h3>
                <p className="text-gray-500 text-sm">4주 과정</p>
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                99,000원
              </span>
            </div>
          </div>

          {/* 결제 수단 선택 */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              결제 수단
            </h2>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  신용/체크카드
                </span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="payment"
                  value="transfer"
                  checked={paymentMethod === 'transfer'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  계좌이체
                </span>
              </label>
            </div>
          </div>

          {/* 약관 동의 */}
          <div className="mb-8">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span className="text-gray-700 dark:text-gray-300">
                구매조건 및 결제대행 서비스 약관에 동의합니다
              </span>
            </label>
          </div>

          {/* 최종 결제 금액 */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-8">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span className="text-gray-900 dark:text-white">최종 결제 금액</span>
              <span className="text-blue-600">99,000원</span>
            </div>
          </div>

          {/* 환불 정책 링크 추가 */}
          <button
            onClick={() => setShowRefundPolicy(true)}
            className="text-blue-600 hover:text-blue-800 text-sm mb-4"
          >
            환불 정책 보기
          </button>

          {/* 결제하기 버튼 수정 */}
          <button
            onClick={handlePayment}
            disabled={processing}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {processing ? '결제 처리 중...' : '결제하기'}
          </button>

          {/* 환불 정책 모달 */}
          <RefundPolicyModal
            isOpen={showRefundPolicy}
            onClose={() => setShowRefundPolicy(false)}
          />
        </div>
      </div>
    </div>
  )
} 