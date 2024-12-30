export interface LearningResource {
  id: string
  type: 'document' | 'video' | 'link'
  title: string
  description: string
  url: string
  stepId: string // 관련된 프로젝트 단계
  isRequired: boolean
  estimatedTime: number // minutes
}
