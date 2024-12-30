interface StatCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
}

export default function StatCard({
  title,
  value,
  change,
  trend,
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
        <p
          className={`ml-2 flex items-center text-sm ${
            trend === 'up'
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          <span>{change}</span>
          <svg
            className={`w-4 h-4 ml-0.5 ${trend === 'down' && 'transform rotate-180'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414V16a1 1 0 11-2 0V4.414L4.707 7.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </p>
      </div>
    </div>
  )
}
