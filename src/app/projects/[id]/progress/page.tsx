'use client';

import { useState } from 'react';
import { type ProjectProgress, type ProjectTask, type TaskStatus } from "@/types/project";
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const MOCK_PROGRESS: ProjectProgress = {
  projectId: '1',
  currentStep: 2,
  totalSteps: 5,
  completedTasks: 3,
  totalTasks: 12,
  lastUpdated: '2024-03-20T09:00:00Z',
  nextDeadline: '2024-03-25T23:59:59Z',
  tasks: [
    {
      id: 't1',
      stepNumber: 1,
      taskNumber: 1,
      title: 'Create React App 설치',
      status: 'completed',
      submittedAt: '2024-03-15T10:30:00Z',
      completedAt: '2024-03-16T14:20:00Z',
      feedback: '잘 진행하셨습니다!',
      dueDate: '2024-03-17T23:59:59Z',
      githubUrl: 'https://github.com/user/project/pull/1'
    },
    {
      id: 't2',
      stepNumber: 1,
      taskNumber: 2,
      title: 'ESLint/Prettier 설정',
      status: 'in_progress',
      dueDate: '2024-03-24T23:59:59Z'
    },
    // ... 더 많은 태스크
  ]
};

export default function ProjectProgress() {
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'all'>('all');

  const filteredTasks = selectedStatus === 'all' 
    ? MOCK_PROGRESS.tasks 
    : MOCK_PROGRESS.tasks.filter(task => task.status === selectedStatus);

  const handleSubmitTask = (taskId: string) => {
    // TODO: 과제 제출 처리
    console.log('Submit task:', taskId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* 상단 요약 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              전체 진행률
            </h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold text-blue-600">
                {Math.round((MOCK_PROGRESS.completedTasks / MOCK_PROGRESS.totalTasks) * 100)}%
              </span>
              <span className="text-gray-500">
                {MOCK_PROGRESS.completedTasks}/{MOCK_PROGRESS.totalTasks} 완료
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(MOCK_PROGRESS.completedTasks / MOCK_PROGRESS.totalTasks) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              현재 단계
            </h2>
            <div className="text-3xl font-bold text-blue-600">
              {MOCK_PROGRESS.currentStep}/{MOCK_PROGRESS.totalSteps}
            </div>
            <p className="text-gray-500 mt-2">단계</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              다음 마감일
            </h2>
            <div className="text-2xl font-bold text-red-600">
              {MOCK_PROGRESS.nextDeadline && 
                format(new Date(MOCK_PROGRESS.nextDeadline), 'MM/dd (E)', { locale: ko })}
            </div>
            <p className="text-gray-500 mt-2">까지</p>
          </div>
        </div>

        {/* 태스크 필터 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-2">
            {(['all', 'not_started', 'in_progress', 'submitted', 'completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedStatus === status 
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
              onSubmit={() => handleSubmitTask(task.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

type TaskCardProps = {
  task: ProjectTask;
  onSubmit: () => void;
};

function TaskCard({ task, onSubmit }: TaskCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {task.stepNumber}.{task.taskNumber} {task.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            마감일: {format(new Date(task.dueDate), 'yyyy년 MM월 dd일 HH:mm', { locale: ko })}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}>
          {getStatusText(task.status)}
        </span>
      </div>

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
          <p className="font-semibold text-gray-900 dark:text-white mb-2">멘토 피드백:</p>
          <p className="text-gray-600 dark:text-gray-300">{task.feedback}</p>
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
  );
}

const getStatusColor = (status: TaskStatus) => {
  const colors = {
    not_started: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    in_progress: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    submitted: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  };
  return colors[status];
};

const getStatusText = (status: TaskStatus | 'all') => {
  const text = {
    all: '전체',
    not_started: '시작 전',
    in_progress: '진행 중',
    submitted: '제출됨',
    completed: '완료'
  };
  return text[status];
}; 