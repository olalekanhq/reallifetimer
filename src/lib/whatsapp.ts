const PHONE = "2347068803881";

const MESSAGES = [
  "Bro abeg 🙏 I want to pay the $79.99 so I can stop this stopwatch. My life is literally counting up as we speak.",
  "Hello Life Timer support 👋 I need to pay to stop the timer. It's been running for so long I now call it my firstborn.",
  "Good day sir 🥲 I clicked Stop and it asked for $79.99. I am ready to pay, kindly free me from this clock.",
  "Please I want to subscribe to Pro 😭 the timer refused to stop and my heart rate is now premium too.",
  "I have accepted my fate. Take the $79.99 weekly, just STOP THE TIMER 😩",
  "Hi 👋 I'm here to pay money I don't have, to stop time that won't stop. Kindly send account details.",
  "Emergency 🚨 my life timer is still running. I want to pay for Pro before it reaches my next birthday.",
  "Sir/Ma, I came to press one small button and now I owe $79.99 weekly. I'm ready to pay, just be gentle.",
  "I want Pro 🏆 not for features, only so this stopwatch can respect my boundaries.",
  "Please charge my card 💳 I'd rather go broke than watch this number climb one more second.",
  "Hello, I would like to pay to stop the stopwatch. I have prayed about it and this is the only way 🙏",
  "I'm subscribing 😤 not because I love you, but because that timer has humbled me completely.",
];

export function whatsappCheckoutUrl(plan: "weekly" | "eternal", elapsed: string) {
  const price = plan === "weekly" ? "$79.99 / week" : "$4,159 / year";
  const funny = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]!;
  const text = `${funny}\n\nPlan: ${plan === "weekly" ? "Weekly Pro" : "Eternal Pro"} (${price})\nTime elapsed: ${elapsed}\n\nSent from Life Timer ⏱️`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
}
