'use client'

import { useState } from 'react'
import { CodeReview } from '@/types/review'
import ReviewList from './components/ReviewList'
import CodeViewer from './components/CodeViewer'
import { MOCK_REVIEWS } from './mockData'

export default function ProjectReviewPage() {
  const [reviews] = useState<CodeReview[]>(MOCK_REVIEWS)
  const [selectedReview, setSelectedReview] = useState<CodeReview | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        코드 리뷰
      </h1>

      {selectedReview ? (
        <div>
          <button
            onClick={() => setSelectedReview(null)}
            className="mb-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 flex items-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            목록으로 돌아가기
          </button>
          <CodeViewer review={selectedReview} />
        </div>
      ) : (
        <ReviewList reviews={reviews} onSelectReview={setSelectedReview} />
      )}
    </div>
  )
}
