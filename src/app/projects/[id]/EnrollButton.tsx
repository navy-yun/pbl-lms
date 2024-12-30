'use client'

type EnrollButtonProps = {
  price: number
  projectId: string
}

export default function EnrollButton({ price, projectId }: EnrollButtonProps) {
  const handleEnrollClick = () => {
    // 수강신청 처리 로직
    console.log(`Enrolling in project ${projectId}`)
  }

  return (
    <button
      onClick={handleEnrollClick}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
    >
      수강신청 ({price.toLocaleString()}원)
    </button>
  )
}
