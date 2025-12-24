export const metadata = {
  title: "FAIR Dashboard",
  description: "On-chain fair reward system"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        background: "#050505",
        color: "#00ffe1",
        fontFamily: "monospace"
      }}>
        {children}
      </body>
    </html>
  );
}
