import Link from "next/link";
import { EventRow } from "@/lib/events";
import { formatPeriod, statusLabel } from "@/lib/date";

export default function EventCard({ ev }: { ev: EventRow }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link href={`/events/${ev.id}`} className="block">
            <h3 className="font-semibold text-base md:text-lg leading-snug truncate">
              {ev.title}
            </h3>
          </Link>
          <div className="mt-1 text-sm text-neutral-600">
            {formatPeriod(ev.start_at, ev.end_at)}
          </div>
        </div>

        <span className="shrink-0 rounded-full border px-2 py-1 text-xs text-neutral-700">
          {statusLabel(ev.status)}
        </span>
      </div>

      {ev.summary ? (
        <p className="mt-3 text-sm text-neutral-700 leading-relaxed line-clamp-3">
          {ev.summary}
        </p>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-2">
        {(ev.tags ?? []).slice(0, 6).map((t) => (
          <span
            key={t}
            className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-700"
          >
            #{t}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <a
          href={ev.cta_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800"
        >
          {ev.cta_label || "참여하기"}
        </a>
        <Link
          href={`/events/${ev.id}`}
          className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm text-neutral-800 hover:bg-neutral-50"
        >
          상세보기
        </Link>
      </div>
    </div>
  );
}
