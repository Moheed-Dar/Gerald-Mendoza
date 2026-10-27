"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

// ============================================
// 5-COLOR SCHEME — "Deep Ocean Architectural"
// ============================================
const CREAM = "#F7F7F7";
const TEAL = "#347A85";
const DEEP_TEAL = "#28606B";
const INK = "#143336";
const BLACK = "#000000";

const INK_05 = `${INK}0D`;
const INK_10 = `${INK}1A`;
const INK_20 = `${INK}33`;
const INK_40 = `${INK}66`;
const INK_60 = `${INK}99`;
const TEAL_15 = `${TEAL}26`;
const TEAL_30 = `${TEAL}4D`;

const testimonials = [
  { id: 1, name: "Erin", text: "Being a military spouse, I have 4 moves under my belt. But when it came time to help my mother sell her house, I wasn't as certain. Gerald Mendoza was wonderful, and definitely went above and beyond for us. Compared to the previous realtors we had worked with, Gerald Mendoza definitely stands out, and I will recommend him every time someone is looking for a realtor." },
  { id: 2, name: "Glenn", text: "Gerald Mendoza was friendly and helpful, and made the home buying process a charm!" },
  { id: 3, name: "Laurie", text: "Gerald Mendoza worked patiently with us as we searched for, and found, a great home in neighborhoods with very few listings, and at a good price as well. Then he turned around and sold our existing home in a couple of days. Great knowledge of all things real estate." },
  { id: 4, name: "Josh & Meghan", text: "When buying your first home Gerald Mendoza is the realtor best suited for the job. Gerald Mendoza gets to know his clients and is able to pick out homes that will suit you best. He really knows the areas of Toronto well and is flexible with his time in order to book viewings when it suits you best. He is knowledgeable and we were able to understand the process of buying a home with his expertise. You'd be mistaken to not use Gerald Mendoza for your future home buying needs!" },
  { id: 5, name: "Nicole Schenk", text: "I've had the pleasure of working with Gerald Mendoza for a few years, and I am consistently impressed by his dedication to his clients. Gerald Mendoza excels in providing a seamless experience for both sellers and buyers, ensuring that every transaction is smooth and stress-free. He takes the time to listen to his clients' needs and preferences, offering personalized and reliable service that is second to none. His extensive knowledge of the Toronto real estate market is truly impressive, and it is clear that he is passionate about helping his clients achieve their goals. Gerald Mendoza is a true professional, and I highly recommend him to anyone looking to buy or sell property in the Toronto area." },
  { id: 6, name: "Noah", text: "Gerald Mendoza helped me buy my first home and I'm so very happy with everything he did for me! He was very helpful and patient despite me being picky and not having clear requirements and set search parameters. He made the whole looking and buying process painless and as comfortable and understandable as possible. Gerald Mendoza is such a friendly and informative resource that I would recommend to anyone wanting to navigate the real estate market. I always looked forward to any house visits that Gerald Mendoza seamlessly set up for me, some on same day short notice!" },
  { id: 7, name: "Dave Graham", text: "Simply put Gerald Mendoza is the best. Super patient, knowledgeable and proactive and always reachable for questions, showings, offers etc etc. We are very picky and didn't know if we would find the right place but Gerald Mendoza hung in there for the journey with us! Thanks again Gerald Mendoza for everything you've done." },
  { id: 8, name: "Cathy", text: "Gerald Mendoza went above and beyond in his work with me. I was selling a property located five hours from my current location, which had its challenges. Gerald Mendoza helped me to manage the logistics of selling a property remotely. He was, at all times, friendly, informative and, above all, knowledgeable and compassionate. I highly recommend his services!" },
  { id: 9, name: "Kathryn Graham", text: "Gerald Mendoza was wonderful. He kept me well informed as to what was happening in the real estate market and then found me the place I wanted to be. I'll never move again! Gerald Mendoza was friendly and patient and helped me decide what I wanted in my new home. Kudos Gerald Mendoza!" },
  { id: 10, name: "Daniel P", text: "Gerald Mendoza was amazing since the day I landed in Canada. He treated me like I was his best client since the beginning. His good humor and patience make the process of finding a home much more enjoyable. I highly recommend him!" },
  { id: 11, name: "Kirby Chan", text: "Gerald Mendoza is an amazing Realtor. He's a senior graduate of our social media program. He has all the social media tools to support buyers in finding off market homes and support sellers in promoting their homes to a wide audience!!!" },
  { id: 12, name: "Sandip", text: "This real estate agent will be there for you when you need guidance and support. He is very prompt and responsive on email and text and will call or meet you in person if that's needed. He is a very good listener and has empathy. He has lots of connections in the trades and financial industry. He really goes the extra mile and has passion for what he does. And we sold my house in a spring 2023 market for well above asking. We had a bidding war and a back up offer all which were managed with the above mentioned qualities. He cares and it shows. You need to connect with him if you are in the market." },
  { id: 13, name: "Mark", text: "Gerald Mendoza is awesome! His help was instrumental in me being able to find the right house. Very friendly, knowledgeable and responsive!" },
  { id: 14, name: "Shane", text: "Gerald Mendoza is an incredible realtor! This is the second time he's helped us with a house and I'm sure it won't be the last. He got us a good price at an uncertain time. Can't say enough good things about him!" },
  { id: 15, name: "Sandip", text: "Amazing experience! He was easily able to understand my needs. He is one of the most reliable people I have met! He was my rock during my perfect home search. Also, very knowledgeable for a home in the country. Very accommodating! I always look for an agent that is on the ball so I can get the best deal and Gerald Mendoza definitely exceeded my expectations. Highly, highly recommend!" },
  { id: 16, name: "Karen", text: "Gerald Mendoza was recommended to me by a friend two years ago when I arrived in Toronto from the Niagara region. Gerald Mendoza spent a lot of time with me helping me find a wonderful house to call home. Two years later and a relocation back to Niagara, Gerald Mendoza was there every step of the way assisting me in providing suggestions that would allow me to sell my home quickly and for a favourable price. Gerald Mendoza went over and above his responsibility as a realtor and provided tremendous support during a time that can be very stressful. I feel very lucky to have met him and would highly recommend his services." },
  { id: 17, name: "Soormee Robin", text: "I stumbled across Gerald Mendoza, at the beginning of my house-search, and I now consider it to be a divine accident. I reached out to ask a question, to which he responded effortlessly, with the ease and lightness which is customary of his style. During our time together, I came to realize that he is a person of high integrity, always taking the extra time to address things properly and thoroughly. He always made sure that he had done everything possible to accommodate my needs throughout all the various scenarios that we went through together, and he always seemed to have something in his (very ethical) \"bag of tricks\" to make things work. I can't recommend his service highly enough, he gave me 5-star service all the way! I'm very grateful!!" },
  { id: 18, name: "Ann", text: "Hi, just a note to say thanks for all you have done for us throughout this process. As first time buyers, we had a lot of unanswered questions regarding the purchase of our home. Thank you for providing the answers to many of these and giving us informed advice on the homes that we visited!" },
  { id: 19, name: "Cheyenne", text: "Gerald Mendoza was a pleasure to work with! As first time Canadian homebuyers, he made the process simple and easy. He provided great resources to help us find our ideal home. We look forward to working with him again in the future!" },
  { id: 20, name: "Sandy", text: "Gerald Mendoza helped us to find our perfect home in Carleton Place, in March 2021! He was always so organized for our house tours, with: clipboards, spec sheets, and hand sanitizer! Gerald Mendoza always listened to our feedback, and would use our info to update the listings he would send us! We loved working with Gerald Mendoza, as I'm sure you will!" },
  { id: 21, name: "Spencer", text: "Gerald Mendoza is one of the hardest working and dedicated agents I have dealt with after buying ten houses. Gerald Mendoza guided us through one of the toughest transactions I have done. The result is we live in our dream forever home." },
  { id: 22, name: "Ken", text: "Gerald Mendoza goes above and beyond in everything about selling homes!" },
  { id: 23, name: "Suzanne", text: "Gerald Mendoza helped me buy a home in Toronto's Copeland Park neighbourhood in January 2021. There are very few properties on the Toronto market and you have to move fast. Gerald Mendoza gave me all the information I needed in a very short period of time and explained clearly how to proceed to make an offer. I could count on him at every step, before and after my offer was accepted. He always answered quickly all my questions. He is supportive, knowledgeable and professional. But there is more: he is also a great person. I highly recommend his services to friends and family." },
  { id: 24, name: "Virginia", text: "What really sets Gerald Mendoza apart is his heart. When our first offer didn't get accepted he followed up with us the next day with words of encouragement, and that really made us feel comforted. It's personal touches like this that really made the experience with him so great. For first time buyers the process can be really overwhelming and Gerald Mendoza took the time to patiently walk us through each step, always willing to dig up the information we were looking for and making sure we were comfortable and informed every step of the way. We cannot thank him enough for our new home!" },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

// ============================================
// SHARED TESTIMONIAL CARD
// ============================================
const TestimonialCard = ({ t, index = 0, total = 1 }) => {
  const avatarColors = [
    `linear-gradient(135deg, ${TEAL}, ${DEEP_TEAL})`,
    `linear-gradient(135deg, ${DEEP_TEAL}, ${INK})`,
    `linear-gradient(135deg, ${INK}, ${TEAL})`,
    `linear-gradient(135deg, ${TEAL}, ${INK})`,
  ];
  const getAvatarColor = (id) => avatarColors[(id - 1) % avatarColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative flex flex-col h-full"
    >
      <div
        className="relative overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-1"
        style={{
          backgroundColor: "#FFFFFF",
          border: `1px solid ${INK_10}`,
          boxShadow: `0 18px 40px -20px ${INK}40`,
        }}
      >
        <div className="relative p-5 sm:p-6 md:p-7 flex flex-col flex-1">
          {/* Decorative quote */}
          <div className="absolute top-3 right-3 opacity-[0.08]">
            <Quote size={total === 1 ? 72 : 52} style={{ color: TEAL }} />
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-[#E0A441] text-[#E0A441]" />
            ))}
          </div>

          {/* Quote Text */}
          <p
            className="font-luxury-italic text-sm sm:text-base md:text-[15px] leading-relaxed relative z-10 flex-1 italic"
            style={{
              color: INK_60,
              display: "-webkit-box",
              WebkitLineClamp: total === 1 ? 8 : 5,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            &ldquo;{t.text}&rdquo;
          </p>

          {/* Divider */}
          <div
            className="w-full h-px my-4"
            style={{
              background: `linear-gradient(to right, transparent, ${TEAL}40, transparent)`,
            }}
          />

          {/* Author */}
          <div className="flex items-center gap-3">
            <div
              className="relative w-11 h-11 flex items-center justify-center shrink-0 text-sm font-extrabold text-white shadow-md"
              style={{
                background: getAvatarColor(t.id),
                border: `2px solid ${TEAL}`,
              }}
            >
              {t.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <h4 className="font-luxury text-base sm:text-lg font-extrabold truncate" style={{ color: INK }}>
                {t.name}
              </h4>
              <p
                className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate"
                style={{ color: TEAL }}
              >
                Verified Client
              </p>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(to right, ${TEAL}, ${DEEP_TEAL})`,
          }}
        />
      </div>
    </motion.div>
  );
};

// ============================================
// REUSABLE NAV BUTTON
// ============================================
const NavButton = ({ onClick, disabled, icon, label }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
    style={{
      backgroundColor: "#FFFFFF",
      border: `1px solid ${INK_20}`,
      color: INK,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = INK;
      e.currentTarget.style.color = CREAM;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "#FFFFFF";
      e.currentTarget.style.color = INK;
    }}
    aria-label={label}
  >
    {icon}
  </button>
);

// ============================================
// REUSABLE PROGRESS BAR
// ============================================
const ProgressCounter = ({ current, total }) => (
  <div className="flex items-center gap-3 sm:gap-4">
    <span
      className="font-luxury text-xl sm:text-2xl font-extrabold"
      style={{ color: INK }}
    >
      {String(current).padStart(2, "0")}
    </span>
    <div
      className="relative h-0.75 w-28 sm:w-40 md:w-52 overflow-hidden"
      style={{ backgroundColor: INK_10 }}
    >
      <div
        className="absolute left-0 top-0 h-full transition-all duration-500"
        style={{
          width: `${(current / total) * 100}%`,
          backgroundColor: TEAL,
        }}
      />
    </div>
    <span
      className="font-luxury text-xl sm:text-2xl font-extrabold"
      style={{ color: INK_60 }}
    >
      {String(total).padStart(2, "0")}
    </span>
  </div>
);

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const mobileIntervalRef = useRef(null);
  const desktopIntervalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Mobile: 1 card at a time
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobileDirection, setMobileDirection] = useState(1);
  const [mobileAnimating, setMobileAnimating] = useState(false);
  const mobileTotal = testimonials.length;

  // Desktop (md+): 3 cards per page
  const cardsPerPage = 3;
  const desktopTotalPages = Math.ceil(testimonials.length / cardsPerPage);
  const [desktopPage, setDesktopPage] = useState(0);
  const [desktopDirection, setDesktopDirection] = useState(1);
  const [desktopAnimating, setDesktopAnimating] = useState(false);

  const desktopTestimonials = testimonials.slice(
    desktopPage * cardsPerPage,
    desktopPage * cardsPerPage + cardsPerPage
  );

  // ---------- MOBILE AUTO ROTATE ----------
  const resetMobileRotate = useCallback(() => {
    if (mobileIntervalRef.current) clearInterval(mobileIntervalRef.current);
    mobileIntervalRef.current = setInterval(() => {
      setMobileDirection(1);
      setMobileIndex((prev) => (prev + 1) % mobileTotal);
    }, 6000);
  }, [mobileTotal]);

  const mobilePaginate = useCallback(
    (dir) => {
      if (mobileAnimating) return;
      setMobileDirection(dir);
      setMobileIndex((prev) => (prev + dir + mobileTotal) % mobileTotal);
      resetMobileRotate();
    },
    [mobileAnimating, mobileTotal, resetMobileRotate]
  );

  // ---------- DESKTOP AUTO ROTATE ----------
  const resetDesktopRotate = useCallback(() => {
    if (desktopIntervalRef.current) clearInterval(desktopIntervalRef.current);
    desktopIntervalRef.current = setInterval(() => {
      setDesktopDirection(1);
      setDesktopPage((prev) => (prev + 1) % desktopTotalPages);
    }, 7000);
  }, [desktopTotalPages]);

  const desktopPaginate = useCallback(
    (dir) => {
      if (desktopAnimating) return;
      setDesktopDirection(dir);
      setDesktopPage((prev) => (prev + dir + desktopTotalPages) % desktopTotalPages);
      resetDesktopRotate();
    },
    [desktopAnimating, desktopTotalPages, resetDesktopRotate]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    resetMobileRotate();
    resetDesktopRotate();
    return () => {
      if (mobileIntervalRef.current) clearInterval(mobileIntervalRef.current);
      if (desktopIntervalRef.current) clearInterval(desktopIntervalRef.current);
    };
  }, [isVisible, resetMobileRotate, resetDesktopRotate]);

  return (
    <>
      {/* ============ LUXURY FONT ============ */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
        rel="stylesheet"
      />
      <style jsx global>{`
        .font-luxury {
          font-family: "Playfair Display", "Cormorant Garamond", Georgia, serif;
        }
        .font-luxury-italic {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-style: italic;
        }
        .font-luxury-tracking {
          letter-spacing: 0.02em;
        }
      `}</style>

      {/* ============ NO TOP BORDER, NO BOTTOM STATS ============ */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-28"
        style={{ backgroundColor: CREAM, color: INK }}
      >
        {/* ===== BACKGROUND: subtle grid + soft glows ===== */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              backgroundImage: `linear-gradient(to right, ${INK_05} 1px, transparent 1px)`,
              backgroundSize: "calc(100% / 12) 100%",
            }}
          />
          <div
            className="absolute -top-40 -right-40 w-125 h-125 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: TEAL }}
          />
          <div
            className="absolute -bottom-40 -left-40 w-125 h-125 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: DEEP_TEAL }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ===== Header ===== */}
          <div
            className={`text-center mb-10 sm:mb-14 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Top label */}
            <span
              className="inline-block px-5 py-2 text-xs sm:text-sm uppercase tracking-[0.3em] font-extrabold mb-6"
              style={{
                backgroundColor: INK,
                color: CREAM,
              }}
            >
              ( Client Stories )
            </span>

            <h2
              className="font-luxury font-luxury-tracking text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.95] mb-5 mt-6"
              style={{ color: INK }}
            >
              What Our{" "}
              <span className="relative inline-block" style={{ color: TEAL }}>
                <span className="font-luxury-italic italic">Clients</span>
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="8"
                  viewBox="0 0 200 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 6C50 2 150 2 198 6"
                    stroke={TEAL}
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </svg>
              </span>{" "}
              Say
            </h2>

            <p
              className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
              style={{ color: INK_60 }}
            >
              Nothing means more than helping clients feel supported, informed, and
              confident throughout their move. A few of their experiences below.
            </p>
          </div>

          {/* ===== MOBILE CAROUSEL: 1 CARD ===== */}
          <div className="block md:hidden">
            <div className="relative mx-auto max-w-md">
              <div className="relative overflow-hidden min-h-110">
                <AnimatePresence initial={false} custom={mobileDirection} mode="popLayout">
                  <motion.div
                    key={testimonials[mobileIndex].id}
                    custom={mobileDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    onAnimationStart={() => setMobileAnimating(true)}
                    onAnimationComplete={() => setMobileAnimating(false)}
                    className="w-full"
                  >
                    <TestimonialCard t={testimonials[mobileIndex]} total={1} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Mobile Nav */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8">
                <NavButton
                  onClick={() => mobilePaginate(-1)}
                  disabled={mobileAnimating}
                  icon={<ChevronLeft size={18} />}
                  label="Previous"
                />
                <ProgressCounter current={mobileIndex + 1} total={mobileTotal} />
                <NavButton
                  onClick={() => mobilePaginate(1)}
                  disabled={mobileAnimating}
                  icon={<ChevronRight size={18} />}
                  label="Next"
                />
              </div>
            </div>
          </div>

          {/* ===== DESKTOP CAROUSEL: 3 CARDS ===== */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="relative overflow-hidden min-h-95">
                <AnimatePresence initial={false} custom={desktopDirection} mode="popLayout">
                  <motion.div
                    key={desktopPage}
                    custom={desktopDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    onAnimationStart={() => setDesktopAnimating(true)}
                    onAnimationComplete={() => setDesktopAnimating(false)}
                    className="w-full"
                  >
                    <div className="grid grid-cols-3 gap-5 lg:gap-7">
                      {desktopTestimonials.map((t, i) => (
                        <TestimonialCard key={t.id} t={t} index={i} total={3} />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Desktop Nav */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 mt-10">
                <NavButton
                  onClick={() => desktopPaginate(-1)}
                  disabled={desktopAnimating}
                  icon={<ChevronLeft size={18} />}
                  label="Previous"
                />
                <ProgressCounter current={desktopPage + 1} total={desktopTotalPages} />
                <NavButton
                  onClick={() => desktopPaginate(1)}
                  disabled={desktopAnimating}
                  icon={<ChevronRight size={18} />}
                  label="Next"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}