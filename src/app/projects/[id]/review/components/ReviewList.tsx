'use client'

import { CodeReview } from '@/types/review'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import Image from 'next/image'

interface Props {
  reviews: CodeReview[]
  onSelectReview: (review: CodeReview) => void
}

export default function ReviewList({ reviews, onSelectReview }: Props) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSelectReview(review)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src={review.authorAvatar}
                alt={review.authorName}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {review.title}
                </h3>
                <p className="text-sm text-gray-500">
                  #{review.prNumber} by {review.authorName} ·{' '}
                  {format(new Date(review.createdAt), 'PPP', { locale: ko })}
                </p>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(review.status)}`}
            >
              {getStatusText(review.status)}
            </span>
          </div>
          {review.description && (
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {review.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

function getStatusColor(status: CodeReview['status']) {
  const colors = {
    open: 'bg-green-100 text-green-800',
    changes_requested: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-blue-100 text-blue-800',
    merged: 'bg-purple-100 text-purple-800',
  }
  return colors[status]
}

function getStatusText(status: CodeReview['status']) {
  const text = {
    open: '검토 중',
    changes_requested: '수정 요청',
    approved: '승인됨',
    merged: '병합됨',
  }
  return text[status]
}
