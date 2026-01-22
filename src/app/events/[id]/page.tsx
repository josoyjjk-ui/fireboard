export const dynamic = "force-dynamic";

import ReactMarkdown from "react-markdown";
import { getEventById } from "@/lib/events";
import { formatPeriod } from "@/lib/date";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const ev = await getEventById(params.id);
  const url = `${siteUrl}/events/${ev.id}`;
  const ogImage = ev.hero_image_url || `${siteUrl}/og-default.svg`;

  return {
    title: `${ev.title} | Fireboard`,
    description: ev.summary || "Fireboard 이벤트",
    openGraph: {
      title: ev.title,
      description: ev.summary || "Fireboard 이벤트",
      url,
      type: "article",
      images: [{ url: ogImage }],
    },
  };
}

export default async function EventDetail({ params }: { params: { id: string } }) {
  const ev = await getEventById(params.id);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        {ev.hero_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={ev.hero_image_url}
            alt={ev.title}
            className="w-full h-56 object-cover rounded-xl border"
          />
        ) : null}

        <h1 className="mt-4 text-2xl md:text-3xl font-semibold leading-snug">
          {ev.title}
        </h1>
        <div className="mt-2 text-sm text-neutral-600">
          {formatPeriod(ev.start_at, ev.end_at)}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {(ev.tags ?? []).map((t) => (
            <span
              key={t}
              className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-700"
            >
              #{t}
            </span>
          ))}
        </div>

        <div className="mt-5">
          <a
            href={ev.cta_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800"
          >
            {ev.cta_label || "참여하기"}
          </a>
        </div>

        <article className="mt-6 space-y-3 text-sm leading-relaxed text-neutral-800">
          <ReactMarkdown>{ev.content || ""}</ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
