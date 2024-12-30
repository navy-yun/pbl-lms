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

export interface Task {
  id: string
  stepNumber: number
  taskNumber: number
  title: string
  description: string
  status: TaskStatus
  dueDate: string
  submittedAt?: string
  completedAt?: string
  githubUrl?: string
  feedback?: {
    comment: string
    rating: number
    createdAt: string
  }
}

export interface ProjectProgress {
  projectId: string
  title: string
  currentStep: number
  totalSteps: number
  completedTasks: number
  totalTasks: number
  tasks: Task[]
  lastUpdated: string
  nextDeadline: string
}

export type ProjectStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'

export type StepStatus =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'SUBMITTED'
  | 'FEEDBACK'
  | 'COMPLETED'

export interface ProjectStep {
  id: string
  title: string
  description: string
  requirements: string[]
  deadline: Date
  status: StepStatus
}

export interface Submission {
  id: string
  stepId: string
  githubUrl: string
  comment: string
  submittedAt: Date
  feedback?: {
    comment: string
    status: 'APPROVED' | 'REJECTED'
    createdAt: Date
  }
}

export interface Project {
  id: string
  title: string
  description: string
  thumbnail: string
  mentor: {
    id: string
    name: string
    avatar: string
  }
  status: ProjectStatus
  steps: ProjectStep[]
  submissions: Submission[]
  createdAt: Date
  updatedAt: Date
}
