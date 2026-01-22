import EventCard from "@/components/EventCard";
import { listEvents } from "@/lib/events";

export default async function Home({
  searchParams,
}: {
  searchParams: { tab?: "active" | "upcoming" | "ended"; q?: string; tag?: string };
}) {
  const tab = searchParams.tab ?? "active";
  const q = searchParams.q ?? "";
  const tag = searchParams.tag ?? "";

  const events = await listEvents({ tab, q, tag });
  const tags = Array.from(new Set(events.flatMap((e) => e.tags || []))).slice(0, 30);

  const makeHref = (next: { tab?: string; q?: string; tag?: string }) => {
    const sp = new URLSearchParams();
    sp.set("tab", next.tab ?? tab);
    if ((next.q ?? q).trim()) sp.set("q", (next.q ?? q).trim());
    if ((next.tag ?? tag).trim()) sp.set("tag", (next.tag ?? tag).trim());
    return `/?${sp.toString()}`;
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Fireboard</h1>
          <p className="mt-1 text-sm text-neutral-600">
            이벤트를 한 번에 보고, 버튼 한 번에 참여.
          </p>
        </div>

        <form className="flex gap-2" action="/" method="get">
          <input type="hidden" name="tab" value={tab} />
          {tag ? <input type="hidden" name="tag" value={tag} /> : null}
          <input
            name="q"
            defaultValue={q}
            placeholder="이벤트 검색 (제목)"
            className="w-56 md:w-72 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-300"
          />
          <button className="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800">
            검색
          </button>
        </form>
      </div>

      <div className="mt-6 flex gap-2">
        {["active", "upcoming", "ended"].map((t) => (
          <a
            key={t}
            href={makeHref({ tab: t, q, tag })}
            className={[
              "rounded-full px-4 py-2 text-sm border",
              tab === t
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-white text-neutral-700 hover:bg-neutral-50",
            ].join(" ")}
          >
            {t === "active" ? "진행중" : t === "upcoming" ? "예정" : "종료"}
          </a>
        ))}
      </div>

      {tags.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={makeHref({ tab, q, tag: "" })}
            className={[
              "rounded-full px-3 py-1 text-xs border",
              !tag
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-white text-neutral-700 hover:bg-neutral-50",
            ].join(" ")}
          >
            전체
          </a>
          {tags.map((t) => (
            <a
              key={t}
              href={makeHref({ tab, q, tag: t })}
              className={[
                "rounded-full px-3 py-1 text-xs border",
                tag === t
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-white text-neutral-700 hover:bg-neutral-50",
              ].join(" ")}
            >
              #{t}
            </a>
          ))}
        </div>
      ) : null}

      <div className="mt-6 grid gap-4">
        {events.length ? (
          events.map((ev) => <EventCard key={ev.id} ev={ev} />)
        ) : (
          <div className="rounded-2xl border bg-white p-8 text-center text-neutral-600">
            표시할 이벤트가 없습니다. (Supabase에 events를 넣어주세요)
          </div>
        )}
      </div>
    </main>
  );
}
