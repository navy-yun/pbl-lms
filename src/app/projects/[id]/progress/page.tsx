import ProgressView from './ProgressView'
import ProgressReport from './ProgressReport'
import { MOCK_PROGRESS } from './mockData'
import QnASection from '../qna/components/QnASection'

export default function ProjectProgressPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 진행 상황 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          진행 상황
        </h2>
        <ProgressView progress={MOCK_PROGRESS} />
      </section>

      {/* 주간 리포트 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          주간 리포트
        </h2>
        <ProgressReport />
      </section>

      {/* Q&A 섹션 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          프로젝트 Q&A
        </h2>
        <QnASection projectId={MOCK_PROGRESS.projectId} />
      </section>
    </div>
  )
}
