import { ProjectProgress } from '@/types/project'

export const MOCK_PROGRESS: ProjectProgress = {
  projectId: 'project-1',
  title: 'React로 쇼핑몰 만들기',
  currentStep: 2,
  totalSteps: 5,
  completedTasks: 3,
  totalTasks: 12,
  lastUpdated: '2024-03-20T09:00:00Z',
  nextDeadline: '2024-03-25T23:59:59Z',
  tasks: [
    {
      id: 'task-1',
      stepNumber: 1,
      taskNumber: 1,
      title: '프로젝트 환경 설정',
      description:
        'Create React App을 사용하여 프로젝트를 설정하고 필요한 의존성을 설치합니다.',
      status: 'completed',
      dueDate: '2024-03-17T23:59:59Z',
      submittedAt: '2024-03-15T10:30:00Z',
      completedAt: '2024-03-16T14:20:00Z',
      githubUrl: 'https://github.com/user/project/pull/1',
      feedback: {
        comment: '잘 구성된 초기 설정입니다. ESLint 규칙이 잘 적용되었네요.',
        rating: 5,
        createdAt: '2024-03-16T14:20:00Z',
      },
    },
    {
      id: 'task-2',
      stepNumber: 1,
      taskNumber: 2,
      title: '기본 컴포넌트 구조 설계',
      description:
        '주요 페이지와 컴포넌트의 구조를 설계하고 라우팅을 구성합니다.',
      status: 'in_progress',
      dueDate: '2024-03-24T23:59:59Z',
    },
    // ... 더 많은 태스크
  ],
}
