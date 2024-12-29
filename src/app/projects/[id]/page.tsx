'use client';

import Image from "next/image";
import { notFound } from "next/navigation";
import { type ProjectDetail, type Project } from "@/types/project";

// 난이도에 따른 색상 유틸리티 함수
const getDifficultyColor = (difficulty: Project['difficulty']) => {
  const colors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };
  return colors[difficulty];
};

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
      tasks: ['Create React App 설치', 'ESLint/Prettier 설정', '기본 구조 잡기']
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
    rating: 4.8
  },
  reviews: [
    {
      id: 'r1',
      userId: 'u1',
      userName: '홍길동',
      rating: 5,
      comment: '정말 도움이 많이 되었습니다!',
      createdAt: '2024-03-15'
    }
  ]
};

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = MOCK_PROJECT_DETAIL;
  
  if (!project) {
    notFound();
  }

  const handleEnrollClick = () => {
    // 수강신청 처리 로직
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* 프로젝트 헤더 섹션 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h1>
            <span className={`px-4 py-2 rounded-full text-sm ${getDifficultyColor(project.difficulty)}`}>
              {project.difficulty}
            </span>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag: string) => (
              <span 
                key={tag}
                className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-gray-600 dark:text-gray-300">
                수강생 {project.enrolledCount}명
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                총 {project.totalDuration}
              </span>
            </div>
            <button
              onClick={handleEnrollClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              수강신청 ({project.price.toLocaleString()}원)
            </button>
          </div>
        </div>

        {/* 멘토 프로필 섹션 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">멘토 소개</h2>
          <div className="flex items-start gap-6">
            <div className="relative w-24 h-24">
              <Image
                src={project.mentorProfile.avatar}
                alt={project.mentorProfile.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {project.mentorProfile.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.mentorProfile.bio}
              </p>
              <div className="flex gap-4">
                <span className="text-gray-600 dark:text-gray-300">
                  프로젝트 {project.mentorProfile.projectCount}개
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  평점 {project.mentorProfile.rating}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 커리큘럼 섹션 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">커리큘럼</h2>
          <div className="space-y-6">
            {project.curriculum.map((step: CurriculumStep) => (
              <div 
                key={step.stepNumber}
                className="border-l-4 border-blue-500 pl-4 py-2"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {step.stepNumber}. {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {step.description}
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  {step.tasks.map((task: string, index: number) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 