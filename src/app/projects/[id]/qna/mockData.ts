import { QnAPost } from '@/types/qna'

export const MOCK_QNA_POSTS: QnAPost[] = [
  {
    id: '1',
    title: 'React 컴포넌트 최적화 관련 질문입니다.',
    content:
      '현재 프로젝트에서 리렌더링 이슈가 발생하고 있는데, 어떻게 해결하면 좋을까요?',
    authorId: 'user1',
    authorName: '김멘티',
    authorAvatar: '/avatars/user1.png',
    createdAt: '2024-03-19T10:00:00Z',
    updatedAt: '2024-03-19T10:00:00Z',
    tags: ['React', '성능최적화'],
    isResolved: true,
    viewCount: 42,
    comments: [
      {
        id: 'c1',
        content:
          'React.memo와 useMemo를 활용해보세요. 불필요한 리렌더링을 막을 수 있습니다.',
        authorId: 'mentor1',
        authorName: '박멘토',
        authorAvatar: '/avatars/mentor1.png',
        createdAt: '2024-03-19T10:30:00Z',
        isAnswer: true,
      },
    ],
  },
  // ... 더 많은 mock 데이터
]
