'use client'

import { useState } from 'react'

interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  attachments?: {
    type: 'image' | 'code' | 'file'
    url: string
    name: string
  }[]
}

export default function ProjectChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')

  // 실제 구현 시에는 웹소켓이나 실시간 DB를 사용
  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'current-user-id',
      senderName: '멘티',
      content: newMessage,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, message])
    setNewMessage('')
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* 채팅 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === 'current-user-id'
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderId === 'current-user-id'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <p className="text-sm font-semibold mb-1">{message.senderName}</p>
              <p>{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 메시지 입력 영역 */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            placeholder="메시지를 입력하세요..."
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  )
}
