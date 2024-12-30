'use client'

import { type ProjectDetail } from '@/types/project'

interface ProjectDetailViewProps {
  project: ProjectDetail
}

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
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

          {/* 나머지 JSX 코드... */}
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
