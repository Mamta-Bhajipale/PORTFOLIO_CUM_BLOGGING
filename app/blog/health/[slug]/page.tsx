import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogCategories } from "@/lib/blog-data";
import BlogPostView from "@/components/blog/BlogPostView";

const category = blogCategories.find((c) => c.slug === "health")!;

export function generateStaticParams() {
  return category.posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = category.posts.find((p) => p.slug === slug);
    if (!post) return { title: "Not Found" };
    return { title: `${post.title} — Health Stories` };
  });
}

export default async function HealthPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = category.posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <BlogPostView
      title={post.title}
      date={post.date}
      readTime={post.readTime}
      content={post.content}
      categorySlug="health"
      categoryLabel="Health"
    />
  );
}
