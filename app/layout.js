import "./globals.css";
import { ThemeProvider, ThemeInitScript } from "@/components/theme-provider";

export const metadata = {
  title: "Ajay Kumar — Data Engineer",
  description:
    "Data Engineer building Databricks / PySpark / Delta Lake pipelines with validation built in. 100 GB/day migrated, 50+ tables under DQ checks. Open to DE & Analytics Engineer roles.",
  metadataBase: new URL("https://ajaynf.netlify.app"),
  openGraph: {
    title: "Ajay Kumar — Data Engineer",
    description:
      "Data Engineer building Databricks / PySpark / Delta Lake pipelines with validation built in. Open to DE & Analytics Engineer roles.",
    url: "https://ajaynf.netlify.app/",
    siteName: "Ajay Kumar — Data Engineer",
    images: [{ url: "/assets/og-cover.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay Kumar — Data Engineer",
    description:
      "Data Engineer building Databricks / PySpark / Delta Lake pipelines with validation built in.",
    images: ["/assets/og-cover.png"],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
  ],
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <ThemeInitScript />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
