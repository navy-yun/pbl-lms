import { ProjectStep } from '@/types/project'

interface StepCardProps {
  step: ProjectStep
  isActive: boolean
  onClick: () => void
  submissions: Submission[]
}

export default function StepCard({
  step,
  isActive,
  onClick,
  submissions,
}: StepCardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer
        ${isActive ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {step.title}
      </h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {step.description}
      </p>
      <div className="mt-4">
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(step.status)}`}
        >
          {getStatusText(step.status)}
        </span>
      </div>
      {submissions.length > 0 && (
        <div className="mt-4 space-y-2">
          {submissions.map((submission) => (
            <div key={submission.id} className="text-sm text-gray-600">
              제출일: {new Date(submission.submittedAt).toLocaleDateString()}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function getStatusColor(status: ProjectStep['status']) {
  const colors = {
    NOT_STARTED: 'bg-gray-100 text-gray-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    SUBMITTED: 'bg-yellow-100 text-yellow-800',
    FEEDBACK: 'bg-purple-100 text-purple-800',
    COMPLETED: 'bg-green-100 text-green-800',
  }
  return colors[status]
}

function getStatusText(status: ProjectStep['status']) {
  const text = {
    NOT_STARTED: '시작 전',
    IN_PROGRESS: '진행 중',
    SUBMITTED: '제출됨',
    FEEDBACK: '피드백',
    COMPLETED: '완료',
  }
  return text[status]
}
