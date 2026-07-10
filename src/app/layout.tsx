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
  "@graph": [
    {
      "@type": "Physician",
      "@id": SITE_URL + "#physician",
      name: "Dr. Samrudhhi A. Mane",
      medicalSpecialty: ["Physiotherapy", "PhysicalTherapy", "Orthopedic"],
      image: SITE_URL + "/og-image.png",
      description:
        "Physiotherapist in Kopar Khairane & Ghansoli specialising in knee, back, neck pain, sports injuries, ACL & meniscus rehabilitation, post-surgery rehab and home visit physiotherapy.",
      telephone: "+91 97673 98194",
      url: SITE_URL,
      priceRange: "₹₹",
      // Verified Google Places URL
      sameAs: ["https://maps.google.com/?cid=2265102277036777400"],
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Physiotherapy Center, Satyam Hospital, Vashi Kopar Khairane Rd, Sector 14, Kopar Khairane",
        addressLocality: "Navi Mumbai",
        addressRegion: "Maharashtra",
        postalCode: "400709",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        // Verified Google Places coordinates
        latitude: 19.0990885,
        longitude: 73.0046125,
      },
      hasMap: "https://maps.google.com/?cid=2265102277036777400",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
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
      review: [
        {
          "@type": "Review",
          author: { "@type": "Person", name: "shaikh aatif" },
          datePublished: "2025-11-29",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
            worstRating: "1",
          },
          reviewBody:
            "I am truly thankful to Dr. Samrudhhi Mane ma'am for helping me recover after my right knee meniscus repair and ACL reconstruction surgery. She supported me like family and explained every exercise with patience.",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Ansh Khora" },
          datePublished: "2025-08-07",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
            worstRating: "1",
          },
          reviewBody:
            "I can't thank Dr Samrudhhi enough for the care and attention I received. She didn't just treat my low back pain — she took the time to understand my lifestyle and helped me regain strength and confidence.",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "manoj zende" },
          datePublished: "2025-11-29",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
            worstRating: "1",
          },
          reviewBody:
            "Highly recommend Dr. Samrudhhi Mane physiotherapy; their professional care and tailored exercises helped me feel confident and stable in my knee again.",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Nikhil Tayade" },
          datePublished: "2022-12-20",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
            worstRating: "1",
          },
          reviewBody:
            "Visited this clinic with unbearable slip disc pain. I got the best physiotherapy treatment done which subsided my pain over the period of time with proper exercises.",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Sanket Patil" },
          datePublished: "2022-12-19",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
            worstRating: "1",
          },
          reviewBody:
            "I visited here for post surgery rehabilitation of my knee. Physiotherapy sessions were pain free and had wonderful recovery. Dr. Samrudhhi's exercises helped me a lot in restoring my knee movement.",
        },
      ],
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
    },
    {
      "@type": "FAQPage",
      "@id": SITE_URL + "#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How many sessions are required?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It depends on your condition, its severity and how your body responds. Acute issues may need 4–6 sessions, while post-surgery rehabilitation or chronic conditions often need 8–12 weeks of structured care. After your first assessment, Dr. Samrudhhi will give you a realistic estimate with milestones.",
          },
        },
        {
          "@type": "Question",
          name: "Do you provide home visits?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Home visit physiotherapy is one of our core services, available across Kopar Khairane, Ghansoli and nearby areas of Navi Mumbai. This is especially helpful for post-surgery patients, elderly patients, and anyone with limited mobility.",
          },
        },
        {
          "@type": "Question",
          name: "Do you treat sports injuries?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We routinely treat runners, footballers, gym-goers and weekend athletes for hamstring tears, ankle sprains, tendinopathies, shoulder impingements and more. Treatment includes a graded return-to-sport plan so you come back stronger and less prone to re-injury.",
          },
        },
        {
          "@type": "Question",
          name: "Do you treat ACL rehab?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — ACL reconstruction rehabilitation is one of our specialities. We follow a criterion-based protocol spanning range of motion, strength, neuromuscular control, plyometrics and sport-specific drills.",
          },
        },
        {
          "@type": "Question",
          name: "Can physiotherapy avoid surgery?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In many cases — yes. Conditions like partial meniscus tears, mild-to-moderate disc bulges, frozen shoulder, tendinopathies and many arthritic knees respond well to structured physiotherapy. If your case needs an orthopaedic opinion, we will tell you honestly and refer you to the right specialist.",
          },
        },
        {
          "@type": "Question",
          name: "Do you treat back pain?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — low back pain is one of the most common reasons patients come to us. We combine manual therapy, mobility work, progressive strengthening and ergonomic education to relieve pain and prevent recurrence.",
          },
        },
        {
          "@type": "Question",
          name: "Do you treat cervical pain?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Cervical pain, often from prolonged phone or laptop use, responds very well to a combination of manual therapy, postural correction, deep neck flexor strengthening and workstation ergonomics.",
          },
        },
      ],
    },
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
