import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Life Timer — The Stopwatch You Can Never Stop" },
      {
        name: "description",
        content:
          "Life Timer counts every second of your life. Starting is free forever. Stopping requires Life Timer Pro at $79.99 per week.",
      },
      { property: "og:title", content: "Life Timer — The Stopwatch You Can Never Stop" },
      {
        property: "og:description",
        content:
          "Press start for free. Press stop and meet the paywall. Life Timer Pro: $79.99 weekly, cancel whenever you can.",
      },
    ],
  }),
  component: Index,
});

const format = (ms: number) => {
  const total = Math.max(0, ms);
  const hours = Math.floor(total / 3_600_000);
  const minutes = Math.floor((total % 3_600_000) / 60_000);
  const seconds = Math.floor((total % 60_000) / 1000);
  const centis = Math.floor((total % 1000) / 10);
  const pad = (n: number) => String(n).padStart(2, "0");
  return { hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds), centis: pad(centis) };
};

const nags = [
  "Every second is non-refundable.",
  "Time spent: unrecoverable. Time remaining: unknown.",
  "Free users cannot pause reality.",
  "You are currently on the Mortal plan.",
  "This is the only clock that has never been wrong.",
];

function Index() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [stopAttempts, setStopAttempts] = useState(0);
  const [plan, setPlan] = useState<"weekly" | "eternal">("weekly");
  const startRef = useRef(0);
  const baseRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    startRef.current = performance.now();
    let frame = 0;
    const loop = () => {
      setElapsed(baseRef.current + (performance.now() - startRef.current));
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  const handleStart = () => {
    if (running) return;
    baseRef.current = elapsed;
    setRunning(true);
  };

  const handleStop = () => {
    setStopAttempts((n) => n + 1);
    setPaywallOpen(true);
  };

  const t = format(elapsed);
  const nag = nags[Math.min(stopAttempts, nags.length - 1)];

  return (
    <main className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-gold tick-dot" />
          <span className="font-display text-sm font-semibold tracking-[0.3em] uppercase">
            Life Timer
          </span>
        </div>
        <button
          onClick={() => setPaywallOpen(true)}
          className="rounded-full px-4 py-2 text-xs font-semibold tracking-wide btn-lux"
        >
          Upgrade to Pro
        </button>
      </header>

      <section className="mx-auto max-w-3xl px-6 pt-8 pb-20 text-center">
        <p className="text-xs font-semibold tracking-[0.35em] text-muted-foreground uppercase">
          Est. the moment you were born
        </p>
        <h1 className="mt-5 font-display text-4xl leading-tight font-bold sm:text-6xl">
          The stopwatch you can <span className="text-gold-gradient">never</span> stop
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
          Starting is free, forever. Stopping is a premium feature. Life Timer is the world's first
          chronometer with a monetisation strategy instead of a pause button.
        </p>

        <div className="mt-12 surface-card grain px-6 py-10 sm:px-12">
          <div className="flex items-baseline justify-center font-mono text-5xl font-bold tracking-tight tabular-nums sm:text-7xl">
            <span>{t.hours}</span>
            <span className="mx-1 text-muted-foreground">:</span>
            <span>{t.minutes}</span>
            <span className="mx-1 text-muted-foreground">:</span>
            <span>{t.seconds}</span>
            <span className="ml-2 text-2xl text-gold sm:text-3xl">{t.centis}</span>
          </div>
          <p className="mt-4 text-xs tracking-[0.25em] text-muted-foreground uppercase">
            {running ? "Time is passing" : "Standing by"} · {nag}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={handleStart}
              disabled={running}
              className="rounded-full px-8 py-4 font-display text-sm font-semibold tracking-wide btn-lux disabled:cursor-not-allowed disabled:opacity-50"
            >
              {running ? "Running…" : "Start"}
            </button>
            <button
              onClick={handleStop}
              className="relative rounded-full px-8 py-4 font-display text-sm font-semibold tracking-wide btn-ghost-lux"
            >
              Stop
              <span className="ml-2 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold tracking-widest text-gold uppercase">
                Pro
              </span>
            </button>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            Stop attempts today: <span className="font-mono text-gold">{stopAttempts}</span> · all
            declined
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-20 sm:grid-cols-3">
        {[
          {
            title: "Unlimited starting",
            body: "Press start as many times as you like. Generous, honestly.",
          },
          {
            title: "Zero pausing",
            body: "Pausing is reserved for Pro members and certain deities.",
          },
          {
            title: "Honest accounting",
            body: "Centisecond precision on the one resource you can't buy back.",
          },
        ].map((f) => (
          <div key={f.title} className="surface-card p-6 text-left">
            <h3 className="font-display text-base font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">
          Loved by people who ran out of time
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              quote: "I upgraded at 3am just to stop the ticking. Worth every dollar.",
              name: "Marcus D.",
              role: "Pro member, 41 weeks",
            },
            {
              quote: "Finally a subscription that reflects how expensive time really is.",
              name: "Ivy R.",
              role: "Eternal tier",
            },
            {
              quote: "Still on the free plan. The timer has been running since March.",
              name: "Anon",
              role: "Mortal plan",
            },
          ].map((r) => (
            <figure key={r.name} className="surface-card p-6 text-left">
              <blockquote className="text-sm leading-relaxed">"{r.quote}"</blockquote>
              <figcaption className="mt-4 text-xs text-muted-foreground">
                <span className="text-gold">{r.name}</span> — {r.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer className="border-t border-border px-6 py-10 text-center text-xs text-muted-foreground">
        Life Timer™ · A parody. No payments are processed, no seconds are refunded.
      </footer>

      {paywallOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Upgrade to Life Timer Pro"
          className="fixed inset-0 z-50 flex items-end justify-center bg-background/85 p-4 backdrop-blur-md sm:items-center"
        >
          <div className="surface-card grain w-full max-w-md p-7 text-center">
            <p className="text-[10px] font-bold tracking-[0.35em] text-gold uppercase">
              Premium feature
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold">Stopping time requires Pro</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The timer is still running while you read this. Upgrade now to regain control of your
              own mortality.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2">
              {(
                [
                  { id: "weekly", label: "Weekly", price: "$79.99", note: "billed every 7 days" },
                  { id: "eternal", label: "Eternal", price: "$4,159", note: "billed every year" },
                ] as const
              ).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlan(p.id)}
                  className={`rounded-xl border p-4 text-left transition-colors ${
                    plan === p.id
                      ? "border-gold bg-accent"
                      : "border-border bg-secondary hover:bg-accent"
                  }`}
                >
                  <span className="block text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                    {p.label}
                  </span>
                  <span className="mt-1 block font-display text-xl font-bold">{p.price}</span>
                  <span className="mt-1 block text-[10px] text-muted-foreground">{p.note}</span>
                </button>
              ))}
            </div>

            <ul className="mt-6 space-y-2 text-left text-sm text-muted-foreground">
              {[
                "Unlock the Stop button",
                "Lap times, retroactively",
                "Priority support in your final hour",
              ].map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                  {i}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setPaywallOpen(false)}
              className="mt-7 w-full rounded-full px-6 py-4 font-display text-sm font-semibold btn-lux"
            >
              Continue to checkout — {plan === "weekly" ? "$79.99 / week" : "$4,159 / year"}
            </button>
            <button
              onClick={() => setPaywallOpen(false)}
              className="mt-3 w-full rounded-full px-6 py-3 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              No thanks, let it run
            </button>
            <p className="mt-4 font-mono text-[10px] text-muted-foreground">
              {t.hours}:{t.minutes}:{t.seconds}.{t.centis} elapsed and counting
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
