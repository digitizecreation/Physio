import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://drsamrudhhimane.in";
const SITE_NAME = "Dr. Samrudhhi A. Mane — Physiotherapist in Kopar Khairane & Ghansoli";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dr. Samrudhhi A. Mane | Physiotherapist in Kopar Khairane & Ghansoli",
    template: "%s | Dr. Samrudhhi A. Mane",
  },
  description:
    "Expert physiotherapy for knee pain, back pain, neck pain, sports injuries, ACL & meniscus rehabilitation, post-surgery rehab & home visits in Navi Mumbai. 4.9★ (155+ reviews). Open 24×7.",
  keywords: [
    "Physiotherapist in Kopar Khairane",
    "Physiotherapist in Ghansoli",
    "Physiotherapist Navi Mumbai",
    "Knee pain specialist Navi Mumbai",
    "Back pain treatment Kopar Khairane",
    "ACL rehabilitation Navi Mumbai",
    "Home visit physiotherapy",
    "Sports injury physiotherapist",
    "Post surgery rehabilitation",
    "Dr Samrudhhi Mane",
    "Satyam Hospital physiotherapy",
  ],
  authors: [{ name: "Dr. Samrudhhi A. Mane" }],
  creator: "Dr. Samrudhhi A. Mane",
  publisher: "Dr. Samrudhhi A. Mane",
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Dr. Samrudhhi A. Mane — Physiotherapist in Kopar Khairane & Ghansoli",
    description:
      "Expert physiotherapy for knee pain, back pain, neck pain, sports injuries & home visits in Navi Mumbai. 4.9★ (155+ Google reviews). Open 24×7.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Dr. Samrudhhi A. Mane — Physiotherapist" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Samrudhhi A. Mane — Physiotherapist in Navi Mumbai",
    description: "Knee • Back • Neck Pain Expert. Home Visit Physiotherapy. 4.9★ (155+ reviews).",
    images: ["/og-image.png"],
  },
  category: "medical",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1430" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Dr. Samrudhhi A. Mane",
  medicalSpecialty: ["Physiotherapy", "PhysicalTherapy", "Orthopedic"],
  image: SITE_URL + "/og-image.png",
  description:
    "Physiotherapist in Kopar Khairane & Ghansoli specialising in knee, back, neck pain, sports injuries, ACL & meniscus rehabilitation, post-surgery rehab and home visit physiotherapy.",
  telephone: "+91 97673 98194",
  url: SITE_URL,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Satyam Hospital, Sector 14, Kopar Khairane",
    addressLocality: "Navi Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400709",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 19.1077,
    longitude: 73.0017,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "155",
    bestRating: "5",
    worstRating: "1",
  },
  knowsAbout: [
    "Knee Pain",
    "ACL Rehabilitation",
    "Meniscus Rehabilitation",
    "Slip Disc",
    "Neck Pain",
    "Cervical Pain",
    "Frozen Shoulder",
    "Shoulder Pain",
    "Arthritis",
    "Sciatica",
    "Sports Injury",
    "Post Surgery Rehabilitation",
    "Home Physiotherapy",
    "Elderly Physiotherapy",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jakarta.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
