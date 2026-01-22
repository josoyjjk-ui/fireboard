import Link from "next/link";

export default function TopNav() {
  return (
    <header className="border-b bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          Fireboard
        </Link>
        <a
          href="https://t.me/"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-neutral-600 hover:text-neutral-900"
        >
          Telegram
        </a>
      </div>
    </header>
  );
}
