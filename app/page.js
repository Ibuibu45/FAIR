"use client";

import { useEffect, useState } from "react";

const API = "/api/status"; // ⬅️ WAJIB pakai ini (proxy Vercel)

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await fetch(API, { cache: "no-store" });
      if (!res.ok) throw new Error("Fetch failed");
      const json = await res.json();
      setData(json);
      setError(false);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 5000); // auto refresh 5 detik
    return () => clearInterval(t);
  }, []);

  // ================= RENDER =================

  if (loading) {
    return (
      <main style={styles.center}>
        <span style={styles.loading}>Loading FAIR system…</span>
      </main>
    );
  }

  if (error) {
    return (
      <main style={styles.center}>
        <span style={styles.error}>❌ Cannot connect to backend</span>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>$FAIR Dashboard</h1>

      <div style={styles.card}>
        <pre style={styles.pre}>
{JSON.stringify(data, null, 2)}
        </pre>
      </div>

      <p style={styles.footer}>
        Auto refresh every 5 seconds · Fully transparent · On-chain
      </p>
    </main>
  );
}

// ================= STYLES =================

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "radial-gradient(circle at top, #020202, #000)",
    color: "#00ffe1",
    fontFamily: "monospace"
  },
  center: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#000",
    fontFamily: "monospace"
  },
  title: {
    color: "#00ffcc",
    textShadow: "0 0 20px #00ffcc",
    marginBottom: "20px"
  },
  card: {
    border: "1px solid #00ffe1",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 0 25px rgba(0,255,225,0.4)",
    background: "#050505"
  },
  pre: {
    margin: 0,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word"
  },
  footer: {
    marginTop: "20px",
    opacity: 0.6,
    fontSize: "12px"
  },
  error: {
    color: "#ff4d4d",
    fontSize: "18px"
  },
  loading: {
    color: "#00ffe1",
    fontSize: "18px",
    opacity: 0.8
  }
};
