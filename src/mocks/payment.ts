import { PaymentHistory, RefundPolicy } from '@/types/payment'

export const MOCK_PAYMENT_HISTORY: PaymentHistory[] = [
  {
    id: 'payment_1',
    orderId: 'ORDER-20240321-001',
    projectId: 'project-1',
    userId: 'user-1',
    amount: 99000,
    method: 'card',
    status: 'completed',
    createdAt: '2024-03-21T09:00:00Z',
    updatedAt: '2024-03-21T09:01:00Z',
    cardInfo: {
      cardType: '신한카드',
      lastFourDigits: '1234',
      installmentMonths: 1,
    },
  },
  {
    id: 'payment_2',
    orderId: 'ORDER-20240321-002',
    projectId: 'project-2',
    userId: 'user-1',
    amount: 149000,
    method: 'card',
    status: 'refunded',
    createdAt: '2024-03-20T15:00:00Z',
    updatedAt: '2024-03-21T10:00:00Z',
    cardInfo: {
      cardType: '국민카드',
      lastFourDigits: '5678',
      installmentMonths: 3,
    },
    refundInfo: {
      refundedAt: '2024-03-21T10:00:00Z',
      reason: '구매자 변심',
      amount: 149000,
    },
  },
]

export const MOCK_REFUND_POLICIES: RefundPolicy[] = [
  {
    id: 'policy_1',
    daysFromPurchase: 7,
    refundPercentage: 100,
    description: '수강 시작 후 7일 이내 100% 환불',
  },
  {
    id: 'policy_2',
    daysFromPurchase: 14,
    refundPercentage: 50,
    description: '수강 시작 후 14일 이내 50% 환불',
  },
  {
    id: 'policy_3',
    daysFromPurchase: 30,
    refundPercentage: 20,
    description: '수강 시작 후 30일 이내 20% 환불',
  },
]

// 결제 검증 모의 함수
export const mockValidatePayment = (paymentId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 90% 확률로 성공
      resolve(Math.random() > 0.1)
    }, 1000)
  })
}

// 결제 영수증 생성 모의 함수
export const mockGenerateReceipt = (payment: PaymentHistory): string => {
  return `
    영수증 번호: ${payment.orderId}
    결제 일시: ${new Date(payment.createdAt).toLocaleString()}
    결제 금액: ${payment.amount.toLocaleString()}원
    결제 수단: ${payment.method === 'card' ? '신용카드' : '계좌이체'}
    ${payment.cardInfo ? `카드 정보: ${payment.cardInfo.cardType} (${payment.cardInfo.lastFourDigits})` : ''}
  `.trim()
} 