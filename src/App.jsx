import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowRight,
  FaBowlFood,
  FaBurger,
  FaCalendarCheck,
  FaChampagneGlasses,
  FaCheck,
  FaClock,
  FaCrown,
  FaFire,
  FaInstagram,
  FaLocationDot,
  FaLock,
  FaMagnifyingGlass,
  FaPhone,
  FaPlateWheat,
  FaQuoteLeft,
  FaRegCopy,
  FaStar,
  FaTrash,
  FaUtensils,
  FaUsers,
  FaXmark
} from "react-icons/fa6";

const ADMIN_PASSWORD = "pascahadmin";
const STORAGE_KEY = "pascah_bookings";

const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: "easeOut" }
  }
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } }
};

const dishes = [
  {
    name: "Golden Grill Platter",
    price: "₹349",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    tag: "Chef Special"
  },
  {
    name: "Creamy Butter Chicken",
    price: "₹289",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80",
    tag: "Rich & Spicy"
  },
  {
    name: "Smoky Tandoori Feast",
    price: "₹399",
    image:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=80",
    tag: "Hot Favourite"
  }
];

const menuItems = [
  ["Mutton Biryani", "Rich biryani with bold spices and tender mutton", "₹299"],
  ["Butter Chicken", "Creamy North Indian classic with soft chicken pieces", "₹289"],
  ["Grilled Chicken", "Smoky grilled chicken with house spices", "₹349"],
  ["Tandoori Chicken", "Charred, juicy and full of flavour", "₹329"],
  ["Fried Rice", "Wok-tossed rice with fresh vegetables and sauces", "₹149"],
  ["Chicken Tikka Masala", "Thick spicy masala with juicy chicken tikka", "₹279"]
];

const gallery = [
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
];

const reviews = [
  {
    name: "Arun Kumar",
    text: "Premium ambience, amazing food, and the service feels very welcoming. A must-visit spot in Avadi.",
    rating: 5
  },
  {
    name: "Priya S",
    text: "The grill platter and biryani were both excellent. The dark warm vibe is perfect for dinner.",
    rating: 5
  },
  {
    name: "Daniel Raj",
    text: "Loved the presentation, taste, and peaceful atmosphere. Great place for family and friends.",
    rating: 5
  }
];

function getBookings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveBookings(bookings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

function makeTrackingId() {
  return `PAS-${Math.floor(100000 + Math.random() * 900000)}`;
}

function isToday(dateValue) {
  if (!dateValue) return false;
  const today = new Date().toISOString().slice(0, 10);
  return dateValue === today;
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const currentProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(currentProgress);
    }

    window.addEventListener("scroll", updateProgress);
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[999] h-1 w-full bg-transparent">
      <motion.div
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-gold via-amber-200 to-gold shadow-[0_0_20px_rgba(212,165,80,0.9)]"
      />
    </div>
  );
}

function CursorGlow() {
  const [pos, setPos] = useState({ x: -300, y: -300 });

  useEffect(() => {
    function move(e) {
      setPos({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      animate={{ x: pos.x - 160, y: pos.y - 160 }}
      transition={{ type: "spring", stiffness: 90, damping: 26 }}
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-80 w-80 rounded-full bg-gold/10 blur-3xl md:block"
    />
  );
}

function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        delay: (index % 10) * 0.45,
        duration: 8 + (index % 7),
        size: index % 3 === 0 ? "h-2 w-2" : "h-1.5 w-1.5"
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: "110vh", opacity: 0, scale: 0.4 }}
          animate={{ y: "-10vh", opacity: [0, 0.55, 0], scale: [0.3, 1, 0.2] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
          style={{ left: p.left }}
          className={`absolute bottom-0 ${p.size} rounded-full bg-gold shadow-[0_0_18px_rgba(212,165,80,0.9)]`}
        />
      ))}
    </div>
  );
}

function LuxuryDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      className="mx-auto h-px max-w-5xl origin-center bg-gradient-to-r from-transparent via-gold/70 to-transparent"
    />
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-gold">
        <FaCrown /> {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-black tracking-tight text-cream md:text-6xl">
        {title}
      </h2>
      <p className="mt-5 text-sm leading-7 text-cream/65 md:text-base">{text}</p>
    </motion.div>
  );
}

function GlowButton({ children, href = "#booking" }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-gold via-amber-300 to-gold px-7 py-4 text-sm font-black uppercase tracking-wider text-black shadow-[0_0_35px_rgba(212,165,80,0.35)]"
    >
      <span className="absolute inset-0 translate-x-[-100%] bg-white/40 transition duration-700 group-hover:translate-x-[100%]" />
      <span className="relative">{children}</span>
      <FaArrowRight className="relative transition group-hover:translate-x-1" />
    </motion.a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    ["About", "#about"],
    ["Menu", "#menu"],
    ["Gallery", "#gallery"],
    ["Location", "#location"],
    ["Track", "#track"],
    ["Admin", "/admin"]
  ];

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="/" onClick={closeMenu} className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 8, scale: 1.05 }}
            className="grid h-11 w-11 place-items-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/30 shadow-[0_0_25px_rgba(212,165,80,0.18)]"
          >
            <FaUtensils />
          </motion.span>

          <span>
            <span className="block font-display text-xl font-black tracking-wide text-cream">
              Pascah
            </span>
            <span className="block text-[10px] uppercase tracking-[0.28em] text-gold">
              Avadi Chennai
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-semibold text-cream/70 md:flex">
          {navLinks.map(([label, href]) => (
            <a key={label} href={href} className="transition hover:text-gold">
              {label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#booking"
            className="rounded-full border border-gold/40 px-4 py-2 text-xs font-black uppercase tracking-wider text-gold transition hover:bg-gold hover:text-black"
          >
            Book Table
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="relative z-50 grid h-11 w-11 place-items-center rounded-full border border-gold/30 bg-gold/10 text-xl font-black text-gold shadow-[0_0_25px_rgba(212,165,80,0.16)] md:hidden"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                <FaXmark />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                ☰
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -24, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -24, filter: "blur(16px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="md:hidden"
          >
            <div className="relative mx-4 mb-4 overflow-hidden rounded-[2rem] border border-gold/20 bg-black/90 p-4 shadow-[0_0_60px_rgba(212,165,80,0.16)] backdrop-blur-2xl">
              <div className="absolute left-10 top-16 h-32 w-32 rounded-full bg-gold/10 blur-3xl" />

              <div className="relative grid gap-2">
                {navLinks.map(([label, href], index) => (
                  <motion.a
                    key={label}
                    href={href}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.045 }}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-black uppercase tracking-wider text-cream/75 transition hover:border-gold/40 hover:bg-gold/10 hover:text-gold"
                  >
                    {label}
                    <FaArrowRight className="text-gold" />
                  </motion.a>
                ))}

                <motion.a
                  href="#booking"
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-3 flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold via-amber-200 to-gold px-6 py-4 text-sm font-black uppercase tracking-wider text-black shadow-[0_0_35px_rgba(212,165,80,0.28)]"
                >
                  Book Table <FaCalendarCheck />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function TrackBooking() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  function handleTrack(e) {
    e.preventDefault();

    const clean = query.trim().toLowerCase();
    const bookings = getBookings();

    const found = bookings.find(
      (booking) =>
        booking.trackingId?.toLowerCase() === clean ||
        booking.phone?.toLowerCase() === clean
    );

    setResult(found || null);
    setSearched(true);
  }

  return (
    <section id="track" className="px-5 py-20">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="mb-3 text-sm font-black uppercase tracking-[0.28em] text-gold">
            Tracking
          </p>
          <h2 className="font-display text-5xl font-black leading-tight md:text-7xl">
            Track your table request.
          </h2>
          <p className="mt-6 max-w-xl leading-8 text-cream/65">
            Enter your tracking ID or phone number to check whether your booking is
            pending, confirmed, or rejected by the restaurant admin.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] border border-gold/20 bg-white/[0.05] p-6 shadow-[0_0_80px_rgba(212,165,80,0.12)] backdrop-blur-xl md:p-8"
        >
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />

          <form onSubmit={handleTrack} className="relative">
            <label className="mb-3 block text-sm font-black uppercase tracking-widest text-cream/50">
              Tracking ID / Phone Number
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input flex-1"
                required
                placeholder="Example: PAS-123456"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold via-amber-200 to-gold px-7 py-4 text-sm font-black uppercase tracking-wider text-black shadow-[0_0_35px_rgba(212,165,80,0.25)] transition hover:scale-[1.02]"
              >
                <FaMagnifyingGlass /> Track
              </button>
            </div>
          </form>

          <AnimatePresence mode="wait">
            {searched && result && (
              <motion.div
                key="found"
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="relative mt-6 rounded-[2rem] border border-gold/25 bg-black/35 p-5"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-cream/40">
                      Tracking ID
                    </p>
                    <h3 className="mt-1 font-display text-3xl font-black text-gold">
                      {result.trackingId}
                    </h3>
                  </div>

                  <span
                    className={`inline-flex rounded-full px-5 py-3 text-xs font-black uppercase tracking-wider ${
                      result.status === "Confirmed"
                        ? "bg-green-500/15 text-green-300"
                        : result.status === "Rejected"
                        ? "bg-red-500/15 text-red-300"
                        : "bg-gold/15 text-gold"
                    }`}
                  >
                    {result.status}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-cream/40">
                      Name
                    </p>
                    <p className="mt-1 font-bold">{result.name}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-cream/40">
                      Date
                    </p>
                    <p className="mt-1 font-bold">{result.date}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-cream/40">
                      Time
                    </p>
                    <p className="mt-1 font-bold">{result.time}</p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-cream/60">
                  {result.status === "Confirmed"
                    ? "Your table is confirmed. Please arrive on time and enjoy your meal."
                    : result.status === "Rejected"
                    ? "Your request was rejected. Please contact the restaurant or try another time."
                    : "Your request is still pending. The restaurant admin will update it soon."}
                </p>
              </motion.div>
            )}

            {searched && !result && (
              <motion.div
                key="not-found"
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="relative mt-6 rounded-[2rem] border border-red-400/25 bg-red-500/10 p-5 text-center"
              >
                <p className="font-display text-2xl font-black text-red-200">
                  Booking Not Found
                </p>
                <p className="mt-2 text-sm leading-6 text-cream/60">
                  Check your tracking ID or phone number and try again.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Website() {
  const [bookingDone, setBookingDone] = useState(false);
  const [latestBooking, setLatestBooking] = useState(null);

  function handleBooking(e) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const newBooking = {
      id: Date.now(),
      trackingId: makeTrackingId(),
      name: form.get("name"),
      phone: form.get("phone"),
      date: form.get("date"),
      time: form.get("time"),
      guests: form.get("guests"),
      occasion: form.get("occasion"),
      request: form.get("request"),
      status: "Pending",
      createdAt: new Date().toLocaleString()
    };

    const oldBookings = getBookings();
    const updatedBookings = [newBooking, ...oldBookings];
    saveBookings(updatedBookings);

    setLatestBooking(newBooking);
    setBookingDone(true);
    e.currentTarget.reset();

    setTimeout(() => setBookingDone(false), 9000);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-black text-cream">
      <ScrollProgress />
      <CursorGlow />
      <FloatingParticles />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, pointerEvents: "none" }}
          transition={{ delay: 1.8, duration: 0.9, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] grid place-items-center bg-black"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: "blur(20px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              initial={{ rotate: -12 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-full border border-gold/30 bg-gold/10 text-5xl text-gold shadow-[0_0_60px_rgba(212,165,80,0.35)]"
            >
              <FaUtensils />
            </motion.div>
            <h1 className="font-display text-5xl font-black tracking-tight text-gold md:text-7xl">
              PASCAH
            </h1>
            <p className="mt-3 text-sm uppercase tracking-[0.5em] text-cream/60">
              Restaurant Avadi
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="fixed inset-0 -z-0 bg-[radial-gradient(circle_at_20%_10%,rgba(212,165,80,0.16),transparent_30%),radial-gradient(circle_at_90%_30%,rgba(92,48,26,0.35),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(212,165,80,0.10),transparent_35%)]" />
      <div className="fixed inset-0 -z-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />

      <Header />

      <section className="relative flex min-h-screen items-center px-5 pb-16 pt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10">
            <motion.p
              variants={fadeUp}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-gold"
            >
              <FaFire /> Premium Dining Experience
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl font-black leading-[0.95] tracking-tight text-cream sm:text-6xl md:text-8xl"
            >
              Authentic Flavours,
              <span className="block bg-gradient-to-r from-gold via-amber-200 to-gold bg-clip-text text-transparent">
                Premium Dining
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-8 text-cream/70 md:text-lg"
            >
              Welcome to Pascah Multicuisine Restaurant, Avadi, Chennai — a warm
              family dining spot crafted for biryani, grills, North Indian favourites,
              and unforgettable meals.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-4 sm:flex-row">
              <GlowButton>Reserve Now</GlowButton>
              <a
                href="#track"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-black uppercase tracking-wider text-cream transition hover:border-gold/50 hover:text-gold"
              >
                Track Booking <FaMagnifyingGlass />
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {[
                ["4.4", "Rating"],
                ["Multi", "Cuisine"],
                ["Avadi", "Location"]
              ].map(([big, small]) => (
                <motion.div
                  whileHover={{ y: -5, scale: 1.03 }}
                  key={big}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-center backdrop-blur"
                >
                  <p className="font-display text-2xl font-black text-gold">{big}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-cream/50">
                    {small}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto aspect-square max-w-[540px] overflow-hidden rounded-[3rem] border border-gold/25 bg-brown/50 p-4 shadow-[0_0_90px_rgba(212,165,80,0.18)]"
            >
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
                alt="Premium restaurant dish"
                className="h-full w-full rounded-[2.4rem] object-cover"
              />
              <div className="absolute inset-4 rounded-[2.4rem] bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-9 left-9 right-9 rounded-3xl border border-white/10 bg-black/55 p-5 backdrop-blur-xl">
                <p className="flex items-center gap-2 text-sm font-bold text-gold">
                  <FaStar /> Today’s Signature
                </p>
                <h3 className="mt-1 font-display text-2xl font-black">
                  Pascah Multicuisine Feast
                </h3>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 18, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-3 bottom-8 rounded-3xl border border-gold/20 bg-black/70 p-4 shadow-2xl backdrop-blur-xl md:-left-10"
            >
              <p className="text-xs uppercase tracking-widest text-cream/50">
                Address
              </p>
              <p className="mt-1 flex items-center gap-2 font-bold text-gold">
                <FaLocationDot /> Kamaraj Nagar, Avadi
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <LuxuryDivider />

      <section id="about" className="px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <img
              className="h-72 rounded-[2rem] object-cover"
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80"
              alt="Restaurant interior"
            />
            <img
              className="mt-10 h-72 rounded-[2rem] object-cover"
              src="https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=900&q=80"
              alt="Restaurant food table"
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl md:p-10"
          >
            <p className="mb-3 text-sm font-black uppercase tracking-[0.28em] text-gold">
              About Pascah
            </p>
            <h2 className="font-display text-4xl font-black leading-tight md:text-6xl">
              Crafted for people who love food with soul.
            </h2>
            <p className="mt-6 leading-8 text-cream/65">
              Pascah Multicuisine Restaurant brings a warm family dining experience
              to Avadi, Chennai. Known for North Indian, Oriental, and biryani dishes,
              it is built for casual dinners, family outings, and flavour-packed meals.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                [FaPlateWheat, "Multicuisine Menu"],
                [FaFire, "Biryani & Grill"],
                [FaChampagneGlasses, "Family Dining"]
              ].map(([Icon, label]) => (
                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
                  key={label}
                  className="rounded-3xl border border-white/10 bg-black/30 p-5"
                >
                  <Icon className="mb-4 text-3xl text-gold" />
                  <p className="font-bold">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <LuxuryDivider />

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Signature Dishes"
            title="Food that steals the spotlight"
            text="Inspired by Pascah favourites like biryani, butter chicken, grilled chicken, tandoori chicken, and fried rice."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {dishes.map((dish, index) => (
              <motion.article
                variants={fadeUp}
                whileHover={{ y: -10, scale: 1.02 }}
                key={dish.name}
                className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur transition duration-500 hover:border-gold/40 hover:shadow-[0_0_70px_rgba(212,165,80,0.20)]"
              >
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-1000 group-hover:translate-x-full" />
                <div className="relative h-72 overflow-hidden rounded-[2rem]">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-gold px-4 py-2 text-xs font-black uppercase tracking-wider text-black">
                    {dish.tag}
                  </span>
                  <span className="absolute bottom-5 right-5 rounded-full border border-gold/40 bg-black/70 px-4 py-2 font-black text-gold backdrop-blur">
                    {dish.price}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-cream/40">
                    0{index + 1} / Pascah Special
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-black text-cream">
                    {dish.name}
                  </h3>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <LuxuryDivider />

      <section id="menu" className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Menu"
            title="A premium spread for every craving"
            text="A focused showcase of popular multicuisine dishes for biryani lovers, grill fans, and comfort-food cravings."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-4 md:grid-cols-2"
          >
            {menuItems.map(([name, desc, price]) => (
              <motion.div
                variants={fadeUp}
                whileHover={{ x: 6, scale: 1.01 }}
                key={name}
                className="group flex items-center justify-between gap-5 rounded-[2rem] border border-white/10 bg-gradient-to-r from-white/[0.06] to-white/[0.02] p-5 transition hover:border-gold/35 hover:shadow-[0_0_45px_rgba(212,165,80,0.12)]"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gold/10 text-2xl text-gold">
                    <FaBurger />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-cream">{name}</h3>
                    <p className="mt-1 text-sm leading-6 text-cream/55">{desc}</p>
                  </div>
                </div>
                <p className="font-display text-2xl font-black text-gold">{price}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <LuxuryDivider />

      <section id="gallery" className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Gallery"
            title="Inside Pascah Multicuisine"
            text="A closer look at Pascah’s food, ambience, family dining vibe, and beautiful restaurant moments in Avadi."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 md:grid-cols-3"
          >
            {gallery.map((img, index) => (
              <motion.div
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                key={img}
                className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl ${
                  index === 0 || index === 5 ? "md:row-span-2" : ""
                }`}
              >
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />
                <img
                  src={img}
                  alt="Inside Pascah Restaurant Avadi"
                  loading="lazy"
                  className="h-full min-h-56 w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 z-20 rounded-full border border-gold/30 bg-black/55 px-4 py-2 text-xs font-black uppercase tracking-widest text-gold backdrop-blur-xl">
                  Pascah Moment
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <LuxuryDivider />

      <section id="location" className="px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8"
          >
            <p className="mb-3 text-sm font-black uppercase tracking-[0.28em] text-gold">
              Location
            </p>
            <h2 className="font-display text-4xl font-black md:text-6xl">
              Pascah Multicuisine Restaurant
            </h2>
            <p className="mt-5 leading-8 text-cream/65">
              Visit Pascah at 3, Main Road, Kamaraj Nagar, Avadi, Chennai. A convenient
              family dining spot in Avadi for biryani, grills, North Indian, and
              multicuisine favourites.
            </p>

            <div className="mt-8 space-y-4">
              <p className="flex items-center gap-3 text-cream/75">
                <FaLocationDot className="text-gold" /> 3, Main Road, Kamaraj Nagar, Avadi, Chennai
              </p>
              <p className="flex items-center gap-3 text-cream/75">
                <FaPhone className="text-gold" /> +91 44 2655 0505
              </p>
              <p className="flex items-center gap-3 text-cream/75">
                <FaClock className="text-gold" /> Open daily for lunch and dinner
              </p>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Pascah%20Multicuisine%20Restaurant%203%20Main%20Road%20Kamaraj%20Nagar%20Avadi%20Chennai"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-full border border-gold/40 px-6 py-3 text-sm font-black uppercase tracking-wider text-gold transition hover:bg-gold hover:text-black"
            >
              Open Directions
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="min-h-[420px] overflow-hidden rounded-[2.5rem] border border-gold/20 bg-brown/40"
          >
            <iframe
              title="Pascah Multicuisine Restaurant Avadi Chennai map"
              className="h-full min-h-[420px] w-full opacity-90 grayscale invert"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Pascah%20Multicuisine%20Restaurant%203%20Main%20Road%20Kamaraj%20Nagar%20Avadi%20Chennai&output=embed"
            />
          </motion.div>
        </div>
      </section>

      <LuxuryDivider />

      <section id="booking" className="px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.28em] text-gold">
              Booking
            </p>
            <h2 className="font-display text-5xl font-black leading-tight md:text-7xl">
              Reserve your golden table.
            </h2>
            <p className="mt-6 max-w-xl leading-8 text-cream/65">
              Submit your table request. You will get a tracking ID, and the admin can
              confirm or reject your booking from the dashboard.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleBooking}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2.5rem] border border-gold/20 bg-white/[0.05] p-6 shadow-[0_0_80px_rgba(212,165,80,0.12)] backdrop-blur-xl md:p-8"
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />

            <div className="relative grid gap-4 sm:grid-cols-2">
              <input name="name" className="input" required placeholder="Your Name" />
              <input name="phone" className="input" required type="tel" placeholder="Phone Number" />
              <input name="date" className="input" required type="date" />
              <input name="time" className="input" required type="time" />
              <select name="guests" className="input" required defaultValue="">
                <option value="" disabled>
                  Guests
                </option>
                <option>2 Guests</option>
                <option>4 Guests</option>
                <option>6 Guests</option>
                <option>8+ Guests</option>
              </select>
              <select name="occasion" className="input" required defaultValue="">
                <option value="" disabled>
                  Occasion
                </option>
                <option>Casual Dinner</option>
                <option>Birthday</option>
                <option>Family Dinner</option>
                <option>Date Night</option>
              </select>
              <textarea
                name="request"
                className="input min-h-28 sm:col-span-2"
                placeholder="Special request"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="relative mt-6 w-full overflow-hidden rounded-full bg-gradient-to-r from-gold via-amber-200 to-gold px-8 py-4 text-sm font-black uppercase tracking-wider text-black shadow-[0_0_35px_rgba(212,165,80,0.35)]"
            >
              Send Booking Request
            </motion.button>

            <AnimatePresence>
              {bookingDone && latestBooking && (
                <motion.div
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 rounded-[2rem] border border-gold/30 bg-gold/10 p-5 text-center"
                >
                  <p className="font-display text-2xl font-black text-gold">
                    Booking Request Sent!
                  </p>
                  <p className="mt-2 text-sm leading-6 text-cream/70">
                    Thank you, {latestBooking.name}. Your table request is now waiting
                    for admin confirmation.
                  </p>
                  <div className="mx-auto mt-5 max-w-sm rounded-2xl border border-gold/25 bg-black/35 p-4">
                    <p className="text-xs uppercase tracking-widest text-cream/40">
                      Your Tracking ID
                    </p>
                    <p className="mt-1 font-display text-3xl font-black text-gold">
                      {latestBooking.trackingId}
                    </p>
                    <p className="mt-2 text-xs text-cream/50">
                      Save this ID to track your booking status.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </section>

      <LuxuryDivider />

      <TrackBooking />

      <LuxuryDivider />

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Reviews"
            title="Loved by foodies"
            text="Guests come for the food, stay for the vibe, and return for the flavour."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                key={review.name}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7"
              >
                <FaQuoteLeft className="mb-5 text-3xl text-gold" />
                <div className="mb-4 flex gap-1 text-gold">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="leading-7 text-cream/70">{review.text}</p>
                <p className="mt-6 font-black text-cream">{review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-4xl font-black text-gold">
              Pascah Restaurant
            </h2>
            <p className="mt-2 text-sm text-cream/55">
              3, Main Road, Kamaraj Nagar, Avadi, Chennai.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-cream/35">
              Made by <span className="text-gold">Samurai Websites</span>
            </p>
          </div>

          <div className="flex gap-3">
            {[FaInstagram, FaPhone, FaLock].map((Icon, index) => (
              <a
                key={index}
                href={index === 2 ? "/admin" : "#"}
                className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-gold transition hover:border-gold/40 hover:bg-gold hover:text-black"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-7xl text-xs uppercase tracking-[0.25em] text-cream/35">
          © 2026 Pascah Restaurant. Designed for premium food lovers.
        </p>
      </footer>
    </main>
  );
}

function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(
    () => localStorage.getItem("pascah_admin_logged") === "true"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const stats = useMemo(() => {
    return {
      total: bookings.length,
      today: bookings.filter((b) => isToday(b.date)).length,
      pending: bookings.filter((b) => b.status === "Pending").length,
      confirmed: bookings.filter((b) => b.status === "Confirmed").length,
      rejected: bookings.filter((b) => b.status === "Rejected").length
    };
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    const q = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        !q ||
        booking.name?.toLowerCase().includes(q) ||
        booking.phone?.toLowerCase().includes(q) ||
        booking.trackingId?.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "All" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  function login(e) {
    e.preventDefault();

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("pascah_admin_logged", "true");
      setLoggedIn(true);
      setError("");
    } else {
      setError("Wrong password. Try again.");
    }
  }

  function logout() {
    localStorage.removeItem("pascah_admin_logged");
    setLoggedIn(false);
  }

  function updateStatus(id, status) {
    const updated = bookings.map((booking) =>
      booking.id === id ? { ...booking, status } : booking
    );

    setBookings(updated);
    saveBookings(updated);
  }

  function deleteBooking(id) {
    const updated = bookings.filter((booking) => booking.id !== id);
    setBookings(updated);
    saveBookings(updated);
  }

  function clearAllBookings() {
    const confirmClear = window.confirm("Delete all bookings?");
    if (!confirmClear) return;

    setBookings([]);
    saveBookings([]);
  }

  function copyText(text) {
    navigator.clipboard.writeText(text || "");
    alert("Tracking ID copied!");
  }

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-black px-5 py-10 text-cream">
        <CursorGlow />
        <FloatingParticles />

        <div className="fixed inset-0 -z-0 bg-[radial-gradient(circle_at_20%_10%,rgba(212,165,80,0.18),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(92,48,26,0.45),transparent_35%)]" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center">
          <motion.form
            onSubmit={login}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="w-full max-w-md overflow-hidden rounded-[2.5rem] border border-gold/25 bg-white/[0.05] p-8 shadow-[0_0_90px_rgba(212,165,80,0.16)] backdrop-blur-2xl"
          >
            <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full border border-gold/30 bg-gold/10 text-4xl text-gold">
              <FaLock />
            </div>

            <h1 className="text-center font-display text-4xl font-black text-gold">
              Admin Login
            </h1>
            <p className="mt-3 text-center text-sm leading-6 text-cream/60">
              Pascah Restaurant booking control panel.
            </p>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input mt-8"
              type="password"
              placeholder="Enter admin password"
            />

            {error && (
              <p className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 p-3 text-center text-sm text-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-5 w-full rounded-full bg-gradient-to-r from-gold via-amber-200 to-gold px-8 py-4 text-sm font-black uppercase tracking-wider text-black"
            >
              Enter Dashboard
            </button>

            <a
              href="/"
              className="mt-5 block text-center text-sm font-bold text-cream/50 hover:text-gold"
            >
              Back to website
            </a>
          </motion.form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-5 py-6 text-cream">
      <ScrollProgress />
      <CursorGlow />
      <FloatingParticles />

      <div className="fixed inset-0 -z-0 bg-[radial-gradient(circle_at_20%_10%,rgba(212,165,80,0.16),transparent_30%),radial-gradient(circle_at_90%_30%,rgba(92,48,26,0.35),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(212,165,80,0.10),transparent_35%)]" />

      <section className="relative z-10 mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
          <div className="mb-8 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/15 text-2xl text-gold">
              <FaUtensils />
            </div>
            <div>
              <h1 className="font-display text-2xl font-black text-gold">
                Pascah
              </h1>
              <p className="text-xs uppercase tracking-widest text-cream/40">
                Admin Control
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {["Dashboard", "Bookings", "Tracking", "Customers"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-black text-cream/70"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/10 p-4">
            <p className="text-xs uppercase tracking-widest text-cream/40">
              Demo Password
            </p>
            <p className="mt-1 font-black text-gold">{ADMIN_PASSWORD}</p>
          </div>

          <div className="mt-8 grid gap-3">
            <a
              href="/"
              className="rounded-full border border-gold/30 px-5 py-3 text-center text-sm font-black text-gold hover:bg-gold hover:text-black"
            >
              View Website
            </a>
            <button
              onClick={logout}
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-black text-cream/70 hover:border-red-400/40 hover:text-red-300"
            >
              Logout
            </button>
          </div>
        </aside>

        <div>
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl"
          >
            <p className="text-sm font-black uppercase tracking-[0.28em] text-gold">
              Restaurant Command Center
            </p>
            <h2 className="mt-2 font-display text-4xl font-black md:text-6xl">
              OP Admin Dashboard
            </h2>
            <p className="mt-2 text-sm text-cream/55">
              Manage bookings, tracking IDs, customer calls, and live status updates.
            </p>
          </motion.div>

          <div className="mb-6 grid gap-4 md:grid-cols-5">
            {[
              ["Total", stats.total, FaCalendarCheck],
              ["Today", stats.today, FaClock],
              ["Pending", stats.pending, FaClock],
              ["Confirmed", stats.confirmed, FaCheck],
              ["Rejected", stats.rejected, FaXmark]
            ].map(([label, value, Icon], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-gold/10 text-xl text-gold">
                  <Icon />
                </div>
                <p className="text-xs uppercase tracking-widest text-cream/45">
                  {label}
                </p>
                <p className="mt-2 font-display text-4xl font-black text-gold">
                  {value}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mb-6 grid gap-3 rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl md:grid-cols-[1fr_220px_auto]">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input"
              placeholder="Search name, phone, or tracking ID"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Rejected</option>
            </select>

            {bookings.length > 0 && (
              <button
                onClick={clearAllBookings}
                className="rounded-full border border-red-400/30 px-5 py-3 text-sm font-black text-red-300 hover:bg-red-500/10"
              >
                Clear All
              </button>
            )}
          </div>

          {filteredBookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 text-center backdrop-blur-xl"
            >
              <FaCalendarCheck className="mx-auto mb-5 text-5xl text-gold" />
              <h3 className="font-display text-3xl font-black">
                No bookings found
              </h3>
              <p className="mt-3 text-cream/55">
                Customer booking requests will appear here.
              </p>
            </motion.div>
          ) : (
            <div className="grid gap-5">
              {filteredBookings.map((booking, index) => (
                <motion.article
                  key={booking.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  whileHover={{ scale: 1.01 }}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
                >
                  <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
                    <div className="grid gap-4 md:grid-cols-5 xl:flex-1">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-cream/40">
                          Customer
                        </p>
                        <h3 className="mt-1 text-xl font-black text-cream">
                          {booking.name}
                        </h3>
                        <a
                          href={`tel:${booking.phone}`}
                          className="mt-1 inline-flex items-center gap-2 text-sm text-gold"
                        >
                          <FaPhone /> {booking.phone}
                        </a>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-widest text-cream/40">
                          Tracking ID
                        </p>
                        <button
                          onClick={() => copyText(booking.trackingId)}
                          className="mt-1 inline-flex items-center gap-2 font-display text-xl font-black text-gold"
                        >
                          {booking.trackingId || "OLD BOOKING"} <FaRegCopy />
                        </button>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-widest text-cream/40">
                          Date & Time
                        </p>
                        <p className="mt-1 font-bold text-gold">{booking.date}</p>
                        <p className="mt-1 text-sm text-cream/60">{booking.time}</p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-widest text-cream/40">
                          Guests
                        </p>
                        <p className="mt-1 flex items-center gap-2 font-bold text-cream">
                          <FaUsers className="text-gold" /> {booking.guests}
                        </p>
                        <p className="mt-1 text-sm text-cream/60">
                          {booking.occasion}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-widest text-cream/40">
                          Status
                        </p>
                        <span
                          className={`mt-2 inline-flex rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider ${
                            booking.status === "Confirmed"
                              ? "bg-green-500/15 text-green-300"
                              : booking.status === "Rejected"
                              ? "bg-red-500/15 text-red-300"
                              : "bg-gold/15 text-gold"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => updateStatus(booking.id, "Confirmed")}
                        className="rounded-full bg-green-500/15 px-4 py-3 text-sm font-black text-green-300 hover:bg-green-500/25"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, "Pending")}
                        className="rounded-full bg-gold/15 px-4 py-3 text-sm font-black text-gold hover:bg-gold/25"
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, "Rejected")}
                        className="rounded-full bg-red-500/15 px-4 py-3 text-sm font-black text-red-300 hover:bg-red-500/25"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => deleteBooking(booking.id)}
                        className="grid h-12 w-12 place-items-center rounded-full border border-white/10 text-cream/60 hover:border-red-400/40 hover:text-red-300"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  {booking.request && (
                    <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
                      <p className="text-xs uppercase tracking-widest text-cream/40">
                        Special Request
                      </p>
                      <p className="mt-2 text-sm leading-6 text-cream/65">
                        {booking.request}
                      </p>
                    </div>
                  )}

                  <p className="mt-4 text-xs text-cream/35">
                    Submitted: {booking.createdAt}
                  </p>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function App() {
  const isAdminPage = window.location.pathname === "/admin";
  return isAdminPage ? <AdminDashboard /> : <Website />;
}

export default App;