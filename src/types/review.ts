export interface CodeComment {
  id: string
  authorId: string
  authorName: string
  authorAvatar: string
  content: string
  createdAt: string
  line: number
  status: 'open' | 'resolved'
}

export interface CodeReview {
  id: string
  prNumber: number
  title: string
  description: string
  authorId: string
  authorName: string
  authorAvatar: string
  status: 'open' | 'changes_requested' | 'approved' | 'merged'
  createdAt: string
  updatedAt: string
  comments: CodeComment[]
  files: {
    filename: string
    additions: number
    deletions: number
    content: string
    comments: CodeComment[]
  }[]
}
