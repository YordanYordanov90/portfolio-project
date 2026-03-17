import { SectionWrapper } from "@/components/section-wrapper";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import articles from "@/articles/articles.json";

export const metadata = {
  title: "Blog - Y.Yordanov",
  description: "Writing about AI, Security, and Full-Stack Development.",
};

export default function BlogPage() {
  const posts = [
    {
      title: articles.title,
      date: new Date(articles.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      excerpt: articles.content[0].body,
      slug: `/blog/${articles.id}`,
    }
  ];

  return (
    <main className="flex flex-col items-center justify-center pt-32 pb-16 px-6 sm:px-12 max-w-5xl mx-auto w-full">
      <SectionWrapper className="w-full">
        <div className="flex flex-col gap-4 mb-12">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4 w-fit transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Blog
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
            Thoughts, technical deep dives, and ongoing research into modern software and security.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {posts.map((post, idx) => (
            <Link key={idx} href={post.slug} className="group flex flex-col gap-2 rounded-2xl p-6 md:p-8 border border-border bg-card/50 hover:bg-card hover:shadow-sm transition-all">
              <span className="text-sm font-medium text-muted-foreground">{post.date}</span>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="mt-4 text-sm font-semibold text-primary inline-flex items-center">
                Read article <span className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
              </div>
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </main>
  );
}
