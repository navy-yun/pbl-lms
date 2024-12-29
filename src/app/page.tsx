import Image from "next/image";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  description: string;
  mentor: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  steps: number;
};

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: '리액트로 투두리스트 만들기',
    description: '기초적인 CRUD 기능을 구현하며 리액트의 기본을 배워봅시다.',
    mentor: '김멘토',
    difficulty: 'beginner',
    tags: ['React', 'JavaScript', 'CSS'],
    steps: 5
  },
  {
    id: '2',
    title: 'NextJS로 블로그 구축하기',
    description: 'NextJS의 주요 기능을 활용하여 개인 블로그를 만들어봅시다.',
    mentor: '이멘토',
    difficulty: 'intermediate',
    tags: ['NextJS', 'TypeScript', 'TailwindCSS'],
    steps: 7
  }
];

const getDifficultyColor = (difficulty: Project['difficulty']) => {
  const colors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };
  return colors[difficulty];
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            PBL 프로젝트 플랫폼
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            실전 프로젝트로 실력을 키워보세요
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_PROJECTS.map((project) => (
            <Link 
              href={`/projects/${project.id}`}
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h2>
                <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(project.difficulty)}`}>
                  {project.difficulty}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>멘토: {project.mentor}</span>
                <span>{project.steps}단계</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
