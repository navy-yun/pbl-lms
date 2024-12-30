'use client'

import { useState } from 'react'
import { Meeting } from '@/types/meeting'
import MeetingScheduler from './components/MeetingScheduler'
import VideoChat from './components/VideoChat'
import { MOCK_MEETINGS } from './mockData'

export default function ProjectMeetingPage() {
  const [meetings, setMeetings] = useState<Meeting[]>(MOCK_MEETINGS)
  const [activeMeeting, setActiveMeeting] = useState<Meeting | null>(null)

  const handleJoinMeeting = (meeting: Meeting) => {
    setActiveMeeting(meeting)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {activeMeeting ? (
        <VideoChat
          meeting={activeMeeting}
          onClose={() => setActiveMeeting(null)}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              화상 미팅
            </h1>
            <MeetingScheduler
              onSchedule={(newMeeting) =>
                setMeetings([...meetings, newMeeting])
              }
            />
          </div>

          <div className="grid gap-4">
            {meetings.map((meeting) => (
              <div
                key={meeting.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {meeting.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(meeting.scheduledAt).toLocaleString()}
                      {' · '}
                      {meeting.duration}분
                    </p>
                    {meeting.description && (
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        {meeting.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleJoinMeeting(meeting)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    disabled={meeting.status !== 'scheduled'}
                  >
                    미팅 참여
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
