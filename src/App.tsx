/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from "react";
import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import {
  Orbit,
  Languages,
  Music,
  Wind,
  SkipBack,
  Play,
  SkipForward,
  ChevronLeft,
  ChevronRight,
  Check,
  Zap,
  Search,
  Globe,
  FlaskConical,
  Brain,
  ListTodo,
  Activity,
  Heart,
  Shield,
  Sparkles,
  RefreshCw,
  Clock,
  Moon,
  Layers,
  Cpu,
  MessageSquare,
  Home,
  BookOpen,
  Share2,
  Briefcase,
  Calendar,
  ShieldCheck,
  FileText,
  Wallet,
  Bot,
} from "lucide-react";
import { COUNTRIES } from "./constants";
import { InputArea } from "./components/InputArea";
import { Attachment, AppSettings } from "./types";

function Navbar({ isScrolled, onOpenForm }: { isScrolled: boolean; onOpenForm: () => void }) {
  return (
    <motion.nav
      initial={false}
      animate={{
        top: 16,
        width: "clamp(300px, 85%, 750px)",
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(12px)",
        borderColor: isScrolled ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.2)",
        borderRadius: 48,
        boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.2)",
        paddingLeft: 10,
        paddingRight: 10,
      }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed z-[112] left-1/2 -translate-x-1/2 border flex items-center justify-between"
    >
      <div
        className={`flex gap-3 lg:gap-4 items-center w-full max-w-6xl mx-auto justify-between transition-all duration-500 py-2.5`}
      >
        <a href="/" className="pl-4">
          <img
            src={isScrolled ? "/89.png" : "/25.png"}
            alt="Zalt Logo"
            className="h-8 w-auto transition-opacity duration-300"
          />
        </a>

        <div className="flex gap-4 items-center lg:gap-6">
          <button
            type="button"
            className={`text-sm ${isScrolled ? "text-gray-700" : "text-white"} hover:opacity-60 font-medium transition-colors`}
            onClick={() =>
              document
                .getElementById("crystals-section")
                ?.scrollIntoView({ behavior: "smooth", block: "center" })
            }
          >
            Crystals
          </button>
          <button
            type="button"
            className={`text-sm ${isScrolled ? "text-gray-700" : "text-white"} hover:opacity-60 font-medium transition-colors`}
            onClick={() =>
              document
                .getElementById("os-section")
                ?.scrollIntoView({ behavior: "smooth", block: "center" })
            }
          >
            OS
          </button>
          <button
            className="pointer-events-auto relative group px-5 py-2 rounded-full text-white font-medium transition-all duration-300 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_8px_16px_rgba(39,151,202,0.25)] hover:brightness-110 hover:shadow-[0_10px_20px_rgba(39,151,202,0.35)] active:scale-95 flex items-center gap-2"
            style={{ 
              background: 'linear-gradient(to bottom, #5EB9E6, #2797CA)',
              border: '1px solid rgba(255, 255, 255, 0.2)' 
            }}
            onClick={onOpenForm}
          >
            <span className="relative z-20 font-sans text-[14px]">experience</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

function ContactForm({
  formData,
  setFormData,
  handleSubmit,
  isSubmitted,
  showMoreFields,
  setShowMoreFields,
  error,
  countries,
}: any) {

  return (
    <>
      {isSubmitted ? (
        <div className="text-center py-8 space-y-4">
          <h3 className="text-2xl font-display text-black">You’re in.</h3>
          <p className="text-gray-600 text-sm">
            We’re currently reviewing applications and will be onboarding
            selected users shortly. Excited to have you join us!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full p-2.5 px-3.5 border border-[#D1E9F7]/70 bg-[#F0F9FF]/50 text-black placeholder-gray-400 rounded-full transition-all duration-300 focus:border-[#2797CA] focus:bg-white focus:shadow-[0_0_0_2px_rgba(39,151,202,0.1)] focus:outline-none"
              placeholder="Full name"
              required
            />
          </div>

          <div className="space-y-2">
            <div>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-2.5 px-3.5 border border-[#D1E9F7]/70 bg-[#F0F9FF]/50 text-black placeholder-gray-400 rounded-full transition-all duration-300 focus:border-[#2797CA] focus:bg-white focus:shadow-[0_0_0_2px_rgba(39,151,202,0.1)] focus:outline-none"
                placeholder="Email address"
              />
            </div>

            {!showMoreFields && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowMoreFields(true)}
                  className="text-xs text-gray-600 hover:text-black px-3 py-1 border rounded-full border-[#D1E9F7] hover:bg-[#F0F9FF] transition-colors"
                >
                  Other contact options
                </button>
              </div>
            )}

            {showMoreFields && (
              <>
                <div>
                  <div className="flex rounded-full border border-[#D1E9F7]/70 bg-[#F0F9FF]/50 transition-all duration-300 focus-within:border-[#2797CA] focus-within:bg-white focus-within:shadow-[0_0_0_2px_rgba(39,151,202,0.1)]">
                    <select
                      value={formData.whatsappCountryCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          whatsappCountryCode: e.target.value,
                        })
                      }
                      className="pl-3 py-2.5 bg-transparent text-black text-sm font-medium focus:outline-none max-w-[70px]"
                    >
                      {countries.map((c: any) => (
                        <option key={c.code + c.name} value={c.code}>
                          {c.code}
                        </option>
                      ))}
                    </select>
                    <input
                      id="whatsapp"
                      type="tel"
                      value={formData.whatsappNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          whatsappNumber: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      className="w-full p-2.5 px-3.5 bg-transparent text-black placeholder-gray-400 rounded-r-full transition-all duration-300 focus:outline-none"
                      placeholder="WhatsApp"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex rounded-full border border-[#D1E9F7]/70 bg-[#F0F9FF]/50 transition-all duration-300 focus-within:border-[#2797CA] focus-within:bg-white focus-within:shadow-[0_0_0_2px_rgba(39,151,202,0.1)]">
                    <select
                      value={formData.phoneCountryCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneCountryCode: e.target.value,
                        })
                      }
                      className="pl-3 py-2.5 bg-transparent text-black text-sm font-medium focus:outline-none max-w-[70px]"
                    >
                      {countries.map((c: any) => (
                        <option key={c.code + c.name} value={c.code}>
                          {c.code}
                        </option>
                      ))}
                    </select>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      className="w-full p-2.5 px-3.5 bg-transparent text-black placeholder-gray-400 rounded-r-full transition-all duration-300 focus:outline-none"
                      placeholder="Phone"
                    />
                  </div>
                </div>

                <div>
                  <input
                    id="social"
                    type="text"
                    value={formData.socialLinks}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: e.target.value,
                      })
                    }
                    className="w-full p-2.5 px-3.5 border border-[#D1E9F7]/70 bg-[#F0F9FF]/50 text-black placeholder-gray-400 rounded-full transition-all duration-300 focus:border-[#2797CA] focus:bg-white focus:shadow-[0_0_0_2px_rgba(39,151,202,0.1)] focus:outline-none"
                    placeholder="Social link (max 1)"
                  />
                </div>
              </>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="text-center pt-2">
            <button
              type="submit"
              className="pointer-events-auto relative group px-8 py-2.5 rounded-full text-white font-medium transition-all duration-300 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_8px_16px_rgba(39,151,202,0.25)] hover:brightness-110 hover:shadow-[0_10px_20px_rgba(39,151,202,0.35)] active:scale-95 flex items-center gap-2 mx-auto"
              style={{ 
                background: 'linear-gradient(to bottom, #5EB9E6, #2797CA)',
                border: '1px solid rgba(255, 255, 255, 0.2)' 
              }}
            >
              <span className="relative z-20 font-sans text-[14px]">Continue</span>
            </button>
          </div>
        </form>
      )}
    </>
  );
}

// ... (in App function)

export default function App() {
  const [formData, setFormData] = useState({

    fullName: "",
    email: "",
    whatsappCountryCode: "+1",
    whatsappNumber: "",
    phoneCountryCode: "+1",
    phoneNumber: "",
    socialLinks: "",
  });
  const [showMoreFields, setShowMoreFields] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Modules");
  const [isScrolled, setIsScrolled] = useState(false);
  const [featureIndex, setFeatureIndex] = useState(0);
  const [isAlwaysRunning, setIsAlwaysRunning] = useState(true);

  const features = [
    {
      title: "Intelligence",
      icon: <Brain className="w-6 h-6 text-gray-700" />,
      points: [
        "Knows everything about you",
        "Understands intent instantly",
        "No prompts. Just talk naturally",
        "Full memory — never forgets complex tasks from months ago",
      ],
    },
    {
      title: "Privacy & Security",
      icon: <Shield className="w-6 h-6 text-gray-700" />,
      points: [
        "Runs fully on your device",
        "No cloud. No data harvesting. No selling your data",
        "On-device first — your data never leaves",
        "You're the customer, not the product",
      ],
    },
    {
      title: "Action & Control",
      icon: <Zap className="w-6 h-6 text-gray-700" />,
      points: [
        "Opens apps, edits files, manages tasks",
        "Sends emails, texts, schedules events",
        "Books rides, orders food, pays bills",
        "Your device, fully under your control",
      ],
    },
    {
      title: "Behavior",
      icon: <Heart className="w-6 h-6 text-gray-700" />,
      points: [
        "Remembers your preferences locally",
        "Respects your time — no unnecessary noise",
        "Calm, patient, never pushy",
      ],
    },

    {
      title: "Always Running",
      icon: <RefreshCw className="w-6 h-6 text-gray-700" />,
      points: [
        "Works offline",
        "Runs across all your apps",
        "Active in the background — even while you sleep",
      ],
    },
    {
      title: "Message Zalt Anywhere",
      icon: <MessageSquare className="w-6 h-6 text-gray-700" />,
      points: [
        "WhatsApp, Telegram, Discord, iMessage",
        "Signal, email, CLI",
        "One companion, every channel",
      ],
    },
    {
      title: "Automations",
      icon: <Clock className="w-6 h-6 text-gray-700" />,
      points: [
        "Scheduled, recurring, trigger-based",
        "Set it and forget it",
      ],
    },
    {
      title: "Full Internet Access",
      icon: <Globe className="w-6 h-6 text-gray-700" />,
      points: [
        "Searches, summarizes, compares",
        "Real-time info",
        "Privacy-first browsing",
      ],
    },
    {
      title: "Your 2nd Device, Virtual",
      icon: <FlaskConical className="w-6 h-6 text-gray-700" />,
      points: [
        "Spin up any Device, any OS",
        "Have a personal, fully functional second device",
        "Do anything on it – test, run apps, browse, compute",
      ],
    },
    {
      title: "Smart. Efficient. Nice.",
      icon: <Sparkles className="w-6 h-6 text-gray-700" />,
      points: [
        "Smart – Understands intent. No prompt engineering.",
        "Efficient – Does in seconds what takes minutes.",
        "Nice – Friendly, patient, respectful.",
      ],
    },
    {
      title: "Built to improve itself.",
      icon: <Brain className="w-6 h-6 text-gray-700" />,
      points: [
        "Sleep Learning: Practices on simulated scenarios while you sleep",
        "Bayesian Logic: Refines decisions using probabilistic reasoning",
        "Private Brain: Learns without sending data to the cloud",
      ],
    },
    {
      title: "Zalt as your OS.",
      icon: <Zap className="w-6 h-6 text-gray-700" />,
      points: [
        "Switch to Auren OS -minimalist and simple. Or keep your OS and let Zalt sit on top. One companion, deep integration.",
      ],
    },
  ];

  const nextFeature = () =>
    setFeatureIndex((prev) => (prev + 1) % features.length);
  const prevFeature = () =>
    setFeatureIndex((prev) => (prev - 1 + features.length) % features.length);

  // InputArea states
  const [chatInput, setChatInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [settings, setSettings] = useState<AppSettings>({
    language: "en",
    theme: "light",
  });

  const handleSend = () => {
    if (!chatInput.trim() && attachments.length === 0) return;
    console.log(
      "Sending message:",
      chatInput,
      "with attachments:",
      attachments,
    );
    setChatInput("");
    setAttachments([]);
  };

  const handleAttach = (files: FileList) => {
    const newAttachments = Array.from(files).map((file) => ({
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
    }));
    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const handleAddAttachment = (attachment: Attachment) => {
    setAttachments((prev) => [...prev, attachment]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSettings = (s: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...s }));
  };

  useEffect(() => {
    const handleScroll = () => {
      // Show background after scrolling past the hero (approx 100vh)
      if (window.scrollY > window.innerHeight - 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName) {
      setError("Full Name is required.");
      return;
    }
    if (
      !formData.email &&
      !formData.whatsappNumber &&
      !formData.phoneNumber &&
      !formData.socialLinks
    ) {
      setError("At least one contact method is required.");
      return;
    }
    setError("");
    console.log("Form data:", formData);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#F0F9FF] text-[#1A5D7D]">
      <Navbar isScrolled={isScrolled} onOpenForm={() => setIsFormOpen(true)} />

      <div className="relative w-full h-[110vh] overflow-hidden -mt-[80px]">
        {/* Hero Background Image */}
        <img
          src="/demo-5.jpg"
          alt="Hero Background"
          className="absolute inset-0 object-cover w-full h-full"
          referrerPolicy="no-referrer"
        />
        
        {/* Subtle Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 lg:px-24 text-white">
          <div className="flex-grow flex flex-col items-center justify-center max-w-7xl mx-auto w-full gap-12 md:gap-16 pt-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center space-y-8 max-w-5xl"
            >
              <motion.h2
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl md:text-8xl font-display mb-2 text-white"
              >
                {"Meet Zalt".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1, delay: index * 0.1 + 0.3 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h2>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2,
                }}
                className="text-3xl md:text-5xl font-display tracking-tight bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent"
              >
                Your forever companion for a{" "}
                <span className="italic">simple life.</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-[650px] max-w-[95%]"
              >
                <InputArea
                  input={chatInput}
                  setInput={setChatInput}
                  onSend={handleSend}
                  isLoading={isAiLoading}
                  onAttach={handleAttach}
                  onAddAttachment={handleAddAttachment}
                  attachments={attachments}
                  removeAttachment={removeAttachment}
                  settings={settings}
                  updateSettings={updateSettings}
                />
                <div className="mt-0.5 flex justify-center">
                  <button
                    onClick={() => setIsFormOpen(true)}
                    className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-medium transition-all duration-300 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_8px_16px_rgba(39,151,202,0.25)] hover:brightness-110 hover:shadow-[0_10px_20px_rgba(39,151,202,0.35)] active:scale-95"
                    style={{ 
                      background: 'linear-gradient(to bottom, #5EB9E6, #2797CA)',
                      border: '1px solid rgba(255, 255, 255, 0.2)' 
                    }}
                  >
                    <img src="/25.png" alt="25" className="w-4 h-4 object-contain" />
                    <span className="text-sm">Say hi to Your Zalt</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="flex justify-center w-full"
          >
            <div className="bg-gray-50/80 border border-gray-200/40 px-6 py-2 rounded-full backdrop-blur-sm">
              <p className="text-sm text-gray-500 text-center">
                Designed to change how you experience your time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <SentencesMarquee />

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative"
            >
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
              >
                ✕
              </button>
              <div className="mb-6">
                <h2 className="text-2xl font-display mb-1 text-black">
                  Entering beta stage
                </h2>
                <p className="text-gray-600 text-sm">
                  Organize, Fix & Simplify. Always on. Knows Everything.
                </p>
              </div>
              <ContactForm
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                isSubmitted={isSubmitted}
                showMoreFields={showMoreFields}
                setShowMoreFields={setShowMoreFields}
                error={error}
                countries={COUNTRIES}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* Unified Capabilities Section */}
      <section className="bg-white py-20 px-6 md:px-12 lg:px-24 font-sans text-black">
        <div className="max-w-7xl mx-auto space-y-32">
          {/* COMPANION */}
          <div className="space-y-6 flex flex-col justify-center">
            <div className="flex flex-col text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-2 text-black">
                One companion. Your entire life.
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need, handled quietly in the background.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 border-l border-t border-gray-200">
              {features.map((feature, i) => (
                <div
                  key={i}
                  id={feature.title === "Zalt as your OS." ? "os-section" : undefined}
                  className={`p-8 border-r border-b border-gray-200 space-y-4 flex flex-col relative transition-all duration-300 hover:bg-gradient-to-br hover:from-white hover:to-blue-50 scroll-mt-24 ${feature.title === "Zalt as your OS." ? "md:col-span-2 lg:col-span-4" : ""} ${feature.title === "Built to improve itself." ? "md:col-span-2" : ""}
                    ${
                      feature.title === "Always Running" && !isAlwaysRunning
                        ? "opacity-60 grayscale"
                        : "opacity-100"
                    }
                  }`}
                >
                  <div className="w-8 h-8 flex items-center justify-center mb-2">
                    <div className="scale-75 text-gray-400">
                     {React.cloneElement(feature.icon as React.ReactElement, { className: "w-6 h-6" })}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium text-black">
                        {feature.title}
                      </h4>
                      {feature.title === "Always Running" && (
                        <button
                          onClick={() => setIsAlwaysRunning(!isAlwaysRunning)}
                          className={`shrink-0 w-8 h-4 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${isAlwaysRunning ? "bg-[#2797CA]" : "bg-gray-300"}`}
                          aria-label="Toggle Always Running"
                        >
                          <div className={`w-3 h-3 rounded-full bg-white transition-transform ${isAlwaysRunning ? "translate-x-4" : "translate-x-0"}`} />
                        </button>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 leading-relaxed space-y-1">
                      {feature.title === "Zalt as your OS." || feature.title === "Your 2nd Device, Virtual" ? (
                        feature.points.map((point, i) => <p key={i}>{point}</p>)
                      ) : (
                        <p>{feature.points.join(" ")}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>




        </div>
      </section>

      {/* Crystals Intro Section */}
      <section id="crystals-section" className="bg-white pt-20 pb-12 px-6 md:px-12 lg:px-24 text-gray-900 overflow-hidden font-sans scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center flex flex-col items-center">
            <h2 className="text-xl font-medium tracking-[0.2em] uppercase text-gray-400 mb-4">
              Crystals
            </h2>
            <h3 className="text-4xl md:text-5xl font-display tracking-tight mb-4 text-black">
              Everything else flows from Zalt. Feel the magic.
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Because Zalt is the center. Every Crystal is a superpower to your
              companion. Just tell. Your Zalt handles the rest.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Navigation Section */}
      <section className="bg-white pb-24 px-6 md:px-12 lg:px-24 text-gray-900 overflow-hidden font-sans">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-gray-100 rounded-[32px] p-6 md:p-8 lg:p-10 shadow-sm flex flex-col items-start gap-4">
            <div className="space-y-4 w-full text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
              <div className="flex flex-wrap gap-1 p-1 bg-gray-100/90 rounded-full border border-gray-200/60 shadow-[inset_0_2px_5px_rgba(0,0,0,0.08)] backdrop-blur-md w-fit relative overflow-hidden">
                {["Modules", "Capabilities", "Folds", "Agents"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full text-[13px] font-medium transition-colors duration-300 relative z-10 ${activeCategory === cat ? "text-white" : "text-gray-500 hover:text-gray-800"}`}
                  >
                    {activeCategory === cat && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-full shadow-sm"
                        style={{ background: 'linear-gradient(to bottom, #4AB1E5, #1B8DC3)' }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-20">{cat}</span>
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-3 px-5 py-2.5 bg-gray-100/80 rounded-full border border-gray-200/50 backdrop-blur-sm max-w-md">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                <p className="text-[11px] leading-tight font-sans font-medium text-gray-600">
                  <span className="text-gray-900 font-semibold">Connected to GitHub,</span> Install on localhost with one click. Pull live updates, tools, scripts, and repos instantly!
                </p>
              </div>
            </div>

            <div key={activeCategory} className="max-w-2xl bg-gray-50/50 border border-gray-100 p-6 rounded-2xl">
              <h3 className="text-xl md:text-2xl font-display tracking-tight mb-2 text-black">
                {activeCategory === "Modules"
                  ? "Modules – Universal Interaction"
                  : activeCategory === "Capabilities"
                    ? "Capabilities – Pure Intelligence"
                    : activeCategory === "Folds"
                      ? "Folds – Infinite Synthesis"
                      : "Agents – Autonomous Experts"}
              </h3>
              <p className="text-[14px] text-gray-600 leading-relaxed">
                {activeCategory === "Modules"
                  ? (
                      <>
                        Access any app. Any OS. Any website.
                        <br />
                        iOS • Android • Windows • macOS • Linux • Open source • Any website
                        <br />
                        No lock‑in. Every app, one companion.
                      </>
                    )
                  : activeCategory === "Capabilities"
                    ? (
                        <>
                          Teach it once. It remembers.
                          <br />
                          Better than Skills.md. Includes a prompt library, but you'll never need it.
                        </>
                      )
                    : activeCategory === "Folds"
                      ? (
                          <>
                            Combine Capabilities × Modules into powerful workflows.
                            <br />
                            One Fold = hours of saved work.
                          </>
                        )
                      : (
                        <>
                          Run hundreds of agents at once. Parallel. 24/7.
                          <br />
                          Run an entire company with AI employees. Separately or together.
                        </>
                      )}
              </p>
            </div>

            {/* Cards Scroll Area - Now contained */}
            <div className="w-full bg-gray-50/10 border border-gray-100 rounded-[24px] p-6 overflow-hidden">
              <div
                id="cards-scroll-container"
                className="overflow-x-auto no-scrollbar scroll-smooth"
              >
                <div className="flex gap-4 pb-2 w-fit pr-8">
              {activeCategory === "Modules" && (
                <>
                  {/* TELL Card */}
                  <CrystalCard
                    icon={<MessageSquare className="w-8 h-8 text-orange-500" />}
                    app="TELL"
                    description="Anonymous sharing for anything that needs attention"
                    gradient="bg-gradient-to-br from-orange-50 via-white to-red-50/50"
                    index={0}
                  />

                  {/* Global Estate Hub Card */}
                  <CrystalCard
                    icon={<Home className="w-8 h-8 text-emerald-600" />}
                    app="Global Estate Hub"
                    description="A comprehensive real estate search engine aggregating listings from all platforms around the globe. Making it easy to buy property & land from anywhere."
                    gradient="bg-gradient-to-br from-emerald-50 via-white to-teal-50/50"
                    index={1}
                  />

                  {/* Self Learn Card */}
                  <CrystalCard
                    icon={<BookOpen className="w-8 h-8 text-violet-500" />}
                    app="Self Learn"
                    description="A universal lifelong-learning platform for everyone."
                    gradient="bg-gradient-to-br from-violet-50 via-white to-fuchsia-50/50"
                    index={2}
                  />

                  {/* ComputePool Card */}
                  <CrystalCard
                    icon={<Cpu className="w-8 h-8 text-blue-500" />}
                    app="ComputePool"
                    description="A global compute donation platform. Donate your spare CPU cycles to earn money & climb the leaderboard."
                    gradient="bg-gradient-to-br from-blue-50 via-white to-indigo-50/50"
                    index={3}
                  />

                  {/* Soal Card */}
                  <CrystalCard
                    icon={<Share2 className="w-8 h-8 text-pink-500" />}
                    app="Soal"
                    description="Create and post content to all social platforms simultaneously."
                    gradient="bg-gradient-to-br from-pink-50 via-white to-orange-50/50"
                    index={4}
                  />

                  {/* Haik Card */}
                  <CrystalCard
                    icon={<Briefcase className="w-8 h-8 text-indigo-500" />}
                    app="Haik"
                    description="AI‑powered workspace with agent delegation"
                    gradient="bg-gradient-to-br from-indigo-50 via-white to-blue-50/50"
                    index={5}
                  />

                  {/* WORLD Card */}
                  <CrystalCard
                    icon={<Globe className="w-8 h-8 text-blue-600" />}
                    app="WORLD"
                    description="Verified encyclopedia + religious books/texts + research + all books"
                    gradient="bg-gradient-to-br from-blue-50 via-white to-indigo-50/50"
                    index={6}
                  />

                  {/* OneLife Card */}
                  <CrystalCard
                    icon={<Activity className="w-8 h-8 text-rose-500" />}
                    app="OneLife"
                    description="Your entire life – calendar, tasks, health, finances – one dashboard"
                    gradient="bg-gradient-to-br from-rose-50 via-white to-orange-50/50"
                    index={7}
                  />

                  {/* TruthSync Card */}
                  <CrystalCard
                    icon={<ShieldCheck className="w-8 h-8 text-cyan-600" />}
                    app="TruthSync"
                    description="Instant fact‑checking with truth & bias scores"
                    gradient="bg-gradient-to-br from-cyan-50 via-white to-blue-50/50"
                    index={8}
                  />

                  {/* Azlt Card */}
                  <CrystalCard
                    icon={<Wallet className="w-8 h-8 text-amber-600" />}
                    app="Azlt"
                    description="A currency for the real and digital world. And a frictionless payment software. One wallet for everything. And automatic logging of your expenses. For everyone."
                    gradient="bg-gradient-to-br from-amber-50 via-white to-yellow-50/50"
                    index={9}
                  />
                  <div className="w-[260px] h-[360px] shrink-0 rounded-3xl border border-dashed border-gray-300 flex items-center justify-center p-8 bg-gray-50/20 group hover:bg-gray-50/40 transition-colors">
                    <span className="text-xl font-medium text-gray-400 group-hover:text-gray-600 transition-colors">...and millions more</span>
                  </div>
                </>
              )}

              {activeCategory === "Capabilities" && (
                <>
                  <CrystalCard
                    icon={<Zap className="w-8 h-8 text-yellow-500" />}
                    app="Automatic"
                    description="AI chooses the best capabilities for your request. Zalt automatically downloads Crystals."
                    gradient="bg-gradient-to-br from-yellow-50 via-white to-orange-50/50"
                    index={0}
                  />
                  <CrystalCard
                    icon={<Search className="w-8 h-8 text-blue-500" />}
                    app="Searching"
                    description="Access real-time information from the web to answer your questions with up-to-date data."
                    gradient="bg-gradient-to-br from-blue-50 via-white to-indigo-50/50"
                    index={1}
                  />
                  <CrystalCard
                    icon={<Globe className="w-8 h-8 text-cyan-500" />}
                    app="Sources"
                    description="Browse and analyze multiple websites simultaneously for comprehensive information gathering."
                    gradient="bg-gradient-to-br from-cyan-50 via-white to-blue-50/50"
                    index={2}
                  />
                  <CrystalCard
                    icon={<FlaskConical className="w-8 h-8 text-purple-500" />}
                    app="Deep Research"
                    description="Perform in-depth, multi-step research to provide detailed, well-supported answers."
                    gradient="bg-gradient-to-br from-purple-50 via-white to-pink-50/50"
                    index={3}
                  />
                  <CrystalCard
                    icon={<Brain className="w-8 h-8 text-gray-700" />}
                    app="Thinking"
                    description="Enable advanced reasoning capabilities for complex problem solving and logical analysis."
                    gradient="bg-gradient-to-br from-gray-50 via-white to-slate-50/50"
                    index={4}
                  />
                  <CrystalCard
                    icon={<ListTodo className="w-8 h-8 text-rose-500" />}
                    app="Planning"
                    description="Structure your tasks and projects with intelligent step-by-step planning and organization."
                    gradient="bg-gradient-to-br from-rose-50 via-white to-red-50/50"
                    index={5}
                  />
                  <CrystalCard
                    icon={<Activity className="w-8 h-8 text-emerald-500" />}
                    app="Reasoning"
                    description="Utilize enhanced cognitive models to break down difficult concepts and provide clear explanations."
                    gradient="bg-gradient-to-br from-emerald-50 via-white to-teal-50/50"
                    index={6}
                  />
                  <div className="w-[260px] h-[360px] shrink-0 rounded-3xl border border-dashed border-gray-300 flex items-center justify-center p-8 bg-gray-50/20 group hover:bg-gray-50/40 transition-colors">
                    <span className="text-xl font-medium text-gray-400 group-hover:text-gray-600 transition-colors">...and thousands more</span>
                  </div>
                </>
              )}
              {activeCategory === "Folds" && (
                <>
                  <CrystalCard
                    icon={<Layers className="w-8 h-8 text-indigo-600" />}
                    app="Content Engine"
                    description="Research + Write + Share. Complete publishing workflow for any platform."
                    gradient="bg-gradient-to-br from-indigo-50 via-white to-violet-50/50"
                    index={0}
                  />
                  <CrystalCard
                    icon={<Briefcase className="w-8 h-8 text-amber-600" />}
                    app="Job Hunter"
                    description="Find listings + Personalize CV + Apply. Automated career growth."
                    gradient="bg-gradient-to-br from-amber-50 via-white to-orange-50/50"
                    index={1}
                  />
                  <CrystalCard
                    icon={<Share2 className="w-8 h-8 text-blue-600" />}
                    app="Social Sorter"
                    description="Listen + Analyze + Engage. Multi-platform social management."
                    gradient="bg-gradient-to-br from-blue-50 via-white to-sky-50/50"
                    index={2}
                  />
                  <div className="w-[260px] h-[360px] shrink-0 rounded-3xl border border-dashed border-gray-300 flex items-center justify-center p-8 bg-gray-50/20 group hover:bg-gray-50/40 transition-colors">
                    <span className="text-xl font-medium text-gray-400 group-hover:text-gray-600 transition-colors">...and many more</span>
                  </div>
                </>
              )}
              {activeCategory === "Agents" && (
                <>
                  <CrystalCard
                    icon={<Bot className="w-8 h-8 text-teal-600" />}
                    app="Market Analyst"
                    description="Continuous monitoring and insights generation for global markets."
                    gradient="bg-gradient-to-br from-teal-50 via-white to-emerald-50/50"
                    index={0}
                  />
                  <CrystalCard
                    icon={<Cpu className="w-8 h-8 text-purple-600" />}
                    app="Code Architect"
                    description="End-to-end development assistant from design to deployment."
                    gradient="bg-gradient-to-br from-purple-50 via-white to-violet-50/50"
                    index={1}
                  />
                  <CrystalCard
                    icon={<Globe className="w-8 h-8 text-cyan-600" />}
                    app="Travel Concierge"
                    description="Complete travel planning, booking, and real-time support."
                    gradient="bg-gradient-to-br from-cyan-50 via-white to-blue-50/50"
                    index={2}
                  />
                  <div className="w-[260px] h-[360px] shrink-0 rounded-3xl border border-dashed border-gray-300 flex items-center justify-center p-8 bg-gray-50/20 group hover:bg-gray-50/40 transition-colors">
                    <span className="text-xl font-medium text-gray-400 group-hover:text-gray-600 transition-colors">...and millions more</span>
                  </div>
                </>
              )}
                </div>
              </div>
            </div>

              <div className="mt-8 flex justify-end items-center mr-4">
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      const el = document.getElementById("cards-scroll-container");
                      if (el) el.scrollBy({ left: -400, behavior: "smooth" });
                    }}
                    className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-white transition-colors text-gray-400 hover:text-black shadow-sm"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById("cards-scroll-container");
                      if (el) el.scrollBy({ left: 400, behavior: "smooth" });
                    }}
                    className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-white transition-colors text-gray-400 hover:text-black shadow-sm"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <div className="bg-white">
        <footer className="relative mx-6 rounded-[48px] py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260407_043131_ebe2f0b5-9acc-4a4f-b2c1-7297f1a3beb9.mp4" type="video/mp4" />
          </video>
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-display tracking-tight text-white">
              The intelligence ecosystem is coming.
              <br className="hidden md:inline" /> Be the first to experience it.
            </h2>
            <button
              onClick={() => setIsFormOpen(true)}
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_8px_16px_rgba(39,151,202,0.25)] hover:brightness-110 hover:shadow-[0_10px_20px_rgba(39,151,202,0.35)] active:scale-95"
              style={{ 
                background: 'linear-gradient(to bottom, #5EB9E6, #2797CA)',
                border: '1px solid rgba(255, 255, 255, 0.2)' 
              }}
            >
              <img src="/25.png" alt="25" className="w-5 h-5 object-contain" />
              <span>Notify me when Zalt launches</span>
              <div className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
            </button>
          </div>
        </footer>
        <AwaitingText />
      </div>
    </div>
  );
}

function SentencesMarquee() {
  const row1 = [
    "Remind me to take out the trash tomorrow morning at 7am",
    "Add milk, eggs, and bread to my shopping list",
    "What's the weather like this weekend?",
    "Set an alarm for 6:30am tomorrow",
    "Turn off all lights and lock the front door",
    "Order a pizza from the usual place",
    "Cancel my subscription to that app I never use",
    "Summarize the last 10 emails from my boss",
    "Schedule a meeting with the team for 3pm Thursday",
    "Convert this Google Doc to PDF and email it to client",
    "Log my hours for today: 9-12 project A, 1-5 project B",
    "Find that spreadsheet from last month about Q3 sales",
    "Mute Slack notifications until noon",
    "Draft a professional reply to this angry customer email",
    "Wish my dad happy birthday via text",
    "Send a voice message to my girlfriend saying I miss her",
    "Remind me to call my sister every Sunday at 5pm",
    "What did my friend say in our group chat last night?",
    "Forward that funny meme to my brother",
    "Tell my roommate I'll be home late",
    "Track my water intake today – remind me every hour",
    "Log my workout: 30 min run, 20 min strength",
    "What's the calorie count of this meal?",
    "Find a meditation video for anxiety",
    "Book a doctor's appointment for my annual checkup",
    "Order my prescription refill",
    "How many steps did I take yesterday?",
  ];

  const row2 = [
    "Help me write a poem about the ocean",
    "Generate 10 startup name ideas for my new project",
    "Translate this paragraph into Spanish",
    "Explain quantum physics like I'm 12 years old",
    "Find me a tutorial on how to play guitar chords",
    "Rewrite this sentence to sound more professional",
    "What's my bank account balance?",
    "Split the dinner bill between me, Sarah, and John",
    "Show me my spending this month by category",
    "Set a budget of $50 for eating out this week and alert me when I'm close",
    "Pay my credit card bill on the due date",
    "How much did I spend on coffee last month?",
    "Find the cheapest flight to New York next Tuesday",
    "What's the traffic like on my way to work?",
    "Check me in for my flight tomorrow",
    "Find a hotel near the airport under $150",
    "Send my ETA to my mom",
    "What time does the last train leave?",
    "Add 'buy birthday gift for nephew' to my to-do list for Saturday",
    "When is my lease up for renewal?",
    "Find a plumber near me with good reviews",
    "Remind me to change the AC filter every 3 months",
    "What's the WiFi password again?",
    "Order more dog food from Chewy",
    "Suggest a movie to watch tonight based on what I liked before",
    "Play my 'chill' playlist on Spotify",
    "Find out if that new show on Netflix is worth watching",
    "Tell me a joke",
    "What's the score of the Lakers game?",
    "Share my location with my sister for the next 2 hours",
    "Call 911 if I don't respond in 10 minutes",
    "Has there been any news about a power outage in my area?",
    "Remind me to take my passport tomorrow morning before leaving",
    "Write a breakup text that's firm but kind",
    "Generate 10 excuses for being late that are believable",
    "Impersonate a pirate and tell me what's on my calendar today",
    "Explain cryptocurrency to my grandma",
  ];

  return (
    <div className="w-full bg-white py-12 flex flex-col gap-8 overflow-hidden select-none">
      <div className="flex whitespace-nowrap marquee-wrapper">
        <div className="flex animate-marquee-left">
          {row1.map((item, i) => (
            <div key={i} className="mx-8 text-2xl font-display uppercase text-gray-300 hover:text-gray-900 transition-colors duration-300 cursor-default">
              {item}
            </div>
          ))}
        </div>
        <div className="flex animate-marquee-left" aria-hidden="true">
          {row1.map((item, i) => (
            <div key={`dup1-${i}`} className="mx-8 text-2xl font-display uppercase text-gray-300 hover:text-gray-900 transition-colors duration-300 cursor-default">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="flex whitespace-nowrap marquee-wrapper">
        <div className="flex animate-marquee-right">
          {row2.map((item, i) => (
            <div key={i} className="mx-8 text-2xl font-display uppercase text-gray-300 hover:text-gray-900 transition-colors duration-300 cursor-default">
              {item}
            </div>
          ))}
        </div>
        <div className="flex animate-marquee-right" aria-hidden="true">
          {row2.map((item, i) => (
            <div key={`dup2-${i}`} className="mx-8 text-2xl font-display uppercase text-gray-300 hover:text-gray-900 transition-colors duration-300 cursor-default">
              {item}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 180s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 180s linear infinite;
        }
        .marquee-wrapper:hover .animate-marquee-left,
        .marquee-wrapper:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

function AwaitingText() {
  const text = "Awaiting. Use Zalt to do everything & anything.";
  const textRef = React.useRef<SVGTextElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const [viewBox, setViewBox] = React.useState("0 -800 5000 1000");

  React.useLayoutEffect(() => {
    const updateViewBox = () => {
      if (textRef.current) {
        const bbox = textRef.current.getBBox();
        if (bbox.width > 0) {
          // Clip height to the baseline (y=0) to make it sit on the edge
          setViewBox(`${bbox.x} ${bbox.y} ${bbox.width} ${Math.abs(bbox.y)}`);
        }
      }
    };
    
    updateViewBox();
    const timer = setTimeout(updateViewBox, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const svgProps = {
    height: "clamp(200px, 35vw, 700px)",
    viewBox: viewBox,
    className: "block h-auto m-0 p-0 overflow-visible shrink-0",
    style: { verticalAlign: 'bottom' },
    preserveAspectRatio: "xMinYMax meet"
  };

  const textStyle: React.CSSProperties = { 
    fontSize: '800px', 
    fill: '#E2E8F0', // slate-200
    fillOpacity: 0.7,
    dominantBaseline: 'alphabetic',
    letterSpacing: '-0.03em'
  };

  return (
    <div 
      id="terminal-marquee-section" 
      ref={containerRef}
      className="w-full bg-white select-none overflow-x-auto overflow-y-hidden flex items-end m-0 p-0 relative" 
      style={{ 
        lineHeight: 0,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      <div ref={marqueeRef} className="flex whitespace-nowrap m-0 p-0 items-end">
        <div className="flex shrink-0 items-end">
          <svg {...svgProps}>
            <text
              ref={textRef}
              x="0"
              y="0"
              className="font-display uppercase"
              style={textStyle}
            >
              {text}
            </text>
          </svg>
          <img 
            src="/12.png" 
            alt="Logo" 
            className="h-[clamp(100px,25vw,500px)] w-auto object-contain mx-12 mb-[0.05em]" 
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      <style>{`
        #terminal-marquee-section::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

function CrystalCard({
  icon,
  app,
  description,
  visual,
  gradient,
  index = 0,
}: {
  icon: React.ReactElement;
  app: string;
  description: string;
  visual?: React.ReactNode;
  gradient?: string;
  index?: number;
}) {
  return (
    <div
      className={`w-[260px] h-[360px] shrink-0 rounded-3xl border-none flex flex-col overflow-hidden relative ${gradient || "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)]"}`}
    >
      {/* Graphic Design Background Elements inspired by Mixpost */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {/* Variety of 8 unique geometric patterns using theme-aware colors */}
        {index % 8 === 0 && (
          <div className="absolute top-0 right-0 w-[180px] h-[180px] grid grid-cols-3 grid-rows-3 text-indigo-600">
            <div className="bg-current opacity-10"></div>
            <div></div>
            <div className="bg-amber-400 opacity-20"></div>
            <div></div>
            <div className="bg-current opacity-20"></div>
            <div></div>
            <div className="bg-amber-400 opacity-10"></div>
            <div className="bg-current opacity-5"></div>
            <div className="bg-amber-400 opacity-30"></div>
          </div>
        )}
        {index % 8 === 1 && (
          <div className="absolute bottom-0 right-0 w-[200px] h-[200px] grid grid-cols-4 grid-rows-4 text-emerald-600">
            <div></div><div></div><div className="bg-current opacity-15"></div><div></div>
            <div></div><div className="bg-cyan-400 opacity-20"></div><div></div><div className="bg-current opacity-10"></div>
            <div className="bg-current opacity-5"></div><div></div><div className="bg-cyan-400 opacity-25"></div><div></div>
            <div></div><div className="bg-current opacity-20"></div><div></div><div className="bg-cyan-400 opacity-10"></div>
          </div>
        )}
        {index % 8 === 2 && (
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[120px] h-[240px] grid grid-cols-2 grid-rows-4 text-amber-500">
            <div className="bg-current opacity-20"></div><div></div>
            <div></div><div className="bg-orange-600 opacity-20"></div>
            <div className="bg-orange-600 opacity-10"></div><div className="bg-current opacity-15"></div>
            <div></div><div className="bg-current opacity-10"></div>
          </div>
        )}
        {index % 8 === 3 && (
          <div className="absolute bottom-4 left-4 w-32 h-32 text-rose-500">
             <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                <div className="bg-current opacity-20"></div>
                <div className="bg-pink-400 opacity-30"></div>
                <div className="bg-pink-400 opacity-10"></div>
                <div className="bg-current opacity-10"></div>
             </div>
             <div className="absolute -top-8 -right-8 w-16 h-16 bg-current opacity-5"></div>
          </div>
        )}
        {index % 8 === 4 && (
          <div className="absolute top-0 inset-x-0 h-32 grid grid-cols-6 text-slate-400">
            <div className="bg-current opacity-10"></div>
            <div className="bg-indigo-500 opacity-10"></div>
            <div></div>
            <div className="bg-current opacity-5"></div>
            <div className="bg-indigo-500 opacity-20"></div>
            <div></div>
          </div>
        )}
        {index % 8 === 5 && (
          <div className="absolute top-1/4 right-0 w-24 h-full grid grid-cols-1 grid-rows-6 text-violet-500">
            <div className="bg-current opacity-15"></div>
            <div></div>
            <div className="bg-cyan-400 opacity-10"></div>
            <div className="bg-current opacity-20"></div>
            <div></div>
            <div className="bg-cyan-400 opacity-5"></div>
          </div>
        )}
        {index % 8 === 6 && (
          <div className="absolute inset-0 flex items-center justify-center p-12 text-blue-500">
            <div className="w-full h-full border border-current opacity-10 grid grid-cols-2 grid-rows-2">
              <div className="bg-current opacity-10"></div>
              <div></div>
              <div></div>
              <div className="bg-sky-400 opacity-20"></div>
            </div>
          </div>
        )}
        {index % 8 === 7 && (
          <div className="absolute top-0 right-0 w-full h-24 grid grid-cols-8 text-orange-500">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={i % 3 === 0 ? "bg-current opacity-10" : i % 3 === 1 ? "bg-rose-400 opacity-10" : ""}></div>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 pt-8 flex flex-col h-full bg-gradient-to-b from-white/60 to-transparent flex-grow relative z-10">
        <div className="flex justify-start items-start mb-4">
          <div className="p-2.5 rounded-xl border-none [&>svg]:w-6 [&>svg]:h-6">
            {icon}
          </div>
        </div>

        <div className="space-y-2 mb-4 flex-grow">
          <h4 className="text-base font-medium text-black leading-tight">
            {app}
          </h4>
          <p className="text-gray-600/80 text-[10px] leading-relaxed line-clamp-4">
            {description}
          </p>
        </div>

        {visual && (
          <div className="flex-grow rounded-none border-none bg-[#F0F9FF]/30 overflow-hidden relative">
            {visual}
          </div>
        )}
      </div>
    </div>
  );
}
