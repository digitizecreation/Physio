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
    line2: "Sector 14, Kopar Khairane",
    city: "Navi Mumbai",
    state: "Maharashtra",
    pincode: "400709",
    full: "Satyam Hospital, Sector 14, Kopar Khairane, Navi Mumbai, Maharashtra 400709",
  },
  mapsEmbed:
    "https://www.google.com/maps?q=Satyam+Hospital,+Sector+14,+Kopar+Khairane,+Navi+Mumbai,+Maharashtra+400709&output=embed",
  mapsLink:
    "https://www.google.com/maps/dir/?api=1&destination=Satyam+Hospital+Sector+14+Kopar+Khairane+Navi+Mumbai+Maharashtra+400709",
  email: "care@drsamrudhhimane.in",
  social: {
    google:
      "https://www.google.com/maps/search/?api=1&query=Dr+Samrudhhi+Mane+Physiotherapist+Kopar+Khairane",
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
    name: "Rohit Sharma",
    condition: "ACL Rehabilitation",
    rating: 5,
    text: "After my ACL reconstruction, I was anxious about returning to sport. Dr. Samrudhhi's structured rehab rebuilt my confidence step by step. Six months later I'm back on the football field — stronger than before. Her patience and clarity are exceptional.",
    initial: "R",
    color: "from-royal to-teal",
  },
  {
    name: "Priya Nair",
    condition: "Slip Disc",
    rating: 5,
    text: "I could barely walk when I first called her. Within three weeks of her home visits, the sciatica pain had reduced dramatically. She explained every exercise and why it mattered. Genuinely compassionate care.",
    initial: "P",
    color: "from-teal to-healing",
  },
  {
    name: "Anil Kulkarni",
    condition: "Meniscus Rehab",
    rating: 5,
    text: "Excellent post-op rehabilitation after my meniscus repair. The progress was visible week by week. Dr. Samrudhhi is professional, motivating and extremely knowledgeable. Highly recommended for any sports injury.",
    initial: "A",
    color: "from-royal to-healing",
  },
  {
    name: "Sneha Patil",
    condition: "Low Back Pain",
    rating: 5,
    text: "Years of desk work had ruined my back. Dr. Samrudhhi didn't just treat the pain — she corrected my posture, taught me how to sit, and gave me a simple daily routine. Three months on, I am pain-free for the first time in years.",
    initial: "S",
    color: "from-teal to-royal",
  },
  {
    name: "Vikram Deshmukh",
    condition: "Frozen Shoulder",
    rating: 5,
    text: "Frozen shoulder had locked my arm for months. Her manual therapy sessions were painful in the best way — each one unlocked more range. By the end I had full movement back. Forever grateful.",
    initial: "V",
    color: "from-healing to-teal",
  },
  {
    name: "Meera Joshi",
    condition: "Post-Surgery Rehab",
    rating: 5,
    text: "She treated my mother at home after her knee replacement. The patience and gentleness she showed made all the difference. My mother looked forward to every session. Worth every rupee.",
    initial: "M",
    color: "from-royal to-teal",
  },
  {
    name: "Karan Mehta",
    condition: "Sports Injury",
    rating: 5,
    text: "As a runner, I was devastated by my hamstring tear. Dr. Samrudhhi built a graded return-to-running plan that was both aggressive and safe. PR set within ten weeks. She gets athletes.",
    initial: "K",
    color: "from-teal to-healing",
  },
  {
    name: "Asha Rane",
    condition: "Cervical Pain",
    rating: 5,
    text: "Chronic neck pain from phone use — she diagnosed it in minutes. The combination of manual therapy and ergonomic changes worked wonders. Professional, evidence-based, and genuinely caring.",
    initial: "A",
    color: "from-healing to-royal",
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
