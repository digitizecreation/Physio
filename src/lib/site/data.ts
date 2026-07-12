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
};


export const SPECIALIZATIONS = [
  { title: "Knee Pain", icon: "Bone" },
  { title: "ACL Rehabilitation", icon: "Activity" },
  { title: "Meniscus Rehabilitation", icon: "Disc" },
  { title: "Slip Disc", icon: "Disc" },
  { title: "Neck Pain", icon: "Neck" },
  { title: "Cervical Pain", icon: "Cervical" },
  { title: "Frozen Shoulder", icon: "Shoulder" },
  { title: "Shoulder Pain", icon: "Shoulder" },
  { title: "Arthritis", icon: "Joint" },
  { title: "Sciatica", icon: "Nerve" },
  { title: "Sports Injury", icon: "Activity" },
  { title: "Post Surgery Rehabilitation", icon: "HeartPulse" },
  { title: "Muscle Pain", icon: "Muscle" },
  { title: "Joint Pain", icon: "Joint" },
  { title: "Balance Training", icon: "Scale" },
  { title: "Posture Correction", icon: "Posture" },
  { title: "Elderly Physiotherapy", icon: "Elderly" },
  { title: "Home Physiotherapy", icon: "Home" },
] as const;

export const WHY_CHOOSE = [
  {
    title: "Personalized Treatment",
    description: "Built around your diagnosis, lifestyle and goals — never one-size-fits-all.",
    icon: "UserCheck",
  },
  {
    title: "Evidence-Based",
    description: "Grounded in current research and clinical guidelines.",
    icon: "Microscope",
  },
  {
    title: "One-on-One Care",
    description: "Undivided attention for the full session — no assistants, no rushing.",
    icon: "HeartHandshake",
  },
  {
    title: "Home Visits",
    description: "Recover at home — ideal for post-surgery, elderly and limited mobility.",
    icon: "Home",
  },
  {
    title: "Fast Recovery Plans",
    description: "Structured milestones that shorten recovery without compromising safety.",
    icon: "Gauge",
  },
  {
    title: "Pain Management",
    description: "Manual therapy and movement re-education — treating the source, not masking it.",
    icon: "ShieldPlus",
  },
  {
    title: "Experienced Therapist",
    description: "Years of practice across orthopaedic, sports and post-operative cases.",
    icon: "Award",
  },
  {
    title: "Patient Education",
    description: "Understand the why — informed patients recover faster and stay well longer.",
    icon: "BookOpen",
  },
  {
    title: "Long-Term Recovery",
    description: "Beyond pain relief, we build resilience to prevent recurrence.",
    icon: "TrendingUp",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Assessment",
    description: "A thorough examination — history, posture, range of motion and movement patterns.",
  },
  {
    step: "02",
    title: "Diagnosis",
    description: "A clear, jargon-free explanation of what's causing your pain.",
  },
  {
    step: "03",
    title: "Customized Plan",
    description: "A written roadmap with goals, milestones and expected timeline.",
  },
  {
    step: "04",
    title: "Hands-on Therapy",
    description: "Manual therapy and mobilisations to reduce pain and restore movement.",
  },
  {
    step: "05",
    title: "Exercise Program",
    description: "A progressive plan you can continue at home — the engine of recovery.",
  },
  {
    step: "06",
    title: "Recovery",
    description: "Return to daily life, sport or work — pain-free and stronger.",
  },
  {
    step: "07",
    title: "Follow-up",
    description: "Check-ins and a maintenance plan to prevent recurrence.",
  },
] as const;

export const REVIEWS = [
  {
    name: "shaikh aatif",
    condition: "ACL & Meniscus Rehab",
    rating: 5,
    text: "I am truly thankful to Dr. Samrudhhi Mane ma'am for helping me recover after my right knee meniscus repair and ACL reconstruction surgery. I was scared, but she supported me like family.\n\nUnder her guidance, my knee mobility, strength, and confidence improved significantly. She is dedicated, kind, and genuinely cares. Highly recommended.",
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
    text: "I can't thank Dr Samrudhhi enough. She didn't just treat my low back pain — she took the time to understand my lifestyle and goals, and helped me regain not just strength, but confidence too. Rare to find someone so skilled and compassionate.",
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
    text: "Highly recommend Dr. Samrudhhi Mane physiotherapy — professional care and tailored exercises helped me feel confident and stable in my knee again. Thank you for helping me recover quickly.",
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
    text: "Visited this clinic with unbearable slip disc pain. The treatment subsided my pain over time with proper exercises. Dr. Samrudhhi is soft spoken and the entire staff is very hospitable.",
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
    text: "Came here for post-surgery knee rehabilitation. Sessions were pain-free with wonderful recovery — the exercises really helped restore my knee movement.",
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
  { title: "Back Pain", icon: "Spine", color: "from-royal/15 to-teal/10" },
  { title: "Neck Pain", icon: "Neck", color: "from-teal/15 to-healing/10" },
  { title: "Joint Pain", icon: "Bone", color: "from-healing/15 to-royal/10" },
  { title: "ACL Injury", icon: "Activity", color: "from-royal/15 to-healing/10" },
  { title: "Meniscus Tear", icon: "Disc", color: "from-teal/15 to-royal/10" },
  { title: "Sports Injury", icon: "Trophy", color: "from-healing/15 to-teal/10" },
  { title: "Frozen Shoulder", icon: "Shoulder", color: "from-royal/15 to-teal/10" },
  { title: "Arthritis", icon: "Bone", color: "from-teal/15 to-healing/10" },
  { title: "Sciatica", icon: "Nerve", color: "from-healing/15 to-royal/10" },
  { title: "Slip Disc", icon: "Disc", color: "from-royal/15 to-healing/10" },
  { title: "Muscle Tightness", icon: "Muscle", color: "from-teal/15 to-royal/10" },
  { title: "Post Surgical Rehab", icon: "HeartPulse", color: "from-healing/15 to-teal/10" },
  { title: "Posture Issues", icon: "Posture", color: "from-royal/15 to-teal/10" },
  { title: "Senior Mobility", icon: "Elderly", color: "from-teal/15 to-healing/10" },
] as const;

export const HOME_VISIT_BENEFITS = [
  { title: "Treatment at Home", description: "Professional physiotherapy in your own environment." },
  { title: "Convenient", description: "No travel, no waiting rooms — we come to you." },
  { title: "Safe", description: "Ideal for post-surgery and elderly patients." },
  { title: "Personalized", description: "Plans tailored to your home and routine." },
  { title: "Senior Friendly", description: "Gentle care designed for older adults." },
  { title: "Post Surgery Care", description: "Continued rehab in the comfort of home." },
] as const;

export const FAQS = [
  {
    q: "How many sessions are required?",
    a: "It depends on your condition. Acute issues may need 4–6 sessions, while post-surgery rehab or chronic conditions often need 8–12 weeks. You'll get a realistic estimate with milestones after your first assessment.",
  },
  {
    q: "Do you provide home visits?",
    a: "Yes — across Kopar Khairane, Ghansoli and nearby Navi Mumbai. Especially helpful for post-surgery, elderly and limited-mobility patients. Sessions are one-on-one with the same protocols as our clinic.",
  },
  {
    q: "Do you treat sports injuries?",
    a: "Yes. We treat runners, footballers and gym-goers for hamstring tears, ankle sprains, tendinopathies and shoulder impingements — including a graded return-to-sport plan.",
  },
  {
    q: "Do you treat ACL rehab?",
    a: "Yes — it's one of our specialities. We follow a criterion-based protocol covering range of motion, strength, neuromuscular control and sport-specific drills, so you return durable and confident.",
  },
  {
    q: "Can physiotherapy avoid surgery?",
    a: "Often, yes. Partial meniscus tears, mild disc bulges, frozen shoulder, tendinopathies and many arthritic knees respond well to structured physiotherapy. If surgery is genuinely needed, we'll tell you honestly and refer you.",
  },
  {
    q: "Do you treat back pain?",
    a: "Yes — it's one of the most common reasons patients come to us. We combine manual therapy, mobility work, strengthening and ergonomic education to relieve pain and prevent recurrence.",
  },
  {
    q: "Do you treat cervical pain?",
    a: "Yes. Often caused by prolonged phone or laptop use, it responds well to manual therapy, postural correction and ergonomic changes. Most patients see improvement within 2–3 weeks.",
  },
] as const;

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#specializations", label: "Specializations" },
  { href: "#conditions", label: "Conditions" },
  { href: "#home-visit", label: "Home Visits" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;
