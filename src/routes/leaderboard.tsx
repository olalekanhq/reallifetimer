import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Monthly Leaderboard — Life Timer" },
      {
        name: "description",
        content:
          "Live ranking of everyone who ended their life clock this month, with stop times and what it cost them.",
      },
      { property: "og:title", content: "Monthly Leaderboard — Life Timer" },
      {
        property: "og:description",
        content: "See who stopped their life clock fastest this month.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Leaderboard,
});

type Entry = { name: string; city: string; time: string };

const ENTRIES: Entry[] = [
  { name: "Chidi Okafor", city: "Lagos, NG", time: "00:00:03.12" },
  { name: "Ngozi Eze", city: "Enugu, NG", time: "00:00:05.84" },
  { name: "Tunde Bakare", city: "Ibadan, NG", time: "00:00:09.41" },
  { name: "Amara Nwosu", city: "Owerri, NG", time: "00:00:12.07" },
  { name: "Emeka Obi", city: "Onitsha, NG", time: "00:00:14.93" },
  { name: "Fatima Bello", city: "Kano, NG", time: "00:00:18.55" },
  { name: "Adeola Adeyemi", city: "Abẹokuta, NG", time: "00:00:22.10" },
  { name: "Bukola Ajayi", city: "Akure, NG", time: "00:00:27.38" },
  { name: "Ibrahim Musa", city: "Kaduna, NG", time: "00:00:31.66" },
  { name: "Zainab Yusuf", city: "Sokoto, NG", time: "00:00:38.02" },
  { name: "Chioma Eze", city: "Aba, NG", time: "00:00:44.19" },
  { name: "Seyi Adewale", city: "Lagos, NG", time: "00:00:51.77" },
  { name: "Halima Garba", city: "Katsina, NG", time: "00:00:58.31" },
  { name: "Kelechi Okoro", city: "Port Harcourt, NG", time: "00:01:04.50" },
  { name: "Aisha Sani", city: "Zaria, NG", time: "00:01:11.88" },
  { name: "Femi Adebayo", city: "Ile-Ife, NG", time: "00:01:19.22" },
  { name: "Nneka Obi", city: "Awka, NG", time: "00:01:27.04" },
  { name: "Kunle Ogunleye", city: "Ado-Ekiti, NG", time: "00:01:35.61" },
  { name: "Hauwa Murtala", city: "Maiduguri, NG", time: "00:01:43.18" },
  { name: "Ada Eze", city: "Nsukka, NG", time: "00:01:52.77" },
  { name: "Damilola Ojuolape", city: "Oshogbo, NG", time: "00:02:01.40" },
  { name: "Ifeanyi Nwankwo", city: "Nnewi, NG", time: "00:02:13.05" },
  { name: "Binta Umar", city: "Gusau, NG", time: "00:02:24.91" },
  { name: "Yetunde Olaiya", city: "Abeokuta, NG", time: "00:02:36.48" },
  { name: "Ebuka Nnamdi", city: "Awka, NG", time: "00:02:49.12" },
  { name: "Lola Okafor", city: "Benin City, NG", time: "00:03:02.66" },
  { name: "Oluwaseun Fashanu", city: "Lagos, NG", time: "00:03:15.39" },
  { name: "Aminat Bello", city: "Minna, NG", time: "00:03:28.84" },
  { name: "Tope Adebowale", city: "Ilorin, NG", time: "00:03:41.07" },
  { name: "Obinna Okonkwo", city: "Uyo, NG", time: "00:03:54.22" },
  { name: "Jumoke Olawoyin", city: "Ogbomoso, NG", time: "00:04:07.95" },
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

function Leaderboard() {
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
          Monthly Leaderboard
        </span>
      </header>

      <section className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-3xl font-bold sm:text-5xl">
          They <span className="text-gold-gradient">ended</span> the clock.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Live ranking of who stopped their life clock this month
        </p>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            { v: paid.toLocaleString(), l: "Paid this month" },
            { v: `$${revenue.toFixed(2)}M`, l: "Revenue today" },
            { v: "3.12s", l: "Fastest stop" },
          ].map((s) => (
            <div key={s.l} className="surface-card px-3 py-5">
              <div className="font-mono text-lg font-bold tabular-nums sm:text-2xl">{s.v}</div>
              <div className="mt-1 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ol className="mx-auto mt-8 max-w-3xl space-y-2">
        {ENTRIES.map((e, i) => (
          <li
            key={e.name + e.time}
            className="surface-card flex items-center gap-3 px-4 py-4 sm:gap-4"
          >
            <span className="w-6 shrink-0 font-mono text-sm text-muted-foreground tabular-nums">
              {i + 1}
            </span>
            <span
              className={`grid size-10 shrink-0 place-items-center rounded-full font-display text-xs font-bold ${
                i < 3 ? "bg-gold text-background" : "bg-secondary text-foreground"
              }`}
            >
              {initials(e.name)}
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block truncate font-display text-sm font-semibold">{e.name}</span>
              <span className="block truncate text-xs text-muted-foreground">{e.city}</span>
            </span>
            <span className="shrink-0 text-right">
              <span className="block text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
                Stopped in
              </span>
              <span className="block font-mono text-xs font-semibold tabular-nums sm:text-sm">
                {e.time}
              </span>
            </span>
            <span className="hidden shrink-0 font-mono text-xs text-gold sm:block">$79.99</span>
          </li>
        ))}
      </ol>
    </main>
  );
}
