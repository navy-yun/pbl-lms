'use client'

import { type ProjectDetail } from '@/types/project'
import Link from 'next/link'
import EnrollButton from './EnrollButton'

interface ProjectDetailViewProps {
  project: ProjectDetail
}

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* 프로젝트 헤더 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h1>
            <span
              className={`px-4 py-2 rounded-full text-sm ${getDifficultyColor(project.difficulty)}`}
            >
              {project.difficulty}
            </span>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 dark:text-gray-300">
                총 {project.totalDuration} 과정
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                {project.enrolledCount}명 수강중
              </span>
            </div>
            <Link href={`/projects/${project.id}/checkout`}>
              <EnrollButton price={project.price} projectId={project.id} />
            </Link>
          </div>
        </div>

        {/* 커리큘럼 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            커리큘럼
          </h2>
          <div className="space-y-6">
            {project.curriculum.map((step) => (
              <div
                key={step.stepNumber}
                className="border-l-4 border-blue-500 pl-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Step {step.stepNumber}: {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {step.description}
                </p>
                <div className="text-sm text-gray-500">
                  예상 소요시간: {step.duration}
                </div>
                <ul className="mt-2 space-y-1">
                  {step.tasks.map((task, index) => (
                    <li
                      key={index}
                      className="text-gray-600 dark:text-gray-300 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-2 text-blue-500"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 멘토 프로필 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            멘토 소개
          </h2>
          <div className="flex items-start space-x-6">
            <img
              src={project.mentorProfile.avatar}
              alt={project.mentorProfile.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {project.mentorProfile.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.mentorProfile.bio}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.mentorProfile.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                <span>프로젝트 {project.mentorProfile.projectCount}개 진행</span>
                <span>평점 {project.mentorProfile.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 수강생 리뷰 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            수강생 리뷰
          </h2>
          <div className="space-y-6">
            {project.reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-6 last:pb-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {review.userName}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

const getDifficultyColor = (difficulty: ProjectDetail['difficulty']) => {
  const colors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  }
  return colors[difficulty]
}
