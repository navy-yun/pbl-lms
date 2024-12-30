import { Meeting } from '@/types/meeting'

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: '1',
    projectId: 'project-1',
    title: '프로젝트 진행 상황 리뷰',
    description: '현재까지의 진행 상황을 점검하고 다음 단계를 논의합니다.',
    scheduledAt: '2024-03-25T14:00:00Z',
    duration: 60,
    status: 'scheduled',
    participants: [
      {
        id: 'mentor-1',
        name: '김멘토',
        avatar: '/avatars/mentor1.png',
        role: 'mentor',
      },
      {
        id: 'mentee-1',
        name: '이멘티',
        avatar: '/avatars/mentee1.png',
        role: 'mentee',
      },
    ],
  },
  {
    id: '2',
    projectId: 'project-1',
    title: '코드 리뷰 세션',
    description: '최근 제출된 PR에 대한 상세 리뷰를 진행합니다.',
    scheduledAt: '2024-03-27T15:00:00Z',
    duration: 45,
    status: 'scheduled',
    participants: [
      {
        id: 'mentor-1',
        name: '김멘토',
        avatar: '/avatars/mentor1.png',
        role: 'mentor',
      },
      {
        id: 'mentee-1',
        name: '이멘티',
        avatar: '/avatars/mentee1.png',
        role: 'mentee',
      },
    ],
  },
]
