'use client'

import { useState } from 'react'
import StatCard from './components/StatCard'
import ImprovementItem from './components/ImprovementItem'

const MOCK_REPORT = {
  weeklyStats: [
    {
      week: '2024-03-18',
      completedTasks: 5,
      timeSpent: 12,
      codeCommits: 23,
      reviewComments: 15,
    },
  ],
  strengthAreas: ['문제 해결력', '코드 구조화'],
  improvementAreas: [
    {
      title: '코드 품질',
      description: '함수 분리와 재사용성 개선 필요',
      priority: 'high' as const,
    },
    {
      title: '테스트 커버리지',
      description: '단위 테스트 추가 필요',
      priority: 'medium' as const,
    },
  ],
  mentorFeedback: `전반적으로 잘 진행되고 있습니다. 다만, 코드 품질 면에서 개선의 여지가 있어 보입니다.
    다음 주에는 클린 코드 원칙을 좀 더 신경써서 적용해보시면 좋을 것 같습니다.`,
}

export default function ProgressReport() {
  const [report] = useState(MOCK_REPORT)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        주간 진행 리포트
      </h2>

      {/* 주간 통계 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="완료한 과제"
          value={report.weeklyStats[0].completedTasks.toString()}
          change="+2"
          trend="up"
        />
        <StatCard
          title="투자 시간"
          value={`${report.weeklyStats[0].timeSpent}h`}
          change="+3h"
          trend="up"
        />
        <StatCard
          title="코드 커밋"
          value={report.weeklyStats[0].codeCommits.toString()}
          change="-5"
          trend="down"
        />
        <StatCard
          title="리뷰 코멘트"
          value={report.weeklyStats[0].reviewComments.toString()}
          change="+7"
          trend="up"
        />
      </div>

      {/* 강점 영역 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          강점 영역
        </h3>
        <div className="flex flex-wrap gap-2">
          {report.strengthAreas.map((area) => (
            <span
              key={area}
              className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm"
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* 개선 영역 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          개선이 필요한 영역
        </h3>
        <div className="space-y-2">
          {report.improvementAreas.map((area) => (
            <ImprovementItem
              key={area.title}
              title={area.title}
              description={area.description}
              priority={area.priority}
            />
          ))}
        </div>
      </div>

      {/* 멘토 피드백 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          멘토 피드백
        </h3>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
            {report.mentorFeedback}
          </p>
        </div>
      </div>
    </div>
  )
}
