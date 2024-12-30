export interface QnAComment {
  id: string
  content: string
  authorId: string
  authorName: string
  authorAvatar: string
  createdAt: string
  isAnswer?: boolean
}

export interface QnAPost {
  id: string
  title: string
  content: string
  authorId: string
  authorName: string
  authorAvatar: string
  createdAt: string
  updatedAt: string
  tags: string[]
  isResolved: boolean
  viewCount: number
  comments: QnAComment[]
}
