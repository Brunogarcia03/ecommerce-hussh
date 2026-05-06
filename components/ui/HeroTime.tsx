"use client";

import { useEffect, useState } from "react";

export default function HeroTime() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toTimeString().slice(0, 8));
      setDate(
        `M${now.getMonth() + 1}.D${now.getDate()}.Y${String(now.getFullYear()).slice(-2)}`,
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <p>{date}</p>
      <p className="text-white/70">{time}</p>
    </>
  );
}
