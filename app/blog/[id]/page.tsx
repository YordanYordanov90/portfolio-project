import { SectionWrapper } from "@/components/section-wrapper";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import articles from "@/articles/articles.json";
import { notFound } from "next/navigation";

interface ArticleContent {
  section: string;
  heading: string;
  body: string;
}

interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  author: string;
  tags: string[];
  content: ArticleContent[];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return [{ id: articles.id }];
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  
  if (id !== articles.id) {
    return {
      title: "Article Not Found - Y.Yordanov",
    };
  }

  return {
    title: `${articles.title} - Y.Yordanov`,
    description: articles.content[0].body.slice(0, 160),
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;

  if (id !== articles.id) {
    notFound();
  }

  const article: Article = articles;

  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="flex flex-col items-center justify-center pb-16 px-6 sm:px-12 max-w-4xl mx-auto w-full">
      <SectionWrapper className="w-full">
        <div className="flex flex-col gap-4 mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4 w-fit transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {article.author}
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary w-fit">
            <Tag className="h-4 w-4" />
            {article.category}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap gap-2 mt-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div className="space-y-12 mt-12">
            {article.content.map((section, idx) => (
              <section key={idx} className="group">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-4 group-hover:text-primary transition-colors">
                  {section.heading}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </article>

        <div className="mt-16 pt-8 border-t border-border">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all articles
          </Link>
        </div>
      </SectionWrapper>
    </main>
  );
}
