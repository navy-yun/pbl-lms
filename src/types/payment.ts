export type PaymentStatus = 
  | 'pending'    // 결제 대기
  | 'processing' // 결제 처리 중
  | 'completed'  // 결제 완료
  | 'failed'     // 결제 실패
  | 'refunded'   // 환불됨

export type PaymentMethod = 
  | 'card'       // 신용/체크카드
  | 'transfer'   // 계좌이체
  | 'vbank'      // 가상계좌

export interface PaymentHistory {
  id: string
  orderId: string
  projectId: string
  userId: string
  amount: number
  method: PaymentMethod
  status: PaymentStatus
  createdAt: string
  updatedAt: string
  cardInfo?: {
    cardType: string
    lastFourDigits: string
    installmentMonths: number
  }
  refundInfo?: {
    refundedAt: string
    reason: string
    amount: number
  }
}

export interface RefundPolicy {
  id: string
  daysFromPurchase: number
  refundPercentage: number
  description: string
} 