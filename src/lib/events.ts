import { supabase } from "./supabaseClient";

export type EventStatus = "upcoming" | "active" | "ended" | "hidden";

export type EventRow = {
  id: string;
  title: string;
  summary: string;
  content: string;
  start_at: string | null;
  end_at: string | null;
  status: EventStatus;
  tags: string[];
  hero_image_url: string | null;
  cta_label: string;
  cta_url: string;
  created_at: string;
};

export async function listEvents(params: {
  tab?: "active" | "upcoming" | "ended";
  q?: string;
  tag?: string;
}) {
  const tab = params.tab ?? "active";
  const q = (params.q ?? "").trim();
  const tag = (params.tag ?? "").trim();

  let query = supabase
    .from("events")
    .select("*")
    .in("status", [tab])
    .order("start_at", { ascending: tab !== "ended" })
    .order("created_at", { ascending: false });

  if (q) query = query.ilike("title", `%${q}%`);
  if (tag) query = query.contains("tags", [tag]);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as EventRow[];
}

export async function getEventById(id: string) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data as EventRow;
}
