let ctx: AudioContext | null = null;

const getCtx = () => {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
};

/** Descending "access denied" buzz: two detuned saw tones plus a low thud. */
export const playDeniedSound = () => {
  const audio = getCtx();
  if (!audio) return;
  const now = audio.currentTime;

  const master = audio.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.28, now + 0.02);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 0.62);
  master.connect(audio.destination);

  const filter = audio.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2600, now);
  filter.frequency.exponentialRampToValueAtTime(500, now + 0.6);
  filter.connect(master);

  [0, 4].forEach((detune, i) => {
    const osc = audio.createOscillator();
    osc.type = "sawtooth";
    osc.detune.value = detune * 12;
    osc.frequency.setValueAtTime(320 - i * 40, now);
    osc.frequency.exponentialRampToValueAtTime(70 - i * 10, now + 0.55);
    osc.connect(filter);
    osc.start(now);
    osc.stop(now + 0.65);
  });

  const thud = audio.createOscillator();
  const thudGain = audio.createGain();
  thud.type = "sine";
  thud.frequency.setValueAtTime(120, now);
  thud.frequency.exponentialRampToValueAtTime(38, now + 0.35);
  thudGain.gain.setValueAtTime(0.35, now);
  thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
  thud.connect(thudGain).connect(audio.destination);
  thud.start(now);
  thud.stop(now + 0.5);
};

/** Short double-tap haptic pulse (no-op where unsupported). */
export const pulseHaptics = () => {
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return;
  try {
    navigator.vibrate([40, 60, 120]);
  } catch {
    /* ignore */
  }
};

/** Subtle two-note "new payment" blip. */
export const playPaymentSound = () => {
  const audio = getCtx();
  if (!audio) return;
  const now = audio.currentTime;

  const master = audio.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.08, now + 0.015);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);
  master.connect(audio.destination);

  [
    { f: 880, t: 0 },
    { f: 1320, t: 0.09 },
  ].forEach(({ f, t }) => {
    const osc = audio.createOscillator();
    const g = audio.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(f, now + t);
    g.gain.setValueAtTime(0.0001, now + t);
    g.gain.exponentialRampToValueAtTime(1, now + t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.22);
    osc.connect(g).connect(master);
    osc.start(now + t);
    osc.stop(now + t + 0.25);
  });
};
