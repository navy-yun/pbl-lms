'use client'

import { useState } from 'react'
import { Meeting } from '@/types/meeting'

interface Props {
  onSchedule: (meeting: Meeting) => void
}

export default function MeetingScheduler({ onSchedule }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [duration, setDuration] = useState('60')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const meeting: Meeting = {
      id: Date.now().toString(),
      projectId: 'project-1',
      title,
      description,
      scheduledAt: `${date}T${time}:00Z`,
      duration: Number(duration),
      status: 'scheduled',
      participants: [
        {
          id: 'mentor-1',
          name: '김멘토',
          avatar: '/avatars/mentor1.png',
          role: 'mentor',
        },
        {
          id: 'mentee-1',
          name: '이멘티',
          avatar: '/avatars/mentee1.png',
          role: 'mentee',
        },
      ],
    }

    onSchedule(meeting)
    setIsOpen(false)
    setTitle('')
    setDescription('')
    setDate('')
    setTime('')
    setDuration('60')
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        미팅 예약
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              미팅 예약
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  제목
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  설명
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    날짜
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    시간
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  소요 시간 (분)
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="30">30분</option>
                  <option value="45">45분</option>
                  <option value="60">1시간</option>
                  <option value="90">1시간 30분</option>
                  <option value="120">2시간</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  예약하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
