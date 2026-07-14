import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Treadmill Method | Personalised Weight Loss Plan",
  description: "Lose weight sustainably and improve your cardiovascular fitness with custom treadmill walking workouts.",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  const lang = locale === "pt-br" ? "pt-BR" : "en-GB";

  return (
    <html
      lang={lang}
      className={`${montserrat.variable} ${plusJakartaSans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-50 font-sans selection:bg-lime-400 selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}
