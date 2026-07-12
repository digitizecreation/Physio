"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, ChevronRight, Phone } from "lucide-react";
import { BUSINESS, FAQS } from "@/lib/site/data";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
  chips?: { label: string; action: string }[];
};

// Quick-reply topics shown as initial chips
const QUICK_REPLIES = [
  { label: "Book appointment", action: "book" },
  { label: "Home visits?", action: "faq-1" },
  { label: "ACL rehab?", action: "faq-3" },
  { label: "Avoid surgery?", action: "faq-4" },
  { label: "Session count?", action: "faq-0" },
  { label: "Back pain?", action: "faq-5" },
];

// Keyword matching for free-text input
const KEYWORD_MAP: { keywords: string[]; faqIndex: number }[] = [
  { keywords: ["session", "how many", "duration", "long"], faqIndex: 0 },
  { keywords: ["home", "visit", "house"], faqIndex: 1 },
  { keywords: ["sport", "athletic", "running", "football", "gym"], faqIndex: 2 },
  { keywords: ["acl", "knee surgery", "ligament", "meniscus"], faqIndex: 3 },
  { keywords: ["surgery", "operation", "avoid", "prevent"], faqIndex: 4 },
  { keywords: ["back", "lower back", "spine", "lumbar"], faqIndex: 5 },
  { keywords: ["neck", "cervical", "cervico"], faqIndex: 6 },
  { keywords: ["price", "cost", "fee", "charge"], faqIndex: -1 },
  { keywords: ["location", "address", "where", "clinic"], faqIndex: -2 },
  { keywords: ["timing", "hours", "open", "available"], faqIndex: -3 },
  { keywords: ["book", "appointment", "schedule", "slot"], faqIndex: -4 },
  { keywords: ["call", "phone", "contact", "number"], faqIndex: -5 },
  { keywords: ["whatsapp"], faqIndex: -6 },
];

const INITIAL_MESSAGE: Message = {
  id: "init",
  role: "bot",
  text: "Hi! I'm Dr. Samrudhhi's assistant. How can I help you today? Ask about treatments, home visits, or booking an appointment.",
  chips: QUICK_REPLIES,
};

export function ChatBot() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [hasNewMessage, setHasNewMessage] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const launcherRef = React.useRef<HTMLButtonElement>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Focus management + ESC + scroll lock
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, a, input, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Show a "new message" pulse after 3 seconds if user hasn't opened the chat
  React.useEffect(() => {
    if (open) {
      setHasNewMessage(false);
      return;
    }
    const t = setTimeout(() => setHasNewMessage(true), 4000);
    return () => clearTimeout(t);
  }, [open]);

  const addMessage = (msg: Omit<Message, "id">) => {
    setMessages((prev) => [...prev, { ...msg, id: `${Date.now()}-${Math.random()}` }]);
  };

  const getBotResponse = (action: string): Message => {
    // FAQ match
    if (action.startsWith("faq-")) {
      const idx = parseInt(action.replace("faq-", ""));
      const faq = FAQS[idx];
      if (faq) {
        return {
          role: "bot",
          text: faq.a,
          chips: [
            { label: "Book appointment", action: "book" },
            { label: "Ask another question", action: "more" },
          ],
        };
      }
    }
    // Special actions
    switch (action) {
      case "book":
        return {
          role: "bot",
          text: `You can book an appointment in two ways:\n\n1. Use the booking form on this page (scroll to the "Book Appointment" section).\n2. Call or WhatsApp directly: ${BUSINESS.phone}\n\nSame-day slots are often available!`,
          chips: [
            { label: `Call ${BUSINESS.phone}`, action: "call" },
            { label: "WhatsApp", action: "whatsapp" },
            { label: "Scroll to form", action: "scroll-form" },
          ],
        };
      case "call":
        return {
          role: "bot",
          text: `Tap to call: ${BUSINESS.phone}`,
          chips: [{ label: "Open dialer", action: "tel" }],
        };
      case "whatsapp":
        return {
          role: "bot",
          text: "Open WhatsApp to chat with Dr. Samrudhhi directly.",
          chips: [{ label: "Open WhatsApp", action: "wa-link" }],
        };
      case "scroll-form":
        return {
          role: "bot",
          text: "Scrolling you to the appointment form...",
          chips: [],
        };
      case "more":
        return {
          role: "bot",
          text: "What else can I help with? Here are some common questions:",
          chips: QUICK_REPLIES,
        };
      case "tel":
        return { role: "bot", text: `Opening your phone dialer...`, chips: [] };
      case "wa-link":
        return { role: "bot", text: "Opening WhatsApp...", chips: [] };
      case "cost":
        return {
          role: "bot",
          text: `For session pricing, please call ${BUSINESS.phone} or message on WhatsApp. Costs vary based on your condition and whether it's a clinic or home visit.`,
          chips: [
            { label: `Call ${BUSINESS.phone}`, action: "call" },
            { label: "WhatsApp", action: "whatsapp" },
          ],
        };
      case "location":
        return {
          role: "bot",
          text: `The clinic is at ${BUSINESS.address.full}. Open 24×7, 7 days a week.`,
          chips: [{ label: "Open in Maps", action: "maps" }],
        };
      case "hours":
        return {
          role: "bot",
          text: `${BUSINESS.hours}. Yes — we're open right now!`,
          chips: [{ label: "Book appointment", action: "book" }],
        };
      case "contact":
        return {
          role: "bot",
          text: `Phone: ${BUSINESS.phone}\nEmail: ${BUSINESS.email}\nAddress: ${BUSINESS.address.full}`,
          chips: [
            { label: `Call now`, action: "call" },
            { label: "WhatsApp", action: "whatsapp" },
          ],
        };
      case "unknown":
        return {
          role: "bot",
          text: `I'm not sure about that one. For specific medical questions, please call ${BUSINESS.phone} or WhatsApp Dr. Samrudhhi directly. You can also browse the FAQ section below.`,
          chips: [
            { label: "See FAQs", action: "scroll-faq" },
            { label: `Call ${BUSINESS.phone}`, action: "call" },
            { label: "WhatsApp", action: "whatsapp" },
          ],
        };
      case "scroll-faq":
        return { role: "bot", text: "Scrolling you to the FAQ section...", chips: [] };
      case "maps":
        return { role: "bot", text: "Opening Google Maps...", chips: [] };
      default:
        return { role: "bot", text: "How else can I help?", chips: QUICK_REPLIES };
    }
  };

  const handleAction = (action: string) => {
    // Handle link actions first
    if (action === "tel") {
      window.location.href = BUSINESS.phoneHref;
      return;
    }
    if (action === "wa-link") {
      window.open(BUSINESS.whatsappHref, "_blank", "noopener noreferrer");
      return;
    }
    if (action === "maps") {
      window.open(BUSINESS.mapsLink, "_blank", "noopener noreferrer");
      return;
    }
    if (action === "scroll-form") {
      document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => setOpen(false), 800);
      return;
    }
    if (action === "scroll-faq") {
      document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => setOpen(false), 800);
      return;
    }

    // Find the label for this action to show as user message
    const allChips = [...QUICK_REPLIES, { label: "Book appointment", action: "book" }];
    const chip = allChips.find((c) => c.action === action);
    const userLabel = chip?.label || action;

    addMessage({ role: "user", text: userLabel });
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(action);
      addMessage(response);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    addMessage({ role: "user", text });
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      // Match keywords
      const lower = text.toLowerCase();
      let matched = false;
      for (const { keywords, faqIndex } of KEYWORD_MAP) {
        if (keywords.some((k) => lower.includes(k))) {
          matched = true;
          if (faqIndex >= 0) {
            const response = getBotResponse(`faq-${faqIndex}`);
            addMessage(response);
          } else if (faqIndex === -1) {
            addMessage(getBotResponse("cost"));
          } else if (faqIndex === -2) {
            addMessage(getBotResponse("location"));
          } else if (faqIndex === -3) {
            addMessage(getBotResponse("hours"));
          } else if (faqIndex === -4) {
            addMessage(getBotResponse("book"));
          } else if (faqIndex === -5) {
            addMessage(getBotResponse("contact"));
          } else if (faqIndex === -6) {
            addMessage(getBotResponse("whatsapp"));
          }
          break;
        }
      }
      if (!matched) {
        addMessage(getBotResponse("unknown"));
      }
      setIsTyping(false);
    }, 700 + Math.random() * 500);
  };

  return (
    <>
      {/* Floating launcher button */}
      <div className="fixed bottom-5 left-4 z-50 sm:bottom-6 sm:left-6">
        <motion.button
          ref={launcherRef}
          aria-label={open ? "Close chat" : "Open chat assistant"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 280, damping: 18 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="relative grid h-14 w-14 place-items-center rounded-full gradient-royal-teal text-white shadow-glow-royal"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.span>
            )}
          </AnimatePresence>
          {/* Pulse ring when closed */}
          {!open && (
            <span className="absolute inset-0 -z-10 animate-pulse-ring rounded-full" />
          )}
          {/* New message indicator */}
          {hasNewMessage && !open && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-healing opacity-60" />
              <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-healing text-[9px] font-bold text-white">
                1
              </span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed bottom-24 left-4 z-50 flex h-[min(560px,75vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-premium sm:left-6"
            role="dialog"
            aria-modal="true"
            aria-label="Chat assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-gradient-to-r from-royal to-teal p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="relative grid h-10 w-10 place-items-center rounded-full bg-white/20 backdrop-blur">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-healing ring-2 ring-royal" />
                </div>
                <div>
                  <div className="font-heading text-sm font-bold">Dr. Samrudhhi's Assistant</div>
                  <div className="flex items-center gap-1 text-[11px] text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-healing" />
                    Online • Replies instantly
                  </div>
                </div>
              </div>
              <button
                ref={closeBtnRef}
                onClick={() => {
                  setOpen(false);
                  launcherRef.current?.focus();
                }}
                aria-label="Close chat"
                className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto p-4"
              style={{ scrollbarWidth: "thin" }}
            >
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} onChipClick={handleAction} />
              ))}
              {isTyping && <TypingIndicator />}
            </div>

            {/* Input */}
            <div className="border-t border-border/60 p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  maxLength={300}
                  aria-label="Type your question"
                  className="flex-1 rounded-full border border-border/70 bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Send message"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full gradient-royal-teal text-white shadow-md transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <p className="mt-2 flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
                <Phone className="h-2.5 w-2.5" />
                Or call <a href={BUSINESS.phoneHref} className="font-semibold text-primary">{BUSINESS.phone}</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({
  message,
  onChipClick,
}: {
  message: Message;
  onChipClick: (action: string) => void;
}) {
  const isBot = message.role === "bot";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex gap-2", isBot ? "justify-start" : "justify-end")}
    >
      {isBot && (
        <div className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full gradient-royal-teal text-white">
          <Bot className="h-3.5 w-3.5" />
        </div>
      )}
      <div className={cn("max-w-[80%]", !isBot && "order-first")}>
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
            isBot
              ? "rounded-tl-sm bg-secondary text-foreground"
              : "rounded-tr-sm gradient-royal-teal text-white",
          )}
        >
          <p className="whitespace-pre-line">{message.text}</p>
        </div>
        {message.chips && message.chips.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {message.chips.map((chip) => (
              <button
                key={chip.action}
                onClick={() => onChipClick(chip.action)}
                className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:bg-primary/5"
              >
                {chip.label}
                <ChevronRight className="h-3 w-3 opacity-50" />
              </button>
            ))}
          </div>
        )}
      </div>
      {!isBot && (
        <div className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-muted-foreground">
          <User className="h-3.5 w-3.5" />
        </div>
      )}
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-2"
    >
      <div className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full gradient-royal-teal text-white">
        <Bot className="h-3.5 w-3.5" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-secondary px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-muted-foreground"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
