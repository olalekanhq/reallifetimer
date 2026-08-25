import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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
  name: string;
  city: string;
  time: string;
  plan: "Weekly Pro" | "Eternal Pro";
  amount: string;
  ago: string;
  method: string;
};

const PAYMENTS: Payment[] = [
  { name: "Chidi Okafor", city: "Lagos, NG", time: "00:00:03.12", plan: "Weekly Pro", amount: "$79.99", ago: "just now", method: "Visa •••• 4417" },
  { name: "Ngozi Eze", city: "Enugu, NG", time: "00:00:05.84", plan: "Weekly Pro", amount: "$79.99", ago: "6s ago", method: "Apple Pay" },
  { name: "Tunde Bakare", city: "Ibadan, NG", time: "00:00:09.41", plan: "Eternal Pro", amount: "$4,159.00", ago: "14s ago", method: "Mastercard •••• 0921" },
  { name: "Amara Nwosu", city: "Owerri, NG", time: "00:00:12.07", plan: "Weekly Pro", amount: "$79.99", ago: "22s ago", method: "Verve •••• 7730" },
  { name: "Emeka Obi", city: "Onitsha, NG", time: "00:00:14.93", plan: "Weekly Pro", amount: "$79.99", ago: "35s ago", method: "Google Pay" },
  { name: "Fatima Bello", city: "Kano, NG", time: "00:00:18.55", plan: "Weekly Pro", amount: "$79.99", ago: "48s ago", method: "Visa •••• 1188" },
  { name: "Adeola Adeyemi", city: "Abeokuta, NG", time: "00:00:22.10", plan: "Eternal Pro", amount: "$4,159.00", ago: "1m ago", method: "Amex •••• 3002" },
  { name: "Bukola Ajayi", city: "Akure, NG", time: "00:00:27.38", plan: "Weekly Pro", amount: "$79.99", ago: "1m ago", method: "Apple Pay" },
  { name: "Ibrahim Musa", city: "Kaduna, NG", time: "00:00:31.66", plan: "Weekly Pro", amount: "$79.99", ago: "2m ago", method: "Mastercard •••• 6644" },
  { name: "Zainab Yusuf", city: "Sokoto, NG", time: "00:00:38.02", plan: "Weekly Pro", amount: "$79.99", ago: "2m ago", method: "Visa •••• 9021" },
  { name: "Chioma Eze", city: "Aba, NG", time: "00:00:44.19", plan: "Weekly Pro", amount: "$79.99", ago: "3m ago", method: "Verve •••• 5510" },
  { name: "Seyi Adewale", city: "Lagos, NG", time: "00:00:51.77", plan: "Eternal Pro", amount: "$4,159.00", ago: "3m ago", method: "Apple Pay" },
  { name: "Halima Garba", city: "Katsina, NG", time: "00:00:58.31", plan: "Weekly Pro", amount: "$79.99", ago: "4m ago", method: "Visa •••• 2277" },
  { name: "Kelechi Okoro", city: "Port Harcourt, NG", time: "00:01:04.50", plan: "Weekly Pro", amount: "$79.99", ago: "5m ago", method: "Google Pay" },
  { name: "Aisha Sani", city: "Zaria, NG", time: "00:01:11.88", plan: "Weekly Pro", amount: "$79.99", ago: "6m ago", method: "Mastercard •••• 8143" },
  { name: "Femi Adebayo", city: "Ile-Ife, NG", time: "00:01:19.22", plan: "Weekly Pro", amount: "$79.99", ago: "7m ago", method: "Visa •••• 3390" },
  { name: "Nneka Obi", city: "Awka, NG", time: "00:01:27.04", plan: "Eternal Pro", amount: "$4,159.00", ago: "8m ago", method: "Amex •••• 1120" },
  { name: "Kunle Ogunleye", city: "Ado-Ekiti, NG", time: "00:01:35.61", plan: "Weekly Pro", amount: "$79.99", ago: "9m ago", method: "Apple Pay" },
  { name: "Hauwa Murtala", city: "Maiduguri, NG", time: "00:01:43.18", plan: "Weekly Pro", amount: "$79.99", ago: "11m ago", method: "Verve •••• 4402" },
  { name: "Ada Eze", city: "Nsukka, NG", time: "00:01:52.77", plan: "Weekly Pro", amount: "$79.99", ago: "12m ago", method: "Visa •••• 7781" },
  { name: "Damilola Ojuolape", city: "Oshogbo, NG", time: "00:02:01.40", plan: "Weekly Pro", amount: "$79.99", ago: "14m ago", method: "Google Pay" },
  { name: "Ifeanyi Nwankwo", city: "Nnewi, NG", time: "00:02:13.05", plan: "Eternal Pro", amount: "$4,159.00", ago: "16m ago", method: "Mastercard •••• 5567" },
  { name: "Binta Umar", city: "Gusau, NG", time: "00:02:24.91", plan: "Weekly Pro", amount: "$79.99", ago: "18m ago", method: "Visa •••• 6690" },
  { name: "Yetunde Olaiya", city: "Abeokuta, NG", time: "00:02:36.48", plan: "Weekly Pro", amount: "$79.99", ago: "21m ago", method: "Apple Pay" },
  { name: "Ebuka Nnamdi", city: "Awka, NG", time: "00:02:49.12", plan: "Weekly Pro", amount: "$79.99", ago: "24m ago", method: "Verve •••• 2018" },
  { name: "Lola Okafor", city: "Benin City, NG", time: "00:03:02.66", plan: "Weekly Pro", amount: "$79.99", ago: "27m ago", method: "Visa •••• 8834" },
  { name: "Oluwaseun Fashanu", city: "Lagos, NG", time: "00:03:15.39", plan: "Eternal Pro", amount: "$4,159.00", ago: "31m ago", method: "Amex •••• 4471" },
  { name: "Aminat Bello", city: "Minna, NG", time: "00:03:28.84", plan: "Weekly Pro", amount: "$79.99", ago: "35m ago", method: "Google Pay" },
  { name: "Tope Adebowale", city: "Ilorin, NG", time: "00:03:41.07", plan: "Weekly Pro", amount: "$79.99", ago: "39m ago", method: "Mastercard •••• 3126" },
  { name: "Obinna Okonkwo", city: "Uyo, NG", time: "00:03:54.22", plan: "Weekly Pro", amount: "$79.99", ago: "44m ago", method: "Visa •••• 9902" },
  { name: "Jumoke Olawoyin", city: "Ogbomoso, NG", time: "00:04:07.95", plan: "Weekly Pro", amount: "$79.99", ago: "50m ago", method: "Apple Pay" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function useTicker(start: number, step: number) {
  const [value, setValue] = useState(start);
  useEffect(() => {
    const id = window.setInterval(
      () => setValue((v) => v + Math.floor(Math.random() * step) + 1),
      2600,
    );
    return () => window.clearInterval(id);
  }, [step]);
  return value;
}

function PaymentRow({ p }: { p: Payment }) {
  const eternal = p.plan === "Eternal Pro";
  return (
    <li
      className={`rank-row flex items-center gap-3 px-4 py-3.5 sm:gap-4 ${eternal ? "rank-row-top" : ""}`}
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
              eternal
                ? "border-gold/40 text-gold"
                : "border-border text-muted-foreground"
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
        {p.ago}
      </span>
    </li>
  );
}

function LivePayments() {
  const paid = useTicker(18402, 4);
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
          Real-time upgrades landing from around the world
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

      <section className="surface-card mx-auto mt-8 max-w-3xl overflow-hidden p-3 sm:p-4">
        <div className="flex items-center justify-between px-1 pb-3">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-muted-foreground uppercase">
            Latest payments
          </span>
          <span className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-gold uppercase">
            <span className="tick-dot size-1.5 rounded-full bg-gold" />
            Live
          </span>
        </div>

        <div className="marquee-mask group relative h-[62vh] min-h-80 overflow-hidden">
          <ol
            className="marquee-track space-y-2 group-hover:[animation-play-state:paused]"
            style={{ ["--marquee-duration" as string]: `${PAYMENTS.length * 2.6}s` }}
          >
            {[...PAYMENTS, ...PAYMENTS].map((p, i) => (
              <PaymentRow key={`${p.name}-${i}`} p={p} />
            ))}
          </ol>
        </div>

        <p className="pt-3 text-center text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          Hover to pause
        </p>
      </section>
    </main>
  );
}
