interface ImprovementItemProps {
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
}

export default function ImprovementItem({
  title,
  description,
  priority,
}: ImprovementItemProps) {
  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      medium:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    }
    return colors[priority as keyof typeof colors]
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </h4>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(priority)}`}
        >
          {priority}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </div>
  )
}
