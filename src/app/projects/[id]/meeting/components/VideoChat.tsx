'use client'

import { useEffect, useRef } from 'react'
import { Meeting } from '@/types/meeting'

interface Props {
  meeting: Meeting
  onClose: () => void
}

export default function VideoChat({ meeting, onClose }: Props) {
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // meeting 정보 활용
    console.log(`Setting up meeting: ${meeting.title}`)
    // 실제 구현 시에는 WebRTC나 화상 채팅 서비스(예: Twilio, Agora) 연동
    async function setupVideoChat() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error('Failed to get media devices:', error)
      }
    }

    setupVideoChat()
  }, [meeting])

  return (
    <div className="fixed inset-0 bg-black">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          종료
        </button>
      </div>

      <div className="h-full flex items-center justify-center">
        <div className="relative w-full max-w-6xl aspect-video">
          {/* 상대방 비디오 */}
          <video
            ref={remoteVideoRef}
            className="w-full h-full bg-gray-900 rounded-lg"
            autoPlay
            playsInline
          />

          {/* 내 비디오 */}
          <video
            ref={localVideoRef}
            className="absolute bottom-4 right-4 w-48 aspect-video bg-gray-800 rounded-lg"
            autoPlay
            playsInline
            muted
          />
        </div>
      </div>
    </div>
  )
}
