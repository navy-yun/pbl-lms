'use client'

import { useState } from 'react'
import QnAList from './QnAList'
import QnAEditor from './QnAEditor'
import { QnAPost } from '@/types/qna'
import { MOCK_QNA_POSTS } from '../mockData'

interface Props {
  projectId: string
  limit?: number
}

export default function QnASection({ projectId, limit }: Props) {
  const [posts, setPosts] = useState<QnAPost[]>(
    limit ? MOCK_QNA_POSTS.slice(0, limit) : MOCK_QNA_POSTS,
  )
  const [isEditorOpen, setIsEditorOpen] = useState(false)

  const handleCreatePost = (title: string, content: string, tags: string[]) => {
    const newPost: QnAPost = {
      id: Date.now().toString(),
      title,
      content,
      authorId: 'current-user',
      authorName: '현재 사용자',
      authorAvatar: '/avatars/default.png',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags,
      isResolved: false,
      viewCount: 0,
      comments: [],
    }

    setPosts((prev) => [newPost, ...prev])
    setIsEditorOpen(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        {!limit && (
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Q&A 게시판
          </h1>
        )}
        <button
          onClick={() => setIsEditorOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          질문하기
        </button>
      </div>

      {isEditorOpen && (
        <QnAEditor
          onSubmit={handleCreatePost}
          onCancel={() => setIsEditorOpen(false)}
        />
      )}

      <QnAList posts={posts} />

      {limit && posts.length >= limit && (
        <div className="mt-4 text-center">
          <a
            href={`/projects/${projectId}/qna`}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            모든 Q&A 보기
          </a>
        </div>
      )}
    </div>
  )
}
