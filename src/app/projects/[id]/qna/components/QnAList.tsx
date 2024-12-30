import { QnAPost } from '@/types/qna'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface Props {
  posts: QnAPost[]
}

export default function QnAList({ posts }: Props) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={post.authorAvatar}
                alt={post.authorName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {post.authorName} ·{' '}
                  {format(new Date(post.createdAt), 'PPP', { locale: ko })}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {post.isResolved && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  해결됨
                </span>
              )}
              <span className="text-sm text-gray-500">
                조회 {post.viewCount}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-600 dark:text-gray-300">{post.content}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {post.comments.length > 0 && (
            <div className="mt-6 space-y-4">
              {post.comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`pl-4 border-l-2 ${
                    comment.isAnswer ? 'border-green-500' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src={comment.authorAvatar}
                      alt={comment.authorName}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {comment.authorName}
                    </span>
                    {comment.isAnswer && (
                      <span className="text-sm text-green-600">멘토 답변</span>
                    )}
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
