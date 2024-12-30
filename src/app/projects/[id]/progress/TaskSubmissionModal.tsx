'use client'

import { Task } from '@/types/project'
import { useState } from 'react'

interface Props {
  task: Task
  onSubmit: (taskId: string, githubUrl: string, comment: string) => void
  onClose: () => void
}

export default function TaskSubmissionModal({
  task,
  onSubmit,
  onClose,
}: Props) {
  const [githubUrl, setGithubUrl] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(task.id, githubUrl, comment)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          과제 제출 - {task.title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="githubUrl"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              GitHub PR URL
            </label>
            <input
              type="url"
              id="githubUrl"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="https://github.com/username/repo/pull/1"
              required
            />
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              제출 코멘트
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="구현 내용이나 특이사항을 작성해주세요."
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              제출하기
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
