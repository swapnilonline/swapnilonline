import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { allPosts, getPost, formatDate } from "@/lib/blog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return allPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `${site.url}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [site.name],
      url: `${site.url}/blog/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = post.related.map((s) => getPost(s)).filter((p): p is NonNullable<typeof p> => !!p);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      author: { "@type": "Person", name: site.name, url: `${site.url}/about`, jobTitle: site.role },
      publisher: { "@type": "Person", name: site.name, url: site.url },
      mainEntityOfPage: `${site.url}/blog/${post.slug}`,
      image: `${site.url}/opengraph-image`,
      keywords: post.keywords.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: `${site.url}/blog/${post.slug}` },
      ],
    },
    ...(post.faq.length
      ? [{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }]
      : []),
  ];

  return (
    <div className="mx-auto max-w-5xl px-5">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="grid gap-12 py-14 lg:grid-cols-[1fr_260px] lg:py-20">
        <div className="min-w-0">
          <header className="flex flex-col gap-5">
            <p className="eyebrow">
              <Link href="/blog" className="text-ink-soft no-underline hover:text-ink">Blog</Link> · {post.cluster} ·{" "}
              {post.readingMinutes} min read
            </p>
            <h1 className="text-[36px] font-extrabold leading-[1.08] sm:text-[48px]">{post.title}</h1>
            <p className="text-[20px] leading-[1.45] text-ink-soft">{post.description}</p>
            <div className="flex items-center gap-3 border-t border-line pt-4">
              <Image src="/swapnil-portrait.jpg" alt="" width={48} height={48} sizes="48px" className="h-12 w-12 rounded-full object-cover object-top" />
              <div className="flex flex-col">
                <span className="font-display text-[15px] font-bold">{site.name}</span>
                <span className="font-mono text-[12px] text-ink-soft">
                  {site.role} · {formatDate(post.date)}{post.updated ? ` · updated ${formatDate(post.updated)}` : ""}
                </span>
              </div>
            </div>
          </header>

          <div className="prose mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

          <aside className="mt-14 flex flex-col gap-5 bg-panel px-7 py-9 text-panel-ink sm:px-9">
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-mark">Do this next</p>
            <h2 className="max-w-[24ch] text-[28px] font-extrabold text-panel-ink sm:text-[32px]">
              Find out if you&rsquo;re eligible, and which stage is blocking you.
            </h2>
            <p className="max-w-[56ch] text-[17px] text-panel-ink/85">
              Eleven questions, three minutes. You get a score out of 14, your lane, the stage that&rsquo;s in the way, the
              one thing to do this week, and a free copy of The Digital Business Blueprint.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/fit" className="btn bg-mark text-accent-ink hover:bg-accent-strong">
                Check your eligibility <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </aside>

          {related.length > 0 && (
            <section className="mt-14 border-t border-line pt-8">
              <p className="eyebrow">Read next</p>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/blog/${r.slug}`} className="flex h-full flex-col gap-2 border border-line bg-surface p-5 no-underline hover:bg-surface-2">
                      <span className="eyebrow">{r.cluster}</span>
                      <span className="font-display text-[19px] font-bold leading-tight text-ink">{r.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-8 flex flex-col gap-3 border-l border-line pl-5">
            <p className="eyebrow">On this page</p>
            <ol className="flex flex-col gap-2 text-[14.5px]">
              {post.headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="text-ink-soft no-underline hover:text-ink">{h.text}</a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      </article>
    </div>
  );
}
