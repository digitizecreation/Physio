export const BUSINESS = {
  name: "Dr. Samrudhhi A. Mane",
  role: "Physiotherapist in Kopar Khairane & Ghansoli",
  tagline: "Joint • Knee • Back • Neck Pain Expert",
  service: "Home Visit Physiotherapy Services",
  phone: "+91 97673 98194",
  phoneHref: "tel:+919767398194",
  whatsapp: "919767398194",
  whatsappHref:
    "https://wa.me/919767398194?text=Hi%20Dr.%20Samrudhhi%2C%20I%20would%20like%20to%20book%20a%20physiotherapy%20appointment.",
  rating: 4.9,
  reviewCount: 155,
  hours: "Open 24 Hours • 7 Days a Week",
  address: {
    line1: "Physiotherapy Center, Satyam Hospital",
    line2: "Vashi Kopar Khairane Rd, Sector 14, Kopar Khairane",
    city: "Navi Mumbai",
    state: "Maharashtra",
    pincode: "400709",
    full:
      "Physiotherapy Center, Satyam Hospital, Vashi Kopar Khairane Rd, Sector 14, Kopar Khairane, Navi Mumbai, Maharashtra 400709, India",
  },
  // Verified Google Places coordinates
  geo: { latitude: 19.0990885, longitude: 73.0046125 },
  // Verified Google Maps Place URI (cid)
  mapsEmbed:
    "https://www.google.com/maps?q=19.0990885,73.0046125&z=16&output=embed",
  mapsLink:
    "https://www.google.com/maps/dir/?api=1&destination=19.0990885,73.0046125",
  // Direct Google Places profile link (verified)
  googlePlacesUri:
    "https://maps.google.com/?cid=2265102277036777400",
  email: "care@drsamrudhhimane.in",
  social: {
    google:
      "https://maps.google.com/?cid=2265102277036777400",
  },
};


export const SPECIALIZATIONS = [
  { title: "Knee Pain", icon: "Knee" },
  { title: "ACL Rehabilitation", icon: "Activity" },
  { title: "Meniscus Rehabilitation", icon: "Bone" },
  { title: "Slip Disc", icon: "Disc" },
  { title: "Neck Pain", icon: "Neck" },
  { title: "Cervical Pain", icon: "Cervical" },
  { title: "Frozen Shoulder", icon: "Shoulder" },
  { title: "Shoulder Pain", icon: "Shoulder" },
  { title: "Arthritis", icon: "Bone" },
  { title: "Sciatica", icon: "Nerve" },
  { title: "Sports Injury", icon: "Activity" },
  { title: "Post Surgery Rehabilitation", icon: "HeartPulse" },
  { title: "Muscle Pain", icon: "Muscle" },
  { title: "Joint Pain", icon: "Bone" },
  { title: "Balance Training", icon: "Scale" },
  { title: "Posture Correction", icon: "Posture" },
  { title: "Elderly Physiotherapy", icon: "Elderly" },
  { title: "Home Physiotherapy", icon: "Home" },
] as const;

export const WHY_CHOOSE = [
  {
    title: "Personalized Treatment",
    description:
      "Every plan is built around your diagnosis, lifestyle and goals — never a one-size-fits-all protocol.",
    icon: "UserCheck",
  },
  {
    title: "Evidence-Based Techniques",
    description:
      "Treatment grounded in current research and clinical guidelines, so each session moves you measurably forward.",
    icon: "Microscope",
  },
  {
    title: "One-on-One Care",
    description:
      "Direct, undivided attention for the full session — no assistants, no rushing, no shared time slots.",
    icon: "HeartHandshake",
  },
  {
    title: "Home Visits",
    description:
      "Recover in the comfort of your own home — ideal for post-surgery, elderly and limited-mobility patients.",
    icon: "Home",
  },
  {
    title: "Fast Recovery Plans",
    description:
      "Structured milestones and progressive loading designed to shorten your recovery without compromising safety.",
    icon: "Gauge",
  },
  {
    title: "Pain Management",
    description:
      "Hands-on manual therapy, dry needling and movement re-education to reduce pain at its source, not mask it.",
    icon: "ShieldPlus",
  },
  {
    title: "Experienced Physiotherapist",
    description:
      "Years of clinical practice across orthopaedic, sports and post-operative rehabilitation cases.",
    icon: "Award",
  },
  {
    title: "Patient Education",
    description:
      "Understand the why behind every exercise — informed patients recover faster and stay pain-free longer.",
    icon: "BookOpen",
  },
  {
    title: "Long-Term Recovery",
    description:
      "Beyond pain relief, we build resilience — strengthening the weak links that caused the problem in the first place.",
    icon: "TrendingUp",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Assessment",
    description:
      "A thorough subjective and objective examination — history, posture, range of motion, strength and movement patterns.",
  },
  {
    step: "02",
    title: "Diagnosis",
    description:
      "A clear, jargon-free explanation of what's causing your pain and what we can realistically achieve together.",
  },
  {
    step: "03",
    title: "Customized Plan",
    description:
      "A written recovery roadmap with goals, milestones, expected timeline and the techniques we'll use.",
  },
  {
    step: "04",
    title: "Hands-on Therapy",
    description:
      "Manual therapy, mobilisations, soft-tissue work and modalities to reduce pain and restore movement.",
  },
  {
    step: "05",
    title: "Exercise Program",
    description:
      "A progressive, supervised exercise plan you can also continue at home — the engine of long-term recovery.",
  },
  {
    step: "06",
    title: "Recovery",
    description:
      "Return to daily life, sport or work — pain-free, stronger, and moving better than before the injury.",
  },
  {
    step: "07",
    title: "Follow-up",
    description:
      "Periodic check-ins and a maintenance plan to prevent recurrence and keep you at your best.",
  },
] as const;

export const REVIEWS = [
  {
    name: "shaikh aatif",
    condition: "ACL & Meniscus Rehab",
    rating: 5,
    text: "I am Aatif Shaikh from Dhule, Maharashtra. I am truly thankful to Dr. Samrudhhi Mane ma'am for helping me recover after my right knee meniscus repair and ACL reconstruction surgery. I was scared, but she supported me like family. She explained every exercise with patience and constantly motivated me whenever I felt low.\n\nUnder her guidance, my knee mobility, strength, and confidence improved significantly. She is dedicated, kind, and genuinely cares about her patients. I feel blessed to have her as my physiotherapist.\n\nHighly recommended for anyone dealing with similar issues.",
    initial: "S",
    color: "from-royal to-teal",
    photoUri:
      "https://lh3.googleusercontent.com/a/ACg8ocKdZvhI2aXy9i7UoxbwZTNKWfBnPPhjrk4WtjJk1islkZpmHg=s128-c0x00000000-cc-rp-mo",
    relativeTime: "7 months ago",
    profileUri:
      "https://www.google.com/maps/contrib/108160671608979979655/reviews",
  },
  {
    name: "Ansh Khora",
    condition: "Low Back Pain",
    rating: 5,
    text: "I can't thank Dr Samrudhhi enough for the care and attention I received. From the moment I walked into the clinic, I felt supported and heard. Dr Samrudhhi didn't just treat my low back pain — she took the time to understand my lifestyle, my goals, and helped me regain not just strength, but confidence too. It's rare to find someone so skilled and compassionate. Highly, highly recommended.",
    initial: "A",
    color: "from-teal to-healing",
    photoUri:
      "https://lh3.googleusercontent.com/a-/ALV-UjVzQtFldsiM9YtTTlKquBGIDIETOTrVMb00kpGzN_GMDuI4xbmz8w=s128-c0x00000000-cc-rp-mo",
    relativeTime: "11 months ago",
    profileUri:
      "https://www.google.com/maps/contrib/112493811138921780823/reviews",
  },
  {
    name: "manoj zende",
    condition: "Knee Recovery",
    rating: 5,
    text: "I highly recommend the Dr. Samrudhhi Mane physiotherapy; their professional care and tailored exercises helped me feel confident and stable in my knee again.\n\nThank you, Dr. Samrudhhi, for helping me recover quickly.",
    initial: "M",
    color: "from-royal to-healing",
    photoUri:
      "https://lh3.googleusercontent.com/a-/ALV-UjXT5zh1o6d4lNFwPQZzzanbkDj9EopD3U1esxenuFd29_psdGoj=s128-c0x00000000-cc-rp-mo",
    relativeTime: "7 months ago",
    profileUri:
      "https://www.google.com/maps/contrib/118178397387147845373/reviews",
  },
  {
    name: "Nikhil Tayade",
    condition: "Slip Disc Treatment",
    rating: 5,
    text: "Visited this clinic with unbearable slip disc pain. I got the best physiotherapy treatment done which subsided my pain over the period of time with proper exercises. Dr. Samrudhhi is soft spoken and entire staff is very hospitable.",
    initial: "N",
    color: "from-teal to-royal",
    photoUri:
      "https://lh3.googleusercontent.com/a-/ALV-UjU2cvT8cGkX_92HKkbYr4oBaz5FGkhHBV1z7VFVY_mfBQMiHQYZ=s128-c0x00000000-cc-rp-mo",
    relativeTime: "3 years ago",
    profileUri:
      "https://www.google.com/maps/contrib/106136375688620315390/reviews",
  },
  {
    name: "Sanket Patil",
    condition: "Post-Surgery Knee Rehab",
    rating: 5,
    text: "I visited here for post surgery rehabilitation of my knee. Physiotherapy sessions were pain free and had wonderful recovery. Dr. Samrudhhi's exercises helped me a lot in restoring my knee movement.",
    initial: "S",
    color: "from-healing to-teal",
    photoUri:
      "https://lh3.googleusercontent.com/a/ACg8ocJnVFKx5tI8fTzXgMvS9GPLXrgd-6DW7xA60rWoZF1QMUNSsw=s128-c0x00000000-cc-rp-mo",
    relativeTime: "3 years ago",
    profileUri:
      "https://www.google.com/maps/contrib/108852471682918876102/reviews",
  },
] as const;


export const CONDITIONS = [
  { title: "Back Pain", body: "back", color: "from-royal/15 to-teal/10" },
  { title: "Neck Pain", body: "neck", color: "from-teal/15 to-healing/10" },
  { title: "Joint Pain", body: "knee", color: "from-healing/15 to-royal/10" },
  { title: "ACL Injury", body: "knee", color: "from-royal/15 to-healing/10" },
  { title: "Meniscus Tear", body: "knee", color: "from-teal/15 to-royal/10" },
  { title: "Sports Injury", body: "shoulder", color: "from-healing/15 to-teal/10" },
  { title: "Frozen Shoulder", body: "shoulder", color: "from-royal/15 to-teal/10" },
  { title: "Arthritis", body: "knee", color: "from-teal/15 to-healing/10" },
  { title: "Sciatica", body: "back", color: "from-healing/15 to-royal/10" },
  { title: "Slip Disc", body: "back", color: "from-royal/15 to-healing/10" },
  { title: "Muscle Tightness", body: "shoulder", color: "from-teal/15 to-royal/10" },
  { title: "Post Surgical Rehab", body: "knee", color: "from-healing/15 to-teal/10" },
  { title: "Posture Issues", body: "neck", color: "from-royal/15 to-teal/10" },
  { title: "Senior Mobility", body: "back", color: "from-teal/15 to-healing/10" },
] as const;

export const HOME_VISIT_BENEFITS = [
  { title: "Treatment at Home", description: "Receive professional physiotherapy in your own familiar environment." },
  { title: "Convenient", description: "No travel, no waiting rooms — we come to you, on your schedule." },
  { title: "Safe", description: "Ideal for post-surgery and elderly patients where travel is risky." },
  { title: "Personalized", description: "Treatment plans tailored to your home setup and daily routine." },
  { title: "Senior Friendly", description: "Gentle, patient care designed specifically for older adults." },
  { title: "Post Surgery Care", description: "Continued rehabilitation in the comfort of your home." },
] as const;

export const FAQS = [
  {
    q: "How many sessions are required?",
    a: "It depends on your condition, its severity and how your body responds. Acute issues may need 4–6 sessions, while post-surgery rehabilitation or chronic conditions often need 8–12 weeks of structured care. After your first assessment, Dr. Samrudhhi will give you a realistic estimate with milestones so you always know where you stand.",
  },
  {
    q: "Do you provide home visits?",
    a: "Yes. Home visit physiotherapy is one of our core services, available across Kopar Khairane, Ghansoli and nearby areas of Navi Mumbai. This is especially helpful for post-surgery patients, elderly patients, and anyone with limited mobility. Sessions are one-on-one and use the same evidence-based protocols as our clinic treatments.",
  },
  {
    q: "Do you treat sports injuries?",
    a: "Absolutely. We routinely treat runners, footballers, gym-goers and weekend athletes for hamstring tears, ankle sprains, tendinopathies, shoulder impingements and more. Treatment includes a graded return-to-sport plan so you come back stronger and less prone to re-injury.",
  },
  {
    q: "Do you treat ACL rehab?",
    a: "Yes — ACL reconstruction rehabilitation is one of our specialities. We follow a criterion-based protocol spanning range of motion, strength, neuromuscular control, plyometrics and sport-specific drills. The goal is not just clearance to play, but durable, confident movement.",
  },
  {
    q: "Can physiotherapy avoid surgery?",
    a: "In many cases — yes. Conditions like partial meniscus tears, mild-to-moderate disc bulges, frozen shoulder, tendinopathies and many arthritic knees respond well to structured physiotherapy. That said, we never delay necessary surgery. If your case needs an orthopaedic opinion, we will tell you honestly and refer you to the right specialist.",
  },
  {
    q: "Do you treat back pain?",
    a: "Yes — low back pain is one of the most common reasons patients come to us. Whether it's mechanical, disc-related, sciatic or posture-driven, we combine manual therapy, mobility work, progressive strengthening and ergonomic education to relieve pain and prevent recurrence.",
  },
  {
    q: "Do you treat cervical pain?",
    a: "Yes. Cervical pain, often from prolonged phone or laptop use, responds very well to a combination of manual therapy, postural correction, deep neck flexor strengthening and workstation ergonomics. Most patients see meaningful improvement within 2–3 weeks.",
  },
] as const;

export const STATS = [
  { value: 155, suffix: "+", label: "Google Reviews" },
  { value: 4.9, decimals: 1, suffix: "★", label: "Average Rating" },
  { value: 24, suffix: "/7", label: "Availability" },
  { value: 100, suffix: "%", label: "Personalized Care" },
] as const;

export const TRUST_BAR = [
  "155+ Happy Patients",
  "4.9 Google Rating",
  "24×7 Availability",
  "Home Visit Services",
  "Expert Physiotherapist",
  "Evidence-Based Treatment",
] as const;

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#specializations", label: "Specializations" },
  { href: "#why", label: "Why Choose Us" },
  { href: "#process", label: "Process" },
  { href: "#reviews", label: "Reviews" },
  { href: "#conditions", label: "Conditions" },
  { href: "#home-visit", label: "Home Visits" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;
