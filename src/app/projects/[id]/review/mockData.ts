import { CodeReview } from '@/types/review'

export const MOCK_REVIEWS: CodeReview[] = [
  {
    id: '1',
    prNumber: 1,
    title: '프로젝트 초기 설정 및 기본 구조 구현',
    description: 'React 프로젝트 설정과 기본 컴포넌트 구조를 구현했습니다.',
    authorId: 'user-1',
    authorName: '이멘티',
    authorAvatar: '/avatars/mentee1.png',
    status: 'open',
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-20T10:00:00Z',
    comments: [],
    files: [
      {
        filename: 'src/App.tsx',
        additions: 50,
        deletions: 0,
        content: `import React from 'react';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* 라우팅 설정 */}
      </div>
    </BrowserRouter>
  );
}

export default App;`,
        comments: [],
      },
    ],
  },
]
