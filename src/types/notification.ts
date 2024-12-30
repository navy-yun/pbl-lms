export interface ProjectNotification {
  id: string
  type: 'feedback' | 'deadline' | 'mention' | 'review' | 'chat'
  title: string
  message: string
  createdAt: string
  isRead: boolean
  actionUrl?: string
  priority: 'low' | 'medium' | 'high'
}
