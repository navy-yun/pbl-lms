export type MeetingStatus =
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'cancelled'

export interface Meeting {
  id: string
  projectId: string
  title: string
  description?: string
  scheduledAt: string
  duration: number // minutes
  status: MeetingStatus
  participants: {
    id: string
    name: string
    avatar: string
    role: 'mentor' | 'mentee'
  }[]
  meetingUrl?: string
  recordingUrl?: string
}
