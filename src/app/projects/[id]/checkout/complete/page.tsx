'use client'

import Link from 'next/link'

export default function CheckoutCompletePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            결제가 완료되었습니다!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            프로젝트를 시작할 준비가 되었습니다.
          </p>

          {/* 결제 정보 */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
            <div className="space-y-4 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">주문번호</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  ORDER-20240321-001
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  결제 금액
                </span>
                <span className="text-gray-900 dark:text-white font-medium">
                  99,000원
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  결제 수단
                </span>
                <span className="text-gray-900 dark:text-white font-medium">
                  신용카드
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <Link
              href="/projects/1/progress"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              프로젝트 시작하기
            </Link>
            <button
              onClick={() => window.print()}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              영수증 다운로드
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 