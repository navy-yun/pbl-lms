import { notFound } from 'next/navigation'
import { type ProjectDetail } from '@/types/project'
import ProjectDetailView from './ProjectDetailView'

// MOCK_PROJECT_DETAIL을 별도 파일로 분리하는 것이 좋습니다
const MOCK_PROJECT_DETAIL: ProjectDetail = {
  id: '1',
  title: '리액트로 투두리스트 만들기',
  description: '기초적인 CRUD 기능을 구현하며 리액트의 기본을 배워봅시다.',
  mentor: '김멘토',
  difficulty: 'beginner',
  tags: ['React', 'JavaScript', 'CSS'],
  steps: 5,
  price: 99000,
  totalDuration: '4주',
  enrolledCount: 128,
  curriculum: [
    {
      stepNumber: 1,
      title: '프로젝트 환경설정',
      description: 'React 개발환경 구축 및 기본 설정',
      duration: '1주차',
      tasks: [
        'Create React App 설치',
        'ESLint/Prettier 설정',
        '기본 구조 잡기',
      ],
    },
    // ... 더 많은 커리큘럼 단계
  ],
  mentorProfile: {
    id: 'm1',
    name: '김멘토',
    avatar: '/mentors/mentor1.jpg',
    bio: '10년차 프론트엔드 개발자',
    expertise: ['React', 'TypeScript', 'NextJS'],
    projectCount: 15,
    rating: 4.8,
  },
  reviews: [
    {
      id: 'r1',
      userId: 'u1',
      userName: '홍길동',
      rating: 5,
      comment: '정말 도움이 많이 되었습니다!',
      createdAt: '2024-03-15',
    },
  ],
}

type PageProps = {
  params: Promise<{ id: string }>
  //   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProjectPage({ params: _params }: PageProps) {
  const project = MOCK_PROJECT_DETAIL

  if (!project) {
    notFound()
  }

  return <ProjectDetailView project={project} />
}
