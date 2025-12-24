"use client";

import { useEffect, useState } from "react";

const API = "/api/status";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  async function load() {
    try {
      const res = await fetch(API, { cache: "no-store" });
      const json = await res.json();
      setData(json);
      setError(false);
    } catch {
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
      <main style={styles.center}>
        <div style={styles.error}>❌ BACKEND OFFLINE</div>
      </main>
    );
  }

  if (!data) {
    return (
      <main style={styles.center}>
        <div style={styles.loading}>LOADING FAIR SYSTEM…</div>
      </main>
    );
  }

  const { system, stats, lastDraw } = data;

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>$FAIR</h1>
      <p style={styles.subtitle}>Fully Transparent Reward System</p>

      <div style={styles.grid}>
        <Card label="SYSTEM STATUS" value={system.status.toUpperCase()} />
        <Card label="TOTAL DRAWS" value={stats.totalDraws} />
        <Card label="DISTRIBUTED" value={`${stats.totalDistributed} SOL`} />
        <Card label="UNIQUE WINNERS" value={stats.uniqueWinners} />
      </div>

      <div style={styles.cardBig}>
        <h2 style={styles.sectionTitle}>LAST DRAW</h2>

        {lastDraw ? (
          <>
            <Row label="Winner" value={lastDraw.winner} />
            <Row label="Reward" value={`${lastDraw.reward} SOL`} />
            <Row label="Time" value={new Date(lastDraw.time).toLocaleString()} />
          </>
        ) : (
          <div style={styles.empty}>No draw yet</div>
        )}
      </div>

      <p style={styles.footer}>
        Auto refresh · On-chain · No manual intervention
      </p>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function Card({ label, value }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardLabel}>{label}</div>
      <div style={styles.cardValue}>{value}</div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={styles.row}>
      <span style={styles.rowLabel}>{label}</span>
      <span style={styles.rowValue}>{value}</span>
    </div>
  );
}

/* ================= STYLES ================= */

const neon = "#00ffe1";

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #050505, #000)",
    color: neon,
    fontFamily: "monospace",
    padding: "32px",
    textAlign: "center"
  },
  center: {
    minHeight: "100vh",
    background: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "monospace"
  },
  title: {
    fontSize: "48px",
    letterSpacing: "4px",
    textShadow: `0 0 30px ${neon}`,
    marginBottom: "4px"
  },
  subtitle: {
    opacity: 0.7,
    marginBottom: "32px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "16px",
    marginBottom: "32px"
  },
  card: {
    border: `1px solid ${neon}`,
    borderRadius: "10px",
    padding: "16px",
    boxShadow: `0 0 20px rgba(0,255,225,0.4)`,
    background: "#050505"
  },
  cardLabel: {
    fontSize: "12px",
    opacity: 0.6,
    marginBottom: "8px"
  },
  cardValue: {
    fontSize: "22px",
    textShadow: `0 0 12px ${neon}`
  },
  cardBig: {
    border: `1px solid ${neon}`,
    borderRadius: "14px",
    padding: "20px",
    boxShadow: `0 0 30px rgba(0,255,225,0.5)`,
    background: "#040404",
    maxWidth: "520px",
    margin: "0 auto"
  },
  sectionTitle: {
    marginBottom: "16px",
    textShadow: `0 0 15px ${neon}`
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px"
  },
  rowLabel: {
    opacity: 0.6
  },
  rowValue: {
    fontWeight: "bold"
  },
  empty: {
    opacity: 0.5,
    padding: "20px"
  },
  footer: {
    marginTop: "32px",
    fontSize: "12px",
    opacity: 0.5
  },
  error: {
    color: "#ff4d4d",
    fontSize: "18px"
  },
  loading: {
    fontSize: "18px",
    opacity: 0.7
  }
};
