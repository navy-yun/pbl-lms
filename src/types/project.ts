// 기본 프로젝트 타입
export type Project = {
  id: string
  title: string
  description: string
  mentor: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  steps: number
}

// 커리큘럼 단계 타입
export interface CurriculumStep {
  stepNumber: number
  title: string
  description: string
  duration: string
  tasks: string[]
}

// 리뷰 타입
export type Review = {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

// 멘토 프로필 타입
export type MentorProfile = {
  id: string
  name: string
  avatar: string
  bio: string
  expertise: string[]
  projectCount: number
  rating: number
}

// 프로젝트 상세 타입
export interface ProjectDetail extends Project {
  curriculum: CurriculumStep[]
  price: number
  totalDuration: string
  enrolledCount: number
  reviews: Review[]
  mentorProfile: MentorProfile
}

export type TaskStatus =
  | 'not_started'
  | 'in_progress'
  | 'submitted'
  | 'completed'

export type ProjectTask = {
  id: string
  stepNumber: number
  taskNumber: number
  title: string
  status: TaskStatus
  feedback?: string
  submittedAt?: string
  completedAt?: string
  dueDate: string
  githubUrl?: string
}

export type ProjectProgress = {
  projectId: string
  currentStep: number
  totalSteps: number
  completedTasks: number
  totalTasks: number
  tasks: ProjectTask[]
  lastUpdated: string
  nextDeadline?: string
}
