import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import type { BlogPost } from "../lib/blog";

const CATEGORY_STYLE: Record<BlogPost["category"], string> = {
  "Buying Tips": "bg-navy text-white",
  Financing: "bg-gold text-ink",
  Maintenance: "bg-red text-white",
  Local: "bg-white text-ink ring-1 ring-line-strong",
};

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-cloud">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ${CATEGORY_STYLE[post.category]}`}
        >
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-[17px] font-semibold leading-snug text-ink">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-[14px] leading-7 text-navy-600">
          {post.excerpt}
        </p>
        <p className="mt-4 border-t border-line pt-3 text-[12px] text-navy-500">
          {format(parseISO(post.date), "MMM d, yyyy")} · {post.readMinutes} min
          read
        </p>
      </div>
    </Link>
  );
}
