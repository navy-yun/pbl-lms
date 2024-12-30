'use client'

import { useState } from 'react'
import QnAList from './components/QnAList'
import QnAEditor from './components/QnAEditor'
import { QnAPost } from '@/types/qna'
import { MOCK_QNA_POSTS } from './mockData'

export default function ProjectQnAPage() {
  const [posts, setPosts] = useState<QnAPost[]>(MOCK_QNA_POSTS)
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Q&A 게시판
        </h1>
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
    </div>
  )
}
