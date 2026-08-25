import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Life Timer — A Beautifully Simple Stopwatch" },
      {
        name: "description",
        content:
          "Life Timer is a minimal, premium stopwatch. Press start, watch the seconds go, and see how long you can keep it running.",
      },
      { property: "og:title", content: "Life Timer — A Beautifully Simple Stopwatch" },
      {
        property: "og:description",
        content: "A minimal, premium stopwatch with centisecond precision. Press start.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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

function Index() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [shocking, setShocking] = useState(false);
  const [plan, setPlan] = useState<"weekly" | "eternal">("weekly");
  const startRef = useRef(0);
  const baseRef = useRef(0);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

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
    if (shocking || paywallOpen) return;
    setShocking(true);
    window.setTimeout(() => {
      setShocking(false);
      setPaywallOpen(true);
    }, 700);
  };

  const t = format(elapsed);

  return (
    <main className={`flex h-screen flex-col overflow-hidden ${shocking ? "shock-shake" : ""}`}>
      <header className="flex items-center justify-center px-6 py-6">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-gold tick-dot" />
          <span className="font-display text-sm font-semibold tracking-[0.3em] uppercase">
            Life Timer
          </span>
        </div>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center px-6 pb-10 text-center">
        <h1 className="font-display text-3xl leading-tight font-bold sm:text-5xl">
          Every second, <span className="text-gold-gradient">beautifully</span> counted
        </h1>

        <div className="mt-8 w-full max-w-md surface-card grain px-6 py-9 sm:px-10">
          <div className="flex items-baseline justify-center font-mono text-4xl font-bold tracking-tight tabular-nums sm:text-6xl">
            <span>{t.hours}</span>
            <span className="mx-1 text-muted-foreground">:</span>
            <span>{t.minutes}</span>
            <span className="mx-1 text-muted-foreground">:</span>
            <span>{t.seconds}</span>
            <span className="ml-2 text-xl text-gold sm:text-2xl">{t.centis}</span>
          </div>
          <p className="mt-3 text-xs tracking-[0.25em] text-muted-foreground uppercase">
            {running ? "Running" : "Standing by"}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={handleStart}
              disabled={running}
              className="rounded-full px-8 py-4 font-display text-sm font-semibold tracking-wide btn-lux disabled:cursor-not-allowed disabled:opacity-50"
            >
              {running ? "Running…" : "Start"}
            </button>
            <button
              onClick={handleStop}
              className="rounded-full px-8 py-4 font-display text-sm font-semibold tracking-wide btn-ghost-lux"
            >
              Stop
            </button>
          </div>
        </div>
      </section>

      {shocking && (
        <>
          <div className="pointer-events-none fixed inset-0 z-40 bg-destructive shock-flash" />
          <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center">
            <span className="font-display text-2xl font-black tracking-[0.3em] text-foreground uppercase shock-denied sm:text-4xl">
              Denied
            </span>
          </div>
        </>
      )}


      {paywallOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Upgrade to Life Timer Pro"
          className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-background/90 p-4 backdrop-blur-md sm:items-center"
        >
          <div className="surface-card grain w-full max-w-md p-7 text-center paywall-slam">
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
