import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Live Payments — Life Timer" },
      {
        name: "description",
        content:
          "Watch Life Timer Pro upgrades land in real time — who just paid $79.99 to stop their clock, from where, and how long they lasted.",
      },
      { property: "og:title", content: "Live Payments — Life Timer" },
      {
        property: "og:description",
        content: "Real-time feed of everyone paying to stop their life clock.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LivePayments,
});

type Payment = {
  id: number;
  name: string;
  city: string;
  time: string;
  plan: "Weekly Pro" | "Eternal Pro";
  amount: string;
  method: string;
  at: number;
};

const NAMES = [
  "Chidi Okafor", "Ngozi Eze", "Tunde Bakare", "Amara Nwosu", "Emeka Obi",
  "Fatima Bello", "Adeola Adeyemi", "Bukola Ajayi", "Ibrahim Musa", "Zainab Yusuf",
  "Chioma Eze", "Seyi Adewale", "Halima Garba", "Kelechi Okoro", "Aisha Sani",
  "Femi Adebayo", "Nneka Obi", "Kunle Ogunleye", "Hauwa Murtala", "Ada Eze",
  "Damilola Ojuolape", "Ifeanyi Nwankwo", "Binta Umar", "Yetunde Olaiya",
  "Ebuka Nnamdi", "Lola Okafor", "Oluwaseun Fashanu", "Aminat Bello",
  "Tope Adebowale", "Obinna Okonkwo", "Jumoke Olawoyin",
];

const CITIES = [
  "Lagos, NG", "Enugu, NG", "Ibadan, NG", "Owerri, NG", "Onitsha, NG",
  "Kano, NG", "Abeokuta, NG", "Akure, NG", "Kaduna, NG", "Sokoto, NG",
  "Port Harcourt, NG", "Zaria, NG", "Ile-Ife, NG", "Awka, NG", "Uyo, NG",
  "Benin City, NG", "Ilorin, NG", "Minna, NG", "Ogbomoso, NG", "Maiduguri, NG",
];

const METHODS = ["Visa", "Mastercard", "Verve", "Amex"];

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]!;

const pad = (n: number, w = 2) => String(n).padStart(w, "0");

function randomPayment(id: number): Payment {
  const eternal = Math.random() < 0.18;
  const total = Math.random() * 260;
  const time = `00:${pad(Math.floor(total / 60))}:${pad(Math.floor(total % 60))}.${pad(
    Math.floor((total % 1) * 100),
  )}`;
  const method =
    Math.random() < 0.3
      ? pick(["Apple Pay", "Google Pay"])
      : `${pick(METHODS)} •••• ${pad(Math.floor(Math.random() * 10000), 4)}`;
  return {
    id,
    name: pick(NAMES),
    city: pick(CITIES),
    time,
    plan: eternal ? "Eternal Pro" : "Weekly Pro",
    amount: eternal ? "$4,159.00" : "$79.99",
    method,
    at: Date.now(),
  };
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function agoLabel(at: number, now: number) {
  const s = Math.max(0, Math.round((now - at) / 1000));
  if (s < 3) return "just now";
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  return `${Math.floor(m / 60)}h ago`;
}

const MAX_ROWS = 14;

function PaymentRow({ p, now, fresh }: { p: Payment; now: number; fresh: boolean }) {
  const eternal = p.plan === "Eternal Pro";
  return (
    <li
      className={`rank-row flex items-center gap-3 px-4 py-3.5 sm:gap-4 ${
        eternal ? "rank-row-top" : ""
      } ${fresh ? "notif-in" : ""}`}
    >
      <span
        className={`grid size-10 shrink-0 place-items-center rounded-full font-display text-xs font-bold ${
          eternal ? "bg-gold text-background" : "bg-secondary text-foreground"
        }`}
      >
        {initials(p.name)}
      </span>

      <span className="min-w-0 flex-1 text-left">
        <span className="flex items-center gap-2">
          <span className="truncate font-display text-sm font-semibold tracking-tight">
            {p.name}
          </span>
          <span
            className={`hidden shrink-0 rounded-full border px-2 py-0.5 text-[9px] tracking-[0.15em] uppercase sm:inline ${
              eternal ? "border-gold/40 text-gold" : "border-border text-muted-foreground"
            }`}
          >
            {p.plan}
          </span>
        </span>
        <span className="mt-0.5 block truncate text-[11px] tracking-wide text-muted-foreground">
          {p.city} · {p.method}
        </span>
      </span>

      <span className="shrink-0 text-right">
        <span className="block font-mono text-sm font-bold tabular-nums text-gold">
          {p.amount}
        </span>
        <span className="block font-mono text-[10px] tabular-nums text-muted-foreground">
          stopped at {p.time}
        </span>
      </span>

      <span className="hidden w-16 shrink-0 text-right text-[10px] tracking-wide text-muted-foreground sm:block">
        {agoLabel(p.at, now)}
      </span>
    </li>
  );
}

function LivePayments() {
  const nextId = useRef(0);
  const [feed, setFeed] = useState<Payment[]>([]);
  const [now, setNow] = useState(0);
  const [paid, setPaid] = useState(18402);

  useEffect(() => {
    const seeded: Payment[] = [];
    for (let i = 0; i < MAX_ROWS; i++) {
      const p = randomPayment(nextId.current++);
      p.at = Date.now() - (i + 1) * 9000;
      seeded.push(p);
    }
    setFeed(seeded);
    setNow(Date.now());

    let timeout: number;
    const schedule = () => {
      timeout = window.setTimeout(
        () => {
          setFeed((prev) => [randomPayment(nextId.current++), ...prev].slice(0, MAX_ROWS));
          setPaid((v) => v + 1);
          schedule();
        },
        1400 + Math.random() * 2200,
      );
    };
    schedule();
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const revenue = (paid * 79.99) / 1_000_000;

  return (
    <main className="min-h-screen px-5 pb-16">
      <header className="mx-auto flex max-w-3xl items-center justify-between py-6">
        <Link
          to="/"
          className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          ← Stopwatch
        </Link>
        <span className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase">
          Live Payments
        </span>
      </header>

      <section className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
          They just <span className="text-gold-gradient">paid</span> to stop.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Every upgrade lands here the second it clears
        </p>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            { v: paid.toLocaleString(), l: "Upgrades this month" },
            { v: `$${revenue.toFixed(2)}M`, l: "Collected today" },
            { v: "3.12s", l: "Fastest surrender" },
          ].map((s) => (
            <div key={s.l} className="surface-card grain px-3 py-5">
              <div className="font-mono text-lg font-bold tabular-nums sm:text-2xl">{s.v}</div>
              <div className="mt-1 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-card mx-auto mt-8 max-w-3xl p-3 sm:p-4">
        <div className="flex items-center justify-between px-1 pb-3">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-muted-foreground uppercase">
            Incoming
          </span>
          <span className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-gold uppercase">
            <span className="tick-dot size-1.5 rounded-full bg-gold" />
            Live
          </span>
        </div>

        <ol className="space-y-2">
          {feed.map((p, i) => (
            <PaymentRow key={p.id} p={p} now={now} fresh={i === 0} />
          ))}
        </ol>
      </section>
    </main>
  );
}
