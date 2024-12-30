'use client'

import { useState } from 'react'
import { ProjectProgress, Task, TaskStatus } from '@/types/project'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import TaskSubmissionModal from './TaskSubmissionModal'

interface Props {
  progress: ProjectProgress
}

export default function ProgressView({ progress }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'all'>(
    'all',
  )
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const filteredTasks =
    selectedStatus === 'all'
      ? progress.tasks
      : progress.tasks.filter((task) => task.status === selectedStatus)

  const handleSubmitTask = (
    taskId: string,
    githubUrl: string,
    comment: string,
  ) => {
    // TODO: API 연동 시 실제 제출 로직 구현
    console.log('Task submitted:', { taskId, githubUrl, comment })
    setSelectedTask(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* 프로젝트 제목 */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {progress.title}
        </h1>

        {/* 진행 상황 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ProgressCard
            title="전체 진행률"
            value={`${Math.round((progress.completedTasks / progress.totalTasks) * 100)}%`}
            subtext={`${progress.completedTasks}/${progress.totalTasks} 완료`}
            showProgressBar
            progress={(progress.completedTasks / progress.totalTasks) * 100}
          />
          <ProgressCard
            title="현재 단계"
            value={`${progress.currentStep}/${progress.totalSteps}`}
            subtext="단계"
          />
          <ProgressCard
            title="다음 마감일"
            value={format(new Date(progress.nextDeadline), 'MM/dd (E)', {
              locale: ko,
            })}
            subtext="까지"
            highlight
          />
        </div>

        {/* 상태 필터 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap gap-2">
            {(
              [
                'all',
                'not_started',
                'in_progress',
                'submitted',
                'completed',
              ] as const
            ).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    selectedStatus === status
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                {getStatusText(status)}
              </button>
            ))}
          </div>
        </div>

        {/* 태스크 목록 */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onSubmit={() => setSelectedTask(task)}
            />
          ))}
        </div>
      </main>

      {/* 제출 모달 */}
      {selectedTask && (
        <TaskSubmissionModal
          task={selectedTask}
          onSubmit={handleSubmitTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  )
}

interface ProgressCardProps {
  title: string
  value: string
  subtext: string
  showProgressBar?: boolean
  progress?: number
  highlight?: boolean
}

function ProgressCard({
  title,
  value,
  subtext,
  showProgressBar,
  progress,
  highlight,
}: ProgressCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h2>
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-3xl font-bold ${highlight ? 'text-red-600' : 'text-blue-600'}`}
        >
          {value}
        </span>
        <span className="text-gray-500">{subtext}</span>
      </div>
      {showProgressBar && progress !== undefined && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}

interface TaskCardProps {
  task: Task
  onSubmit: () => void
}

function TaskCard({ task, onSubmit }: TaskCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {task.stepNumber}.{task.taskNumber} {task.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            마감일:{' '}
            {format(new Date(task.dueDate), 'yyyy년 MM월 dd일 HH:mm', {
              locale: ko,
            })}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}
        >
          {getStatusText(task.status)}
        </span>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {task.description}
      </p>

      {task.githubUrl && (
        <a
          href={task.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center gap-1 mb-4"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
          </svg>
          GitHub PR 보기
        </a>
      )}

      {task.feedback && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-gray-900 dark:text-white">
              멘토 피드백
            </p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < (task.feedback?.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            {task.feedback.comment}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {format(
              new Date(task.feedback.createdAt),
              'yyyy년 MM월 dd일 HH:mm',
              { locale: ko },
            )}
          </p>
        </div>
      )}

      {task.status === 'in_progress' && (
        <button
          onClick={onSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          과제 제출하기
        </button>
      )}
    </div>
  )
}

const getStatusColor = (status: TaskStatus) => {
  const colors = {
    not_started:
      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    in_progress:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    submitted: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    completed:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  }
  return colors[status]
}

const getStatusText = (status: TaskStatus | 'all') => {
  const text = {
    all: '전체',
    not_started: '시작 전',
    in_progress: '진행 중',
    submitted: '제출됨',
    completed: '완료',
  }
  return text[status]
}
