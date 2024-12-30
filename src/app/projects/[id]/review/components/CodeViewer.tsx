'use client'

import { useState } from 'react'
import { CodeReview } from '@/types/review'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface Props {
  review: CodeReview
}

export default function CodeViewer({ review }: Props) {
  const [newComment, setNewComment] = useState('')
  const [selectedLine, setSelectedLine] = useState<number | null>(null)

  const handleAddComment = (line: number) => {
    if (!newComment.trim()) return
    // 실제 구현 시 API 호출
    console.log('Adding comment:', { line, comment: newComment })
    setNewComment('')
    setSelectedLine(null)
  }

  // selectedLine이 있을 때 코멘트 입력 UI 표시
  const renderCommentInput = () => {
    if (selectedLine === null) return null
    return (
      <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="코멘트를 입력하세요..."
        />
        <div className="mt-2 flex justify-end gap-2">
          <button
            onClick={() => setSelectedLine(null)}
            className="px-3 py-1 bg-gray-100 rounded"
          >
            취소
          </button>
          <button
            onClick={() => handleAddComment(selectedLine)}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            추가
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* 리뷰 헤더 */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={review.authorAvatar}
              alt={review.authorName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {review.title}
              </h2>
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
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          {review.description}
        </p>
      </div>

      {/* 코드 뷰어 */}
      <div className="overflow-x-auto">
        {review.files.map((file) => (
          <div
            key={file.filename}
            className="border-b border-gray-200 dark:border-gray-700"
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-900">
              <h3 className="font-mono text-sm text-gray-700 dark:text-gray-300">
                {file.filename}
              </h3>
            </div>
            <div className="relative">
              <pre className="p-4 text-sm font-mono">
                {file.content.split('\n').map((line, i) => (
                  <div
                    key={i}
                    className="flex hover:bg-gray-50 dark:hover:bg-gray-900"
                    onClick={() => setSelectedLine(i + 1)}
                  >
                    <span className="w-12 text-right text-gray-500 select-none pr-4">
                      {i + 1}
                    </span>
                    <span className="flex-1">{line}</span>
                  </div>
                ))}
              </pre>

              {/* 코멘트 */}
              {file.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="ml-12 p-4 border-l-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  style={{ marginTop: `${(comment.line - 1) * 24}px` }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <img
                      src={comment.authorAvatar}
                      alt={comment.authorName}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {comment.authorName}
                    </span>
                    <span className="text-sm text-gray-500">
                      {format(new Date(comment.createdAt), 'PP', {
                        locale: ko,
                      })}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {renderCommentInput()}
    </div>
  )
}

function getStatusColor(status: CodeReview['status']) {
  const colors = {
    open: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    changes_requested:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    approved: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    merged:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
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
