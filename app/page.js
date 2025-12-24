"use client";

import { useEffect, useState } from "react";

const API = "http://47.84.39.128/public/status.json";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  async function load() {
    try {
      const res = await fetch(API, { cache: "no-store" });
      const json = await res.json();
      setData(json);
      setError(false);
    } catch (e) {
      setError(true);
    }
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, []);

  if (error) {
    return (
      <div style={{ padding: 40 }}>
        ❌ Cannot connect to backend
      </div>
    );
  }

  if (!data) {
    return <div style={{ padding: 40 }}>Loading…</div>;
  }

  return (
    <main style={{ padding: 40 }}>
      <h1 style={{ color: "#00ffcc" }}>$FAIR Dashboard</h1>

      <pre style={{
        background: "#0b0b0b",
        border: "1px solid #00ffe1",
        padding: 20,
        boxShadow: "0 0 20px #00ffe1"
      }}>
{JSON.stringify(data, null, 2)}
      </pre>

      <p style={{ opacity: 0.6 }}>
        Auto refresh every 5s
      </p>
    </main>
  );
}
