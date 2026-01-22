export function formatPeriod(startAt: string | null, endAt: string | null) {
  const fmt = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const s = startAt ? fmt.format(new Date(startAt)) : null;
  const e = endAt ? fmt.format(new Date(endAt)) : null;

  if (s && e) return `${s} ~ ${e}`;
  if (s && !e) return `${s} ~`;
  if (!s && e) return `~ ${e}`;
  return "기간 미정";
}

export function statusLabel(status: "active" | "upcoming" | "ended" | "hidden") {
  if (status === "active") return "진행중";
  if (status === "upcoming") return "예정";
  if (status === "ended") return "종료";
  return "숨김";
}
