import { getPosts } from "@/actions/posts"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Posts - Kiroku",
  description: "Browse all blog posts on Kiroku",
}

export default async function PostsPage() {
  // Fetch posts and user in parallel (both are async server operations)
  const [postsResult] = await Promise.all([
    getPosts()
  ])

  const { posts } = postsResult

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">All Posts</h1>
          <p className="text-muted-foreground">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No posts yet</h2>
            <p className="text-muted-foreground mb-6">
              Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                {/* Post Image Placeholder */}
                {post.image && (
                  <div className="mb-4 aspect-video bg-muted rounded-md overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Post Content */}
                <Link href={`/posts/${post.slug}`}>
                  <h2 className="text-xl font-semibold mb-2 hover:text-primary line-clamp-2">
                    {post.title}
                  </h2>
                </Link>

                {post.excerpt && (
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}

                {/* Author & Meta */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    {post.author.image ? (
                      <img
                        src={post.author.image}
                        alt={post.author.name || "Author"}
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                        {post.author.name?.[0]?.toUpperCase() || "?"}
                      </div>
                    )}
                    <span>{post.author.name || "Anonymous"}</span>
                  </div>

                  <span>•</span>

                  <time dateTime={post.createdAt.toISOString()}>
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>

                {/* Stats */}
                <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
                  <span>{post._count.likes} likes</span>
                  <span>{post._count.comments} comments</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}