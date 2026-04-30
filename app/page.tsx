"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type LinkItem = { label: string; href: string };
type ServiceItem = { icon: string; title: string; description: string };
type CreatorItem = { handle: string; ytHandle: string; niche: string; reach: string; href: string };
type LogoItem = { name: string; href: string; image: string };
type ProductItem = { letter: string; tag: string; title: string; brand: string; price: string; image: string };
type CurrencyItem = {
  game: string;
  currency: string;
  color: string;
  glow: string;
  packs: { label: string; price: string }[];
  icon: React.ReactNode;
  href: string;
};
type CaseStudyGroup = { label: string; points: string[] };
type CaseStudy = { overview: string; approach: string; executionGroups: CaseStudyGroup[]; impact: string[] };
type CampaignItem = {
  category: string; year: string; title: string; subtitle: string;
  description: string; outcomes: string; image: string; caseStudy: CaseStudy;
};
type PersonItem = { avatar: string; role: string; name: string; handle: string; href: string; image: string };

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const navigation: LinkItem[] = [
  { label: "About", href: "#about" },
  { label: "Creators", href: "#creators" },
  { label: "Partners", href: "#partners" },
  { label: "Community", href: "#community" },
  { label: "Shop", href: "/shop" },
  { label: "Work", href: "#work" },
];

const services: ServiceItem[] = [
  { icon: "◉", title: "Community Building", description: "10,000+ active members across Discord, live events, weekly scrims, and a club culture that goes beyond the game." },
  { icon: "▶", title: "Creator Campaigns", description: "350+ creator network. End-to-end brand storytelling, integrated content, reach amplification, and performance tracking." },
  { icon: "◈", title: "Brand Activations", description: "From concept to live execution: on-ground events, digital campaigns, and post-campaign analytics. We make brands cultural moments." },
  { icon: "◻", title: "Tournaments & Events", description: "Community tournaments, brand-led gaming events, IRL pop-ups, and IP-based competition structures curated across India." },
  { icon: "◧", title: "Merchandise", description: "Premium club apparel and limited edition drops carrying the Maniac identity. Built for players, worn by the community." },
];

const creators: CreatorItem[] = [
  { handle: "Jevel", ytHandle: "Jevelu", niche: "BGMI", reach: "881K", href: "https://www.youtube.com/@Jevelu" },
  { handle: "SrishtiPlayz", ytHandle: "SrishtiPlayz", niche: "Gaming", reach: "188K", href: "https://www.youtube.com/@SrishtiPlayz" },
  { handle: "HarshKhelraay", ytHandle: "HarshKhelraay", niche: "Mobile", reach: "138K", href: "https://www.youtube.com/@HarshKhelraay" },
  { handle: "NadeFlick", ytHandle: "NadeFlick", niche: "FPS", reach: "452K", href: "https://www.youtube.com/@NadeFlick" },
  { handle: "Motato_21", ytHandle: "Motato_21", niche: "Variety", reach: "25.9K", href: "https://www.youtube.com/@Motato_21" },
  { handle: "ShivanshuFPS", ytHandle: "ShivanshuFPS", niche: "FPS", reach: "10.4K", href: "https://www.youtube.com/@ShivanshuFPS" },
];

const logos: LogoItem[] = [
  { name: "Razer", href: "https://www.razer.com", image: "/images/brands/razer.svg" },
  { name: "iQOO", href: "https://www.iqoo.com/in", image: "/images/brands/iqoo.svg" },
  { name: "Lenovo", href: "https://www.lenovo.com/in/en", image: "/images/brands/lenovo.svg" },
  { name: "Acer", href: "https://www.acer.com/in-en", image: "/images/brands/acer.svg" },
  { name: "Infinix", href: "https://www.infinixmobility.com", image: "/images/brands/infinix.svg" },
  { name: "Philips", href: "https://www.philips.co.in", image: "/images/brands/philips.svg" },
  { name: "Warrior", href: "https://www.warriorsportsindia.com", image: "/images/brands/warrior.svg" },
  { name: "Oneplay", href: "https://www.oneplay.in", image: "/images/brands/oneplay.svg" },
  { name: "Rooter", href: "https://www.rooter.gg", image: "/images/brands/rooter.svg" },
  { name: "Cadbury", href: "https://www.cadbury.co.in", image: "/images/brands/cadbury.svg" },
  { name: "Qubo", href: "https://www.quboworld.com", image: "/images/brands/qubo.svg" },
  { name: "Kreo", href: "https://kreo-tech.com", image: "/images/brands/kreo.svg" },
];

const products: ProductItem[] = [
  { letter: "M", tag: "New Drop", title: "Maniac Core Hoodie", brand: "Maniac Esports", price: "Rs. 1,299", image: "/images/merch-hoodie.svg" },
  { letter: "J", tag: "Best Seller", title: "Maniac Club Jersey", brand: "Maniac Esports", price: "Rs. 899", image: "/images/merch-jersey.svg" },
  { letter: "T", tag: "Limited", title: "Training Tee - Black", brand: "Maniac Esports", price: "Rs. 599", image: "/images/merch-tee.svg" },
];

// SVG icons for game currencies — brand-accurate shapes & colors
const VBucksIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
    <defs>
      <linearGradient id="vb1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1AABFF"/>
        <stop offset="100%" stopColor="#0066CC"/>
      </linearGradient>
      <linearGradient id="vb2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#33CCFF"/>
        <stop offset="100%" stopColor="#0088FF"/>
      </linearGradient>
    </defs>
    {/* Hexagon shape */}
    <polygon points="40,6 68,22 68,58 40,74 12,58 12,22" fill="url(#vb1)" stroke="#33CCFF" strokeWidth="1.5"/>
    {/* Inner lighter hex */}
    <polygon points="40,14 62,26 62,54 40,66 18,54 18,26" fill="url(#vb2)" opacity="0.25"/>
    {/* V shape */}
    <path d="M26 28 L40 52 L54 28" stroke="white" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    {/* Shine */}
    <ellipse cx="33" cy="26" rx="7" ry="3.5" fill="white" opacity="0.3" transform="rotate(-15 33 26)"/>
  </svg>
);

const UCIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
    <defs>
      <linearGradient id="uc1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700"/>
        <stop offset="50%" stopColor="#FF8C00"/>
        <stop offset="100%" stopColor="#FF4500"/>
      </linearGradient>
    </defs>
    <circle cx="40" cy="40" r="34" fill="url(#uc1)" stroke="#FFD700" strokeWidth="1.5"/>
    <circle cx="40" cy="40" r="27" fill="none" stroke="#FFF" strokeWidth="1" opacity="0.2"/>
    {/* Crown points */}
    <path d="M22 44 L22 32 L30 38 L40 26 L50 38 L58 32 L58 44 Z" fill="white" opacity="0.95"/>
    {/* Crown base */}
    <rect x="22" y="44" width="36" height="7" rx="2" fill="white" opacity="0.95"/>
    {/* UC text */}
    <text x="40" y="57" textAnchor="middle" fill="#FF6600" fontSize="7" fontFamily="monospace" fontWeight="bold">UC</text>
    {/* Shine */}
    <ellipse cx="30" cy="30" rx="8" ry="4" fill="white" opacity="0.25" transform="rotate(-20 30 30)"/>
  </svg>
);

const ValorantPointsIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
    <defs>
      <linearGradient id="vp1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF4655"/>
        <stop offset="100%" stopColor="#BD2E3A"/>
      </linearGradient>
    </defs>
    <rect x="6" y="6" width="68" height="68" rx="8" fill="url(#vp1)"/>
    {/* Valorant V shape — two angled blades */}
    <path d="M18 20 L40 58 L62 20 L52 20 L40 44 L28 20 Z" fill="white"/>
    {/* Inner cut */}
    <path d="M28 20 L40 41 L52 20 L44 20 L40 34 L36 20 Z" fill="#FF4655"/>
    {/* VP text at bottom */}
    <text x="40" y="72" textAnchor="middle" fill="white" fontSize="7" fontFamily="monospace" fontWeight="bold" opacity="0.8">VP</text>
  </svg>
);

const RobuxIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
    <defs>
      <linearGradient id="rb1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E8282B"/>
        <stop offset="100%" stopColor="#A01020"/>
      </linearGradient>
    </defs>
    <rect x="6" y="6" width="68" height="68" rx="12" fill="url(#rb1)"/>
    {/* Roblox R — square shape with notch */}
    <rect x="20" y="20" width="40" height="40" rx="4" fill="white"/>
    <rect x="28" y="28" width="24" height="24" rx="2" fill="#E8282B"/>
    {/* Shine */}
    <rect x="20" y="20" width="40" height="8" rx="4" fill="white" opacity="0.2"/>
  </svg>
);

const BGMIStarsIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
    <defs>
      <linearGradient id="bs1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00D4AA"/>
        <stop offset="100%" stopColor="#007755"/>
      </linearGradient>
    </defs>
    <circle cx="40" cy="40" r="34" fill="url(#bs1)" stroke="#00FFCC" strokeWidth="1"/>
    {/* Star shape */}
    <path d="M40 14 L44.9 31.9 L63.5 31.9 L49 42.6 L53.9 60.5 L40 49.8 L26.1 60.5 L31 42.6 L16.5 31.9 L35.1 31.9 Z" fill="white" opacity="0.95"/>
    <path d="M40 20 L43.7 32.5 L57 32.5 L46.5 40.2 L50.2 52.8 L40 45.1 L29.8 52.8 L33.5 40.2 L23 32.5 L36.3 32.5 Z" fill="#00D4AA"/>
  </svg>
);

const SteamIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
    <defs>
      <linearGradient id="st1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2A4B6A"/>
        <stop offset="100%" stopColor="#0D1B2B"/>
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="72" height="72" rx="14" fill="url(#st1)"/>
    {/* Steam logo paths simplified */}
    <path d="M40 16 C26.7 16 16 26.7 16 40 C16 53.3 26.7 64 40 64 C53.3 64 64 53.3 64 40 C64 26.7 53.3 16 40 16Z" fill="none" stroke="#C6D4DF" strokeWidth="2"/>
    {/* Stylized S for Steam */}
    <path d="M48 30 C48 27 45 24 40 24 C35 24 32 27 32 31 C32 35 35.5 37 40 37.5 C44.5 38 48 40 48 44 C48 48 45 51 40 51 C35 51 32 48 32 45" stroke="#C6D4DF" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
    <text x="40" y="67" textAnchor="middle" fill="#C6D4DF" fontSize="6" fontFamily="monospace" opacity="0.7">WALLET</text>
  </svg>
);

const GenesisCrystalsIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
    <defs>
      <linearGradient id="gc1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5B8DEF"/>
        <stop offset="100%" stopColor="#3B6FD3"/>
      </linearGradient>
    </defs>
    <circle cx="40" cy="40" r="34" fill="url(#gc1)" stroke="#7BA4FF" strokeWidth="1.5"/>
    {/* Crystal shape */}
    <path d="M40 16 L52 32 L48 50 L32 50 L28 32 Z" fill="white" opacity="0.9"/>
    <path d="M40 20 L48 32 L44 46 L36 46 L32 32 Z" fill="#5B8DEF" opacity="0.5"/>
    <text x="40" y="66" textAnchor="middle" fill="white" fontSize="6" fontFamily="monospace" opacity="0.7">GENESIS</text>
  </svg>
);

const MinecoinsIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
    <defs>
      <linearGradient id="mc1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#62B47A"/>
        <stop offset="100%" stopColor="#3D8B52"/>
      </linearGradient>
    </defs>
    <circle cx="40" cy="40" r="34" fill="url(#mc1)" stroke="#8ED4A6" strokeWidth="1.5"/>
    {/* Minecraft block simplified */}
    <rect x="22" y="22" width="36" height="36" rx="4" fill="white" opacity="0.9"/>
    <rect x="26" y="26" width="12" height="12" fill="#62B47A"/>
    <rect x="42" y="26" width="12" height="12" fill="#8ED4A6"/>
    <rect x="26" y="42" width="12" height="12" fill="#8ED4A6"/>
    <rect x="42" y="42" width="12" height="12" fill="#62B47A"/>
    <text x="40" y="68" textAnchor="middle" fill="white" fontSize="5" fontFamily="monospace" opacity="0.7">COINS</text>
  </svg>
);

const DiamondsIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
    <defs>
      <linearGradient id="dm1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6"/>
        <stop offset="100%" stopColor="#1D4ED8"/>
      </linearGradient>
    </defs>
    <circle cx="40" cy="40" r="34" fill="url(#dm1)" stroke="#60A5FA" strokeWidth="1.5"/>
    {/* Diamond shape */}
    <path d="M40 14 L56 40 L40 66 L24 40 Z" fill="white" opacity="0.95"/>
    <path d="M40 22 L50 40 L40 58 L30 40 Z" fill="#3B82F6" opacity="0.6"/>
    <text x="40" y="72" textAnchor="middle" fill="white" fontSize="6" fontFamily="monospace" opacity="0.8">DM</text>
  </svg>
);

const currencies: CurrencyItem[] = [
  {
    game: "BGMI",
    currency: "Unknown Cash",
    color: "#FF8C00",
    glow: "rgba(255,140,0,0.25)",
    packs: [{ label: "60 UC", price: "₹79" }, { label: "325 UC", price: "₹399" }, { label: "1,800 UC", price: "₹1,999" }],
    icon: <UCIcon />,
    href: "https://discord.com/channels/692965277532684289/1446866325463896154",
  },
  {
    game: "Genshin Impact",
    currency: "Genesis Crystals",
    color: "#5B8DEF",
    glow: "rgba(91,141,239,0.25)",
    packs: [{ label: "80 GC", price: "₹399" }, { label: "400 GC", price: "₹1,599" }, { label: "2,000 GC", price: "₹6,999" }],
    icon: <GenesisCrystalsIcon />,
    href: "https://discord.com/channels/692965277532684289/1446866325463896154",
  },
  {
    game: "Minecraft",
    currency: "Minecoins",
    color: "#62B47A",
    glow: "rgba(98,180,122,0.25)",
    packs: [{ label: "500 MC", price: "₹299" }, { label: "1,720 MC", price: "₹799" }, { label: "4,500 MC", price: "₹1,799" }],
    icon: <MinecoinsIcon />,
    href: "https://discord.com/channels/692965277532684289/1446866325463896154",
  },
  {
    game: "Mobile Legends",
    currency: "Diamonds",
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.25)",
    packs: [{ label: "70 DM", price: "₹399" }, { label: "340 DM", price: "₹1,499" }, { label: "1,710 DM", price: "₹6,499" }],
    icon: <DiamondsIcon />,
    href: "https://discord.com/channels/692965277532684289/1446866325463896154",
  },
  {
    game: "VALORANT",
    currency: "Valorant Points",
    color: "#FF4655",
    glow: "rgba(255,70,85,0.25)",
    packs: [{ label: "475 VP", price: "₹399" }, { label: "1,000 VP", price: "₹799" }, { label: "2,150 VP", price: "₹1,599" }],
    icon: <ValorantPointsIcon />,
    href: "https://discord.com/channels/692965277532684289/1446866325463896154",
  },
  {
    game: "Steam",
    currency: "Steam Wallet (INR)",
    color: "#C6D4DF",
    glow: "rgba(198,212,223,0.2)",
    packs: [{ label: "₹500", price: "₹525" }, { label: "₹1,000", price: "₹1,050" }, { label: "₹2,000", price: "₹2,099" }],
    icon: <SteamIcon />,
    href: "https://discord.com/channels/692965277532684289/1446866325463896154",
  },
];

const campaigns: CampaignItem[] = [
  {
    category: "Awareness | Community Activation",
    year: "2024",
    title: "RAZER x MANIAC",
    subtitle: "Creator-Led Awareness Campaign",
    description: "Maniac partnered with Razer to drive awareness for the Razer Iskur chair and BlackShark headphones through creator-led content across India's gaming community.",
    outcomes: "5M+ impressions · Strong community engagement · Razer Iskur & BlackShark V2",
    image: "/images/campaigns/razer-campaign.svg",
    caseStudy: {
      overview: "Maniac partnered with Razer to drive awareness for the Razer Iskur chair and BlackShark headphones through creator-led content across India's gaming community.",
      approach: "We activated top PC and mobile gaming creators to organically integrate Razer into their daily content — making the products part of real gameplay, not just promotions.",
      executionGroups: [
        { label: "Creators", points: ["Jevel", "SrishtiPlayz", "+ others"] },
        { label: "Content Formats", points: ["Unboxings", "Reviews", "Daily live streams"] },
        { label: "Platforms", points: ["Instagram Reels", "YouTube Live"] },
      ],
      impact: ["5M+ impressions", "Strong community engagement through authentic creator content", "Increased visibility within core gaming audiences"],
    },
  },
  {
    category: "Product Launch | Adoption & Scale",
    year: "2024",
    title: "iQOO x MANIAC",
    subtitle: "High-Impact Launch & Adoption",
    description: "Maniac partnered with iQOO to launch the Neo 10 & Neo 13, combining digital content with on-ground experiences to drive adoption at scale.",
    outcomes: "80M+ impressions · 20,000+ attendees · 20 gaming creators",
    image: "/images/campaigns/iqoo-campaign.svg",
    caseStudy: {
      overview: "Maniac partnered with iQOO to launch the Neo 10 & Neo 13, combining digital content with on-ground experiences to drive adoption.",
      approach: "A full-funnel campaign blending creator content, live engagement, and real-world gameplay experiences.",
      executionGroups: [
        { label: "Digital (2 Months)", points: ["20 gaming creators", "Reels, stories, and daily live streams"] },
        { label: "On-Ground — BGMI LAN Event", points: ["11 creators hosted IRL meetups", "20,000+ attendees", "Creator zones with fan interactions", "Live gameplay on iQOO devices"] },
      ],
      impact: ["80M+ impressions", "Massive community turnout and engagement", "Hands-on product experience at scale", "Strong contribution to product adoption in India"],
    },
  },
  {
    category: "Product Launch | Brand Activation",
    year: "2024",
    title: "KREO GAME DROP",
    subtitle: "Interactive Product Drop",
    description: "Maniac partnered with Kreo to launch their Naruto Edition peripherals and new gaming chairs through creator-driven engagement and live interactive content.",
    outcomes: "2M+ impressions · 10+ PC gaming creators · High launch engagement",
    image: "/images/campaigns/kreo-campaign.svg",
    caseStudy: {
      overview: "Maniac partnered with Kreo to launch their Naruto Edition peripherals and new gaming chairs through creator-driven engagement.",
      approach: "We used live, interactive content to educate users while building hype during launch.",
      executionGroups: [
        { label: "Execution", points: ["10+ PC gaming creators", "Live streams featuring gameplay + product reviews"] },
        { label: "Audience Engagement", points: ["Sub-games", "Community challenges", "Giveaways"] },
      ],
      impact: ["2M+ impressions", "High engagement during launch phase", "Strong visibility across gaming audiences"],
    },
  },
];

const people: PersonItem[] = [
  { avatar: "RS", role: "Founder", name: "Rajdip Sarkar", handle: "", href: "https://www.instagram.com/maniacesports.in/", image: "/images/people/rajdip.png" },
  { avatar: "NK", role: "Co-Founder", name: "Nitin Kumar", handle: "", href: "https://www.instagram.com/maniacesports.in/", image: "/images/people/nitin.png" },
  { avatar: "DH", role: "COO", name: "Damodar Hegde", handle: "", href: "https://www.instagram.com/maniacesports.in/", image: "/images/people/damodar.png" },
  { avatar: "RJ", role: "Brand Director", name: "Roshan Jakhar", handle: "", href: "https://www.instagram.com/maniacesports.in/", image: "/images/people/roshan.png" },
  { avatar: "SS", role: "Technical Lead", name: "Shakib S.", handle: "", href: "https://www.instagram.com/maniacesports.in/", image: "/images/people/shakib.png" },
  { avatar: "RV", role: "Sr. Community Manager", name: "Rahul Vyas", handle: "", href: "https://www.instagram.com/maniacesports.in/", image: "/images/people/rahul.png" },
  { avatar: "AB", role: "Community Manager", name: "Ansh Bhardwaj", handle: "", href: "https://www.instagram.com/maniacesports.in/", image: "/images/people/ansh.png" },
  { avatar: "DV", role: "Marketing PR Analyst", name: "Devansh", handle: "", href: "https://www.instagram.com/maniacesports.in/", image: "/images/people/devansh.png" },
  { avatar: "SB", role: "Production Lead", name: "Shubham Biswas", handle: "", href: "https://www.instagram.com/maniacesports.in/", image: "/images/people/shubham.png" },
];

const tickerItems = ["BGMI","·","Valorant","·","CS2","·","Creator Campaigns","·","Brand Activations","·","Community Events","·","350+ Creators","·","Maniac Esports","·","India's Gaming Generation","·"];
const communityPills = ["Weekly Scrims","Community Tournaments","Creator Updates","Watch Parties","Discord Events","Club Culture","Gaming Drops","Member Highlights"];

/* ─────────────────────────────────────────────
   Creator avatar with real YouTube photo + fallback
───────────────────────────────────────────── */
function CreatorAvatar({ ytHandle, initials }: { ytHandle: string; initials: string }) {
  const [failed, setFailed] = useState(false);
  const src = `https://unavatar.io/youtube/${ytHandle}`;
  if (failed) {
    return <div className="creator-avatar-fallback">{initials}</div>;
  }
  return (
    <img
      src={src}
      alt={ytHandle}
      className="creator-avatar-img"
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [activeSection, setActiveSection] = useState("#about");
  const [activeCampaign, setActiveCampaign] = useState<CampaignItem | null>(null);
  const heroPanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const statCards = Array.from(document.querySelectorAll<HTMLElement>(".stat-card"));
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id], footer[id]"));

    document.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
      if (img.complete) { img.classList.add("loaded"); }
      else { img.addEventListener("load", () => img.classList.add("loaded"), { once: true }); }
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!cursor || window.matchMedia("(hover: none)").matches) return;
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrollWidth(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0);
      setScrolled(window.scrollY > 40);
    };

    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revealObserver.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => revealObserver.observe(el));

    const heroTimer = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>("#hero .reveal").forEach((el) => el.classList.add("in"));
    }, 100);

    const animateCounter = (el: HTMLElement, target: number, suffix = "+") => {
      let start = 0;
      const step = (ts: number) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / 1800, 1);
        const eased = 1 - (1 - progress) ** 3;
        el.textContent = `${Math.floor(eased * target).toLocaleString("en-IN")}${suffix}`;
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target.querySelector<HTMLElement>("[data-count]");
        if (el) animateCounter(el, Number.parseInt(el.dataset.count ?? "0", 10), el.dataset.suffix ?? "+");
        counterObserver.unobserve(e.target);
      });
    }, { threshold: 0.5 });
    statCards.forEach((c) => counterObserver.observe(c));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveSection(`#${e.target.id}`); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach((s) => sectionObserver.observe(s));

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(heroTimer);
      revealObserver.disconnect(); counterObserver.disconnect(); sectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = (mobileMenuOpen || !!activeCampaign) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen, activeCampaign]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveCampaign(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleHeroMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const panel = heroPanelRef.current; if (!panel) return;
    const rect = panel.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    panel.style.transition = "transform 0.1s linear";
    panel.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
  };
  const handleHeroMouseLeave = () => {
    const panel = heroPanelRef.current; if (!panel) return;
    panel.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
    panel.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <>
      <a href="#about" className="skip-link">Skip to content</a>
      <main className="maniac-page">
        <div id="cursor" aria-hidden="true" />
        <div id="scroll-bar" style={{ width: `${scrollWidth}%` }} aria-hidden="true" />

        {/* ── Case Study Modal ── */}
        {activeCampaign && (
          <div
            className="cs-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeCampaign.title} Case Study`}
            onClick={(e) => { if (e.target === e.currentTarget) setActiveCampaign(null); }}
          >
            <div className="cs-modal">
              <button className="cs-close" onClick={() => setActiveCampaign(null)} aria-label="Close modal">
                <svg viewBox="0 0 14 14" fill="none" width="14" height="14"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
              <img src={activeCampaign.image} alt={`${activeCampaign.title} artwork`} className="cs-hero-img" />
              <div className="cs-body">
                <div className="cs-meta">
                  <span className="tag">{activeCampaign.category}</span>
                  <span className="campaign-year">{activeCampaign.year}</span>
                </div>
                <div className="cs-title">{activeCampaign.title}</div>
                <div className="cs-subtitle">{activeCampaign.subtitle}</div>

                <div className="cs-section">
                  <div className="cs-section-label">Overview</div>
                  <p className="cs-text">{activeCampaign.caseStudy.overview}</p>
                </div>
                <div className="cs-section">
                  <div className="cs-section-label">Approach</div>
                  <p className="cs-text">{activeCampaign.caseStudy.approach}</p>
                </div>
                <div className="cs-section">
                  <div className="cs-section-label">Execution</div>
                  <div className="cs-exec-grid">
                    {activeCampaign.caseStudy.executionGroups.map((g) => (
                      <div className="cs-exec-group" key={g.label}>
                        <div className="cs-exec-label">{g.label}</div>
                        <ul className="cs-exec-list">
                          {g.points.map((p) => <li key={p}>{p}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="cs-section">
                  <div className="cs-section-label">Impact</div>
                  <div className="cs-impact-grid">
                    {activeCampaign.caseStudy.impact.map((item) => (
                      <div className="cs-impact-item" key={item}>
                        <span className="cs-impact-dot" />{item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="cs-outcomes">{activeCampaign.outcomes}</div>
                <a href="https://www.instagram.com/maniacesports.in/" target="_blank" rel="noreferrer" className="btn btn-primary cs-cta">
                  Partner With Maniac
                  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── Navbar ── */}
        <nav id="navbar" className={scrolled ? "scrolled" : ""} aria-label="Primary">
          <div className="container">
            <a href="#hero" className="nav-logo" aria-label="Maniac Esports home">
              <img src="/images/maniac-logo.svg" alt="Maniac Esports logo" className="nav-logo-icon" />
            </a>
            <ul className="nav-links">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={activeSection === item.href ? "active" : ""}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="nav-ctas">
              <a href="#partners" className="btn btn-ghost nav-btn">Partner With Us</a>
              <a href="#community" className="btn btn-primary nav-btn">Join Community</a>
            </div>
            <button className={`hamburger ${mobileMenuOpen ? "open" : ""}`} id="hamburger" aria-label="Menu" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((v) => !v)}>
              <span /><span /><span />
            </button>
          </div>
        </nav>

        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`} id="mobileMenu">
          {navigation.map((item) => <a key={item.href} href={item.href} onClick={closeMobileMenu}>{item.label}</a>)}
          <div className="mob-ctas">
            <a href="#partners" className="btn btn-outline" onClick={closeMobileMenu}>Partner With Us</a>
            <a href="#community" className="btn btn-primary" onClick={closeMobileMenu}>Join Community</a>
          </div>
        </div>

        {/* ── Hero ── */}
        <section id="hero" aria-labelledby="hero-title">
          <div className="grid-bg" aria-hidden="true" />
          <div className="glow glow-1" aria-hidden="true" />
          <div className="glow glow-2" aria-hidden="true" />
          <div className="container">
            <div className="hero-inner">
              <div className="hero-copy">
                <div className="hero-eyebrow reveal">
                  <span className="dot" />
                  <span className="pill">India&apos;s #1 Gaming Club</span>
                </div>
                <h1 id="hero-title" className="hero-h1 reveal reveal-delay-1">
                  Your Gateway
                  <span className="line-accent">to the Gaming</span>
                  <span className="line-dim">Generation.</span>
                </h1>
                <p className="hero-sub reveal reveal-delay-2">
                  Founded in 2018, Maniac Esports is dedicated to delivering the ultimate competitive gaming experience for talented players through tournaments, creator-led culture, and brand partnerships like Hydra Elites, Streamer Showdowns, and T1 scrims.
                </p>
                <div className="hero-ctas reveal reveal-delay-3">
                  <a href="#creators" className="btn btn-primary">
                    Explore Creators
                    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                  <a href="#community" className="btn btn-outline">Join Community</a>
                  <a href="#partners" className="btn btn-ghost">Partner With Us</a>
                </div>
              </div>
              <div className="hero-visual reveal reveal-delay-2">
                <div ref={heroPanelRef} className="hero-panel" onMouseMove={handleHeroMouseMove} onMouseLeave={handleHeroMouseLeave}>
                  <div className="corner-mark tl" /><div className="corner-mark tr" /><div className="corner-mark bl" /><div className="corner-mark br" />
                  <div className="hero-panel-inner">
                    <video className="hero-panel-video" src="/videos/maniac-esports-intro.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Maniac Esports intro video" />
                    <div className="hero-panel-text">M</div>
                    <div className="hero-panel-meta"><div className="hero-panel-kicker">Intro Video / Club Visual</div></div>
                  </div>
                  <div className="hero-panel-badge"><strong>Live</strong>Campaign Season 2025</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Ticker ── */}
        <div id="ticker" aria-hidden="true">
          <div className="ticker-inner">
            {Array.from({ length: 4 }).map((_, i) => (
              <div className="ticker-item" key={i}>
                {tickerItems.map((item, j) =>
                  item === "·" ? <span className="ticker-sep" key={`${i}-${j}`}>·</span> : <span key={`${i}-${j}`}>{item}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <section id="statsbar" aria-label="Key statistics">
          <div className="statsbar-track">
            <div className="stat-card reveal"><div className="num">2018</div><div className="label">Founded</div></div>
            <div className="stat-card reveal reveal-delay-1"><div className="num" data-count="350">0</div><div className="label">Creator Network</div></div>
            <div className="stat-card reveal reveal-delay-2"><div className="num" data-count="30">0</div><div className="label">Brand Campaigns</div></div>
            <div className="stat-card reveal reveal-delay-3"><div className="num">500M+</div><div className="label">Campaign Reach</div></div>
            <div className="stat-card reveal reveal-delay-4"><div className="num" data-count="10000">0</div><div className="label">Community Members</div></div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" aria-labelledby="about-title">
          <div className="glow glow-1" aria-hidden="true" />
          <div className="container">
            <div className="about-grid">
              <div className="about-visual reveal">
                <div className="about-img-wrap">
                  <img src="/images/about-club.svg" alt="Maniac Esports community" className="about-image" decoding="async" />
                </div>
                <div className="about-badge"><strong>7+</strong><span>Years in Gaming</span></div>
              </div>
              <div>
                <div className="section-label reveal">Our Story</div>
                <h2 id="about-title" className="about-h2 reveal reveal-delay-1">Shaping the<em>Creative Frontier</em>in Gaming.</h2>
                <p className="about-body reveal reveal-delay-2">Founded in 2018, Maniac Esports is dedicated to delivering the ultimate competitive gaming experience for talented players. The mission extends beyond gaming itself. It is a pursuit of greatness through tournaments, team building, and brand partnerships that create real opportunity.</p>
                <p className="about-body reveal reveal-delay-3">Events like Hydra Elites, Streamer Showdowns, and T1 scrims define the club&apos;s approach: competitive structure, creator energy, and a community that invites dreamers to help redefine India&apos;s esports landscape.</p>
                <div className="about-pills reveal reveal-delay-4">
                  {["Community First","Player Led","Brand Ready","India Born","Creator Network"].map((pill) => <span className="about-pill" key={pill}>{pill}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Creators ── */}
        <section id="creators" aria-labelledby="creators-title">
          <div className="glow glow-1" aria-hidden="true" />
          <div className="container creators-shell">
            <div className="creators-layout">
              <div className="creators-left">
                <div className="section-label reveal">Creator Network</div>
                <h2 id="creators-title" className="creators-h2 reveal reveal-delay-1">350+ Creators.<br /><span>One Voice.</span></h2>
                <p className="creators-body reveal reveal-delay-2">Maniac&apos;s creator network spans BGMI, Valorant, variety gaming, and pure content. We power brand activations, community reach, and gaming culture storytelling at scale across YouTube, Instagram, and beyond.</p>
                <div className="creators-stats reveal reveal-delay-3">
                  <div className="c-stat"><strong>350+</strong><span>Active Creators</span></div>
                  <div className="stat-divider" />
                  <div className="c-stat"><strong>500M+</strong><span>Combined Reach</span></div>
                  <div className="stat-divider" />
                  <div className="c-stat"><strong>30+</strong><span>Brands Served</span></div>
                </div>
                <div className="reveal reveal-delay-4">
                  <a href="https://www.youtube.com/@maniacesports.official" target="_blank" rel="noreferrer" className="btn btn-primary">
                    Explore Creator Network
                    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </div>
              <div>
                <a href="https://www.youtube.com/@maniacesports.official" target="_blank" rel="noreferrer" className="creators-feature-image reveal">
                  <img src="/images/creator-network.svg" alt="Maniac creator network" className="creators-feature-media" loading="lazy" decoding="async" />
                </a>
                <div className="creators-grid">
                  {creators.map((creator, index) => (
                    <a className={`creator-card reveal ${index ? `reveal-delay-${Math.min(index, 6)}` : ""}`} key={creator.handle} href={creator.href} target="_blank" rel="noreferrer">
                      <div className="creator-avatar-wrap">
                        <CreatorAvatar ytHandle={creator.ytHandle} initials={creator.handle.charAt(0).toUpperCase()} />
                        <div className="creator-yt-badge" aria-label="YouTube">
                          <svg viewBox="0 0 24 24" fill="white" width="8" height="8"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        </div>
                      </div>
                      <div className="creator-handle">@{creator.handle}</div>
                      <div className="creator-niche">{creator.niche}</div>
                      <div className="creator-reach">{creator.reach}</div>
                      <div className="creator-reach-label">Subscribers</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Partners ── */}
        <section id="partners" aria-labelledby="partners-title">
          <div className="glow glow-1" aria-hidden="true" />
          <div className="container partners-shell">
            <div className="partners-header">
              <div className="section-label centered reveal">Our Clients</div>
              <h2 id="partners-title" className="partners-h2 reveal reveal-delay-1">Brands That Trust<span>Maniac.</span></h2>
              <p className="partners-sub reveal reveal-delay-2">From product launches to live events and creator-led campaigns, we connect brands with India&apos;s most engaged gaming communities.</p>
            </div>
            <div className="logo-wall">
              {logos.map((logo, index) => (
                <a className={`logo-item reveal ${index % 6 ? `reveal-delay-${Math.min(index % 6, 6)}` : ""}`} key={logo.name} href={logo.href} target="_blank" rel="noreferrer">
                  <img src={logo.image} alt={`${logo.name} logo`} className="logo-image" loading="lazy" decoding="async" />
                  <span className="logo-name">{logo.name}</span>
                </a>
              ))}
            </div>
            <div className="partners-bottom">
              <p className="partners-claim reveal">Trusted by 30+ brands across gaming, tech, FMCG, and consumer electronics. Campaign outcomes tracked. ROI delivered.</p>
              <a href="https://www.instagram.com/maniacesports.in/" target="_blank" rel="noreferrer" className="btn btn-primary reveal reveal-delay-1">
                See Partnership Opportunities
                <svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section id="services">
          <div className="container">
            <div className="services-header">
              <div>
                <div className="section-label reveal">What We Do</div>
                <h2 className="services-h2 reveal reveal-delay-1">One Ecosystem.<span>Five Capabilities.</span></h2>
              </div>
              <a href="#partners" className="btn btn-ghost reveal reveal-delay-2">Work With Us</a>
            </div>
            <div className="services-grid">
              {services.map((service, index) => (
                <a className={`service-card reveal ${index ? `reveal-delay-${Math.min(index, 6)}` : ""}`} key={service.title} href="#partners">
                  <div className="service-icon">{service.icon}</div>
                  <div className="service-title">{service.title}</div>
                  <p className="service-desc">{service.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Community ── */}
        <section id="community" aria-labelledby="community-title">
          <div className="glow glow-1" aria-hidden="true" />
          <div className="grid-bg" aria-hidden="true" />
          <div className="container community-shell">
            <div className="community-inner">
              <div className="section-label centered reveal">Community</div>
              <h2 id="community-title" className="community-h2 reveal reveal-delay-1">Community Isn&apos;t a Feature.<em>It&apos;s the Brand.</em></h2>
              <p className="community-sub reveal reveal-delay-2">10,000+ members. Active Discord. Weekly scrims and tournaments. Creator drops, watch parties, and a club mentality that shows up on and off the server.</p>
              <div className="community-ctas reveal reveal-delay-3">
                <a href="https://discord.com/channels/692965277532684289/1446866325463896154" target="_blank" rel="noreferrer" className="discord-btn">
                  <svg viewBox="0 0 18 14" fill="none" aria-hidden="true"><path d="M15.25 1.5A15.3 15.3 0 0 0 11.5.5a10.5 10.5 0 0 0-.5 1A14.2 14.2 0 0 0 5 1.5a10.5 10.5 0 0 0-.5-1A15.3 15.3 0 0 0 .75 1.5C-.5 5.5-.25 9.4 1 12c1.25.9 2.5 1.5 3.75 1.5l.75-1a10 10 0 0 1-2.25-1c.2-.15.4-.3.55-.45a10.9 10.9 0 0 0 9.4 0c.15.15.35.3.55.45A10 10 0 0 1 11.5 12.5l.75 1C13.5 13.5 14.75 12.9 16 12c1.25-2.6 1.5-6.5.25-10.5Z" fill="currentColor"/></svg>
                  Join Discord
                </a>
                <a href="https://www.instagram.com/maniacesports.in/" target="_blank" rel="noreferrer" className="btn btn-primary">BeManiac</a>
                <a href="#work" className="btn btn-ghost">View Events</a>
              </div>
              <a href="https://discord.com/channels/692965277532684289/1446866325463896154" target="_blank" rel="noreferrer" className="community-feature reveal reveal-delay-4">
                <img src="/images/community-banner.svg" alt="Maniac Esports community" className="community-feature-image" loading="lazy" decoding="async" />
              </a>
              <div className="community-pills reveal reveal-delay-4">
                {communityPills.map((pill) => <span className="comm-pill" key={pill}>{pill}</span>)}
              </div>
            </div>
          </div>
        </section>

        {/* ── Shop — In-Game Currency Store ── */}
        <section id="shop" aria-labelledby="shop-title">
          <div className="glow glow-shop" aria-hidden="true" />
          <div className="container">
            <div className="shop-header">
              <div>
                <div className="section-label reveal">In-Game Store</div>
                <h2 id="shop-title" className="shop-h2 reveal reveal-delay-1">Buy <span>In-Game Currency.</span></h2>
              </div>
              <div className="shop-actions reveal reveal-delay-2">
                <span className="shop-note">Instant Delivery</span>
                <a href="/shop" className="btn btn-ghost">
                  View All
                  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>

            <div className="currency-grid">
              {currencies.map((item, index) => (
                <a
                  className={`currency-card reveal ${index ? `reveal-delay-${Math.min(index, 6)}` : ""}`}
                  key={item.currency}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ "--currency-color": item.color, "--currency-glow": item.glow } as React.CSSProperties}
                >
                  <div className="currency-visual">
                    <div className="currency-glow-bg" />
                    <div className="currency-icon-wrap">{item.icon}</div>
                    <div className="currency-game-label">{item.game}</div>
                  </div>
                  <div className="currency-info">
                    <div className="currency-name">{item.currency}</div>
                    <div className="currency-packs">
                      {item.packs.map((pack) => (
                        <div className="currency-pack" key={pack.label}>
                          <span className="pack-label">{pack.label}</span>
                          <span className="pack-price">{pack.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="currency-buy-btn">
                      Buy on Discord
                      <svg viewBox="0 0 14 14" fill="none" width="10" height="10" aria-hidden="true"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <p className="shop-disclaimer">All top-ups delivered via Discord. Join our server and open a ticket. Safe · Fast · Trusted by 10,000+ members.</p>
          </div>
        </section>

        {/* ── Merch (locked) ── */}
        <section id="merch" aria-labelledby="merch-title">
          <div className="container">
            <div className="shop-header">
              <div>
                <div className="section-label reveal">Merch Store</div>
                <h2 id="merch-title" className="shop-h2 reveal reveal-delay-1">Wear <span>the Club.</span></h2>
              </div>
              <div className="shop-actions reveal reveal-delay-2">
                <span className="shop-note">Dropping Soon</span>
              </div>
            </div>

            <div className="merch-locked-wrap">
              <div className="merch-grid merch-blurred" aria-hidden="true">
                {products.map((product, index) => (
                  <div className={`merch-card reveal ${index ? `reveal-delay-${Math.min(index, 6)}` : ""}`} key={product.title}>
                    <div className="merch-visual">
                      <img src={product.image} alt={product.title} className="merch-image" loading="lazy" decoding="async" />
                      <div className="merch-visual-letter">{product.letter}</div>
                      <div className="merch-tag">{product.tag}</div>
                    </div>
                    <div className="merch-info">
                      <div><div className="merch-name">{product.title}</div><div className="merch-brand">{product.brand}</div></div>
                      <div className="merch-price">{product.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="merch-lock-overlay">
                <div className="merch-lock-icon">
                  <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="16" r="1.5" fill="currentColor"/></svg>
                </div>
                <div className="merch-lock-title">Merch Dropping Soon</div>
                <div className="merch-lock-sub">Exclusive Maniac drops on the way. Stay tuned.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Work / Campaigns ── */}
        <section id="work" aria-labelledby="work-title">
          <div className="glow glow-1" aria-hidden="true" />
          <div className="container work-shell">
            <div className="work-header">
              <div>
                <div className="section-label reveal">Featured Work</div>
                <h2 id="work-title" className="work-h2 reveal reveal-delay-1">Campaigns That<span>Move the Needle.</span></h2>
              </div>
              <a href="https://www.instagram.com/maniacesports.in/" target="_blank" rel="noreferrer" className="btn btn-ghost reveal reveal-delay-2">View Case Studies</a>
            </div>
            <div className="campaigns-grid">
              {campaigns.map((campaign, index) => (
                <button
                  className={`campaign-card reveal ${index ? `reveal-delay-${Math.min(index, 6)}` : ""}`}
                  key={campaign.title}
                  type="button"
                  onClick={() => setActiveCampaign(campaign)}
                >
                  <img src={campaign.image} alt={`${campaign.title} campaign`} className="campaign-image" loading="lazy" decoding="async" />
                  <div className="campaign-cat">
                    <span className="tag">{campaign.category}</span>
                    <span className="campaign-year">{campaign.year}</span>
                  </div>
                  <div className="campaign-title">{campaign.title}</div>
                  <p className="campaign-desc">{campaign.description}</p>
                  <div className="campaign-outcomes">{campaign.outcomes}</div>
                  <div className="campaign-arrow">Read Case Study <span>→</span></div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section id="leadership" aria-labelledby="leadership-title">
          <div className="container">
            <div className="section-label reveal">The Team</div>
            <h2 id="leadership-title" className="leadership-h2 reveal reveal-delay-1">The People <span>Behind the Club.</span></h2>
            <div className="team-people-grid">
              {people.map((person, index) => (
                <a className={`person-card reveal ${index ? `reveal-delay-${Math.min(index, 6)}` : ""}`} key={person.name} href={person.href} target="_blank" rel="noreferrer">
                  <img src={person.image} alt={person.name} className="person-image" loading="lazy" decoding="async" />
                  <div className="person-avatar">{person.avatar}</div>
                  <div className="person-role">{person.role}</div>
                  <div className="person-name">{person.name}</div>
                  {person.handle && <div className="person-handle">— {person.handle}</div>}
                </a>
              ))}
            </div>
            <div className="team-ig-cta reveal">
              <a href="https://www.instagram.com/maniacesports.in/" target="_blank" rel="noreferrer" className="btn btn-outline">
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                Follow @maniacesports.in
              </a>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer id="footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                <div className="footer-logo">
                  <a href="#hero" className="footer-brand" aria-label="Back to top">
                    <img src="/images/maniac-logo.svg" alt="Maniac Esports logo" className="footer-logo-icon" />
                  </a>
                </div>
                <p className="footer-tagline">Founded in 2018, Maniac Esports builds competitive opportunities through tournaments, creator culture, and brand partnerships for India&apos;s gaming generation.</p>
                <div className="footer-socials">
                  {/* YouTube */}
                  <a className="social-btn" title="YouTube" href="https://www.youtube.com/@maniacesports.official" target="_blank" rel="noreferrer" aria-label="YouTube">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  {/* Instagram */}
                  <a className="social-btn" title="Instagram" href="https://www.instagram.com/maniacesports.in" target="_blank" rel="noreferrer" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  </a>
                  {/* Discord */}
                  <a className="social-btn" title="Discord" href="https://discord.com/channels/692965277532684289/1446866325463896154" target="_blank" rel="noreferrer" aria-label="Discord">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true"><path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/></svg>
                  </a>
                </div>
              </div>
              <div>
                <div className="footer-col-title">Navigation</div>
                <div className="footer-links">
                  {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
                </div>
              </div>
              <div>
                <div className="footer-col-title">Company</div>
                <div className="footer-links">
                  {["Careers","Press Kit","Privacy Policy","Terms & Conditions","Cookie Policy"].map((item) => <a href="#footer" key={item}>{item}</a>)}
                </div>
              </div>
              <div>
                <div className="footer-col-title">Get In Touch</div>
                <div className="footer-contact">
                  <p>Partnerships &amp; general inquiries:</p>
                  <a href="mailto:contact@maniacesports.com">contact@maniacesports.com</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <span className="footer-copy">© 2025 Maniac Esports. All Rights Reserved.</span>
              <span className="footer-made">Built for the community · India</span>
              <span className="footer-developed">
                Developed by <a href="https://github.com/workspace-dex" target="_blank" rel="noreferrer">Shakib S.</a> ♥️
              </span>
            </div>
          </div>
        </footer>
      </main>

      {/* ─── Global Styles ─── */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap");

        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --bg:#060608;--bg2:#0a0a0e;--surface:#0f0f15;--surface2:#141420;
          --border:rgba(255,255,255,0.07);--border-strong:rgba(255,255,255,0.14);
          --accent:#ff29ea;--accent2:#7c3aed;--accent-dim:rgba(224,64,251,0.12);--accent-glow:rgba(224,64,251,0.25);
          --text:#f0f0f8;--text-muted:rgba(240,240,248,0.45);--text-dim:rgba(240,240,248,0.25);--white:#ffffff;
          --font-display:"Bebas Neue",sans-serif;--font-body:"Syne",sans-serif;--font-mono:"DM Mono",monospace;
          --ease:cubic-bezier(0.22,1,0.36,1);--radius:2px;
        }
        html{scroll-behavior:smooth}
        body{background:var(--bg);color:var(--text);font-family:var(--font-body);-webkit-font-smoothing:antialiased;overflow-x:hidden}
        a{text-decoration:none;color:inherit}
        img{display:block;max-width:100%;opacity:0;transition:opacity 0.5s var(--ease)}
        img.loaded{opacity:1}
        img{animation:fadeIn 0.5s var(--ease) forwards}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        button{cursor:pointer;font-family:inherit;border:none}
        a:focus-visible,button:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

        .skip-link{position:fixed;top:12px;left:16px;z-index:400;padding:10px 14px;background:var(--accent);color:var(--white);font-family:var(--font-mono);font-size:10px;letter-spacing:0.16em;text-transform:uppercase;transform:translateY(-140%);transition:transform 0.2s var(--ease)}
        .skip-link:focus-visible{transform:translateY(0)}
        section[id],footer[id]{scroll-margin-top:88px}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--accent);border-radius:2px}

        .container{max-width:1280px;margin:0 auto;padding:0 40px}
        @media(max-width:768px){.container{padding:0 20px}}

        .section-label{display:inline-flex;align-items:center;gap:10px;font-family:var(--font-mono);font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:var(--accent);margin-bottom:16px}
        .section-label.centered{justify-content:center}
        .section-label::before{content:"";display:block;width:24px;height:1px;background:var(--accent)}
        .tag{display:inline-block;font-family:var(--font-mono);font-size:9px;letter-spacing:0.22em;text-transform:uppercase;padding:5px 10px;border:1px solid var(--border-strong);color:var(--text-muted);border-radius:var(--radius)}

        .btn{display:inline-flex;align-items:center;gap:8px;padding:13px 24px;font-family:var(--font-body);font-size:13px;font-weight:600;letter-spacing:0.04em;border-radius:var(--radius);transition:all 0.25s var(--ease);cursor:pointer;border:none}
        .btn-primary{background:var(--accent);color:#fff}.btn-primary:hover{background:rgba(224,64,251,0.85);transform:translateY(-1px)}
        .btn-outline{background:transparent;color:var(--text);border:1px solid var(--border-strong)}.btn-outline:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-1px)}
        .btn-ghost{background:transparent;color:var(--text-muted);border:1px solid var(--border)}.btn-ghost:hover{border-color:var(--border-strong);color:var(--text)}
        .btn svg{width:14px;height:14px;transition:transform 0.2s}.btn:hover svg{transform:translateX(2px)}

        body::before{content:"";position:fixed;inset:0;z-index:0;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");opacity:0.4}
        .grid-bg{position:absolute;inset:0;pointer-events:none;overflow:hidden;background-image:linear-gradient(rgba(224,64,251,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(224,64,251,0.03) 1px,transparent 1px);background-size:72px 72px}
        .glow{position:absolute;border-radius:50%;pointer-events:none;filter:blur(120px);mix-blend-mode:screen}

        .reveal{opacity:0;transform:translateY(28px);transition:opacity 0.7s var(--ease),transform 0.7s var(--ease)}.reveal.in{opacity:1;transform:translateY(0)}
        .reveal-delay-1{transition-delay:0.1s}.reveal-delay-2{transition-delay:0.18s}.reveal-delay-3{transition-delay:0.26s}.reveal-delay-4{transition-delay:0.34s}.reveal-delay-5{transition-delay:0.42s}.reveal-delay-6{transition-delay:0.5s}

        /* ── Navbar ── */
        #navbar{position:fixed;top:0;left:0;right:0;z-index:100;height:64px;display:flex;align-items:center;transition:background 0.3s,border-color 0.3s;border-bottom:1px solid transparent}
        #navbar.scrolled{background:rgba(6,6,8,0.92);backdrop-filter:blur(16px);border-color:var(--border)}
        #navbar .container{display:flex;align-items:center;justify-content:space-between;width:100%}
        .nav-logo{display:inline-flex;align-items:center;justify-content:center}.nav-logo-icon{width:64px;height:auto;display:block;filter:brightness(0) invert(1)}
        .nav-links{display:flex;align-items:center;gap:28px;list-style:none}
        .nav-links a{font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);transition:color 0.2s;font-weight:500}
        .nav-links a:hover{color:var(--white)}.nav-links a.active{color:var(--accent)}
        .nav-ctas{display:flex;align-items:center;gap:10px}.nav-btn{padding:9px 18px;font-size:12px}
        .hamburger{display:none;background:none;border:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px}
        .hamburger span{display:block;width:22px;height:1.5px;background:var(--text);transition:all 0.25s}
        .hamburger.open span:nth-child(1){transform:rotate(45deg) translate(4.5px,4.5px)}
        .hamburger.open span:nth-child(2){opacity:0}
        .hamburger.open span:nth-child(3){transform:rotate(-45deg) translate(4.5px,-4.5px)}
        .mobile-menu{display:none;position:fixed;top:64px;left:0;right:0;z-index:99;background:rgba(6,6,8,0.97);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:24px 20px 28px;flex-direction:column;gap:0}
        .mobile-menu.open{display:flex}
        .mobile-menu a{padding:13px 0;border-bottom:1px solid var(--border);font-size:14px;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);font-weight:500}
        .mobile-menu a:last-child{border-bottom:none}
        .mobile-menu .mob-ctas{display:flex;flex-direction:column;gap:8px;margin-top:16px}
        @media(max-width:900px){.nav-links{display:none}.nav-ctas .btn:first-child{display:none}.hamburger{display:flex}}
        @media(max-width:480px){.nav-ctas{display:none}}

        /* ── Hero ── */
        #hero{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;padding-top:64px}
        #hero .grid-bg{opacity:0.7}
        #hero .glow-1{width:700px;height:700px;background:radial-gradient(circle,var(--accent) 0%,transparent 70%);opacity:0.06;top:-10%;left:-15%}
        #hero .glow-2{width:400px;height:400px;background:radial-gradient(circle,var(--accent2) 0%,transparent 70%);opacity:0.08;bottom:10%;right:10%}
        .hero-inner{position:relative;z-index:2;width:100%;display:grid;grid-template-columns:1fr;gap:42px;align-items:center;padding:80px 0 56px}
        @media(max-width:900px){.hero-inner{gap:32px;padding:60px 0 44px}}
        .hero-copy{text-align:center}.hero-copy .hero-eyebrow{justify-content:center}
        .hero-eyebrow{margin-bottom:20px;display:flex;align-items:center;gap:12px}
        .hero-eyebrow .pill{font-family:var(--font-mono);font-size:9px;letter-spacing:0.3em;text-transform:uppercase;padding:5px 12px;background:var(--accent-dim);border:1px solid rgba(224,64,251,0.3);color:var(--accent);border-radius:20px}
        .hero-eyebrow .dot{width:5px;height:5px;border-radius:50%;background:var(--accent);animation:pulse-dot 2s infinite}
        @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.7)}}
        .hero-h1{font-family:var(--font-display);font-size:clamp(56px,7vw,96px);line-height:0.93;letter-spacing:0.02em;color:var(--white);text-transform:uppercase;margin-bottom:24px}
        @media(max-width:480px){.hero-h1{font-size:clamp(38px,10vw,56px);margin-bottom:16px}}
        .hero-h1 .line-accent{color:var(--accent);display:block}.hero-h1 .line-dim{color:rgba(240,240,248,0.35);display:block}
        .hero-sub{font-size:16px;line-height:1.7;color:var(--text-muted);max-width:760px;margin:0 auto 36px;font-weight:400}
        @media(max-width:480px){.hero-sub{font-size:14px;line-height:1.6;margin:0 auto 24px;padding:0 8px}}
        .hero-ctas{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:24px;justify-content:center}
        .hero-visual{position:relative;width:100%}
        .hero-panel{position:relative;aspect-ratio:16/7.4;border:1px solid var(--border-strong);overflow:hidden;background:var(--surface);border-radius:var(--radius);will-change:transform;width:min(100%,1260px);min-height:520px;margin:0 auto}
        @media(max-width:900px){.hero-panel{aspect-ratio:16/9;min-height:340px}}
        @media(max-width:560px){.hero-panel{min-height:260px;aspect-ratio:4/3}}
        @media(max-width:400px){.hero-panel{min-height:220px}}
        .hero-panel::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(224,64,251,0.08) 0%,transparent 50%,rgba(124,58,237,0.06) 100%)}
        .hero-panel-inner{width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative;z-index:1}
        .hero-panel-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.9}
        .hero-panel-text{font-family:var(--font-display);font-size:120px;letter-spacing:-0.02em;color:rgba(255,255,255,0.04);line-height:1;text-transform:uppercase;position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
        .hero-panel-meta{text-align:center;position:relative;z-index:2}
        .hero-panel-kicker{font-family:var(--font-mono);font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(255,255,255,0.15)}
        .hero-panel-badge{position:absolute;bottom:20px;left:20px;background:rgba(0,0,0,0.7);backdrop-filter:blur(12px);border:1px solid var(--border-strong);padding:10px 14px;font-family:var(--font-mono);font-size:10px;letter-spacing:0.15em;color:var(--text-muted);text-transform:uppercase}
        .hero-panel-badge strong{color:var(--accent);display:block;font-size:13px;letter-spacing:0}
        .corner-mark{position:absolute;width:14px;height:14px;pointer-events:none}
        .corner-mark.tl{top:10px;left:10px;border-top:1px solid var(--accent);border-left:1px solid var(--accent)}
        .corner-mark.tr{top:10px;right:10px;border-top:1px solid var(--accent);border-right:1px solid var(--accent)}
        .corner-mark.bl{bottom:10px;left:10px;border-bottom:1px solid var(--accent);border-left:1px solid var(--accent)}
        .corner-mark.br{bottom:10px;right:10px;border-bottom:1px solid var(--accent);border-right:1px solid var(--accent)}

        /* ── Stats ── */
        #statsbar{position:relative;border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:var(--surface);overflow:hidden;padding:0}
        .statsbar-track{display:flex;align-items:stretch;border-left:1px solid var(--border)}
        .stat-card{flex:1;padding:32px 28px;border-right:1px solid var(--border);position:relative;overflow:hidden;transition:background 0.3s}
        .stat-card:hover{background:var(--surface2)}
        .stat-card::before{content:"";position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--accent);transform:scaleX(0);transform-origin:left;transition:transform 0.4s var(--ease)}
        .stat-card:hover::before{transform:scaleX(1)}
        .stat-card .num{font-family:var(--font-display);font-size:44px;color:var(--white);line-height:1;letter-spacing:0.02em;margin-bottom:6px}
        .stat-card .label{font-family:var(--font-mono);font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:var(--text-dim)}
        @media(max-width:900px){.statsbar-track{flex-wrap:wrap}.stat-card{flex:1 1 calc(50% - 0px)}}
        @media(max-width:480px){.stat-card{flex:1 1 100%}}

        /* ── Ticker ── */
        #ticker{background:var(--accent);padding:11px 0;overflow:hidden;border-top:1px solid rgba(255,255,255,0.15)}
        .ticker-inner{display:flex;white-space:nowrap;animation:ticker-scroll 30s linear infinite}
        .ticker-item{display:inline-flex;align-items:center;gap:20px;font-family:var(--font-mono);font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(0,0,0,0.7);padding-right:60px}
        .ticker-sep{color:rgba(0,0,0,0.4)}
        @keyframes ticker-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* ── About ── */
        #about{position:relative;padding:100px 0;overflow:hidden}
        #about .glow-1{width:500px;height:500px;background:radial-gradient(circle,var(--accent2) 0%,transparent 70%);opacity:0.05;top:20%;right:-10%}
        .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
        @media(max-width:900px){.about-grid{grid-template-columns:1fr;gap:48px}}
        .about-visual{position:relative}
        .about-img-wrap{aspect-ratio:3/4;background:var(--surface);border:1px solid var(--border-strong);overflow:hidden;position:relative;border-radius:var(--radius)}
        .about-img-wrap::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(6,6,8,0.7) 0%,transparent 50%)}
        .about-image{width:100%;height:100%;object-fit:cover}
        .about-badge{position:absolute;bottom:-20px;right:-20px;z-index:2;background:var(--accent);padding:20px 22px;text-align:center}
        .about-badge strong{font-family:var(--font-display);font-size:40px;color:#fff;display:block;line-height:1}
        .about-badge span{font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.7)}
        .about-h2{font-family:var(--font-display);font-size:clamp(40px,4.5vw,64px);line-height:0.95;text-transform:uppercase;color:var(--white);letter-spacing:0.02em;margin-bottom:24px}
        .about-h2 em{color:var(--accent);font-style:normal;display:block}
        .about-body{font-size:15px;line-height:1.8;color:var(--text-muted);margin-bottom:16px}
        .about-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:28px}
        .about-pill{font-family:var(--font-mono);font-size:9px;letter-spacing:0.2em;text-transform:uppercase;padding:6px 12px;border:1px solid var(--border-strong);color:var(--text-muted)}

        /* ── Creators ── */
        #creators{position:relative;padding:100px 0;background:var(--surface);border-top:1px solid var(--border);overflow:hidden}
        #creators .glow-1{width:600px;height:600px;background:radial-gradient(circle,var(--accent) 0%,transparent 70%);opacity:0.04;top:50%;right:-20%;transform:translateY(-50%)}
        .creators-shell{position:relative;z-index:2}
        .creators-layout{display:grid;grid-template-columns:1fr 1.3fr;gap:80px;align-items:start}
        @media(max-width:900px){.creators-layout{grid-template-columns:1fr;gap:48px}}
        .creators-h2{font-family:var(--font-display);font-size:clamp(38px,4.5vw,60px);text-transform:uppercase;color:var(--white);line-height:0.93;letter-spacing:0.02em;margin-bottom:20px}
        .creators-h2 span{color:var(--accent)}
        .creators-body{font-size:14px;color:var(--text-muted);line-height:1.8;margin-bottom:28px}
        .creators-stats{display:flex;gap:28px;margin-bottom:32px;padding-top:24px;border-top:1px solid var(--border)}
        .c-stat strong{font-family:var(--font-display);font-size:36px;color:var(--white);display:block;line-height:1}
        .c-stat span{font-family:var(--font-mono);font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:var(--text-dim)}
        .stat-divider{width:1px;background:var(--border)}
        .creators-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
        @media(max-width:480px){.creators-grid{grid-template-columns:repeat(2,1fr)}}
        .creators-feature-image{display:block;margin-bottom:18px;border:1px solid var(--border);background:var(--bg);overflow:hidden}
        .creators-feature-media{width:100%;height:auto;display:block}

        /* Creator cards with real photo */
        .creator-card{border:1px solid var(--border);background:var(--bg);padding:16px;transition:border-color 0.3s,background 0.3s;cursor:pointer;border-radius:var(--radius);display:block}
        .creator-card:hover{border-color:rgba(224,64,251,0.3);background:var(--surface2)}
        .creator-avatar-wrap{position:relative;width:52px;height:52px;margin-bottom:12px}
        .creator-avatar-img{width:52px;height:52px;border-radius:50%;object-fit:cover;border:2px solid var(--border);transition:border-color 0.3s}
        .creator-card:hover .creator-avatar-img{border-color:rgba(224,64,251,0.5)}
        .creator-avatar-fallback{width:52px;height:52px;border-radius:50%;background:var(--surface2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:22px;color:var(--text-dim)}
        .creator-yt-badge{position:absolute;bottom:-2px;right:-2px;width:18px;height:18px;background:#FF0000;border-radius:50%;border:2px solid var(--bg);display:flex;align-items:center;justify-content:center}
        .creator-handle{font-weight:600;font-size:12px;color:var(--white);margin-bottom:2px}
        .creator-niche{font-family:var(--font-mono);font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:var(--text-dim);margin-bottom:8px}
        .creator-reach{font-family:var(--font-display);font-size:20px;color:var(--white);line-height:1}
        .creator-reach-label{font-family:var(--font-mono);font-size:8px;letter-spacing:0.15em;text-transform:uppercase;color:var(--text-dim);margin-top:1px}

        /* ── Partners ── */
        #partners{position:relative;padding:100px 0;border-top:1px solid var(--border);overflow:hidden}
        #partners .glow-1{width:600px;height:400px;background:radial-gradient(circle,var(--accent) 0%,transparent 70%);opacity:0.04;bottom:-10%;left:20%}
        .partners-shell{position:relative;z-index:2}
        .partners-header{text-align:center;margin-bottom:60px}
        .partners-h2{font-family:var(--font-display);font-size:clamp(40px,5vw,72px);text-transform:uppercase;color:var(--white);line-height:0.93;letter-spacing:0.02em;margin-bottom:16px}
        .partners-h2 span{color:var(--accent);display:block}
        .partners-sub{font-size:15px;color:var(--text-muted);max-width:560px;margin:0 auto 12px;line-height:1.7}
        .logo-wall{display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:var(--border);border:1px solid var(--border);margin-bottom:48px}
        @media(max-width:900px){.logo-wall{grid-template-columns:repeat(4,1fr)}}
        @media(max-width:560px){.logo-wall{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:380px){.logo-wall{grid-template-columns:repeat(2,1fr)}}
        .logo-item{background:var(--surface);min-height:92px;display:flex;align-items:center;justify-content:center;transition:background 0.3s;cursor:pointer;position:relative;overflow:hidden;flex-direction:column;gap:8px;padding:14px}
        .logo-item:hover{background:var(--surface2)}
        .logo-item::before{content:"";position:absolute;inset:0;opacity:0;transition:opacity 0.3s;background:radial-gradient(circle at 50% 50%,rgba(224,64,251,0.06),transparent 70%)}
        .logo-item:hover::before{opacity:1}
        .logo-name{font-family:var(--font-mono);font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:var(--text-dim);transition:color 0.3s;text-align:center}
        .logo-item:hover .logo-name{color:var(--text)}
        .logo-image{max-width:148px;max-height:42px;width:auto;height:auto;object-fit:contain}
        .partners-bottom{display:flex;flex-direction:column;align-items:center;gap:20px}
        .partners-claim{font-size:13px;color:var(--text-dim);text-align:center;font-family:var(--font-mono);letter-spacing:0.08em;max-width:500px;line-height:1.6}

        /* ── Services ── */
        #services{position:relative;padding:100px 0;background:var(--surface);border-top:1px solid var(--border)}
        .services-header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:60px;gap:20px}
        @media(max-width:700px){.services-header{flex-direction:column;align-items:flex-start}}
        .services-h2{font-family:var(--font-display);font-size:clamp(40px,5vw,72px);line-height:0.93;text-transform:uppercase;color:var(--white);letter-spacing:0.02em}
        .services-h2 span{color:rgba(240,240,248,0.3);display:block}
        .services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border)}
        @media(max-width:900px){.services-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:560px){.services-grid{grid-template-columns:1fr}}
        .service-card{background:var(--surface);padding:36px 28px;position:relative;overflow:hidden;transition:background 0.3s;cursor:default;display:block}
        .service-card:hover{background:var(--bg)}
        .service-card::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:var(--accent);transform:scaleX(0);transform-origin:left;transition:transform 0.5s var(--ease)}
        .service-card:hover::before{transform:scaleX(1)}
        .service-icon{font-size:22px;color:rgba(224,64,251,0.4);margin-bottom:16px;transition:color 0.3s;font-family:var(--font-mono)}
        .service-card:hover .service-icon{color:var(--accent)}
        .service-title{font-family:var(--font-display);font-size:26px;text-transform:uppercase;letter-spacing:0.04em;color:var(--white);margin-bottom:10px;line-height:1}
        .service-desc{font-size:13px;color:var(--text-muted);line-height:1.75}

        /* ── Community ── */
        #community{position:relative;padding:100px 0;overflow:hidden;background:var(--surface);border-top:1px solid var(--border)}
        #community .glow-1{width:800px;height:800px;background:radial-gradient(circle,var(--accent) 0%,transparent 60%);opacity:0.05;top:50%;left:50%;transform:translate(-50%,-50%)}
        .community-shell{position:relative;z-index:2}
        .community-inner{text-align:center;max-width:760px;margin:0 auto}
        .community-h2{font-family:var(--font-display);font-size:clamp(48px,7vw,96px);text-transform:uppercase;color:var(--white);line-height:0.9;letter-spacing:0.02em;margin-bottom:24px}
        .community-h2 em{color:var(--accent);font-style:normal;display:block}
        .community-sub{font-size:16px;color:var(--text-muted);line-height:1.75;margin-bottom:36px;max-width:560px;margin-left:auto;margin-right:auto}
        .community-ctas{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-bottom:56px}
        .discord-btn{display:inline-flex;align-items:center;gap:8px;padding:13px 24px;background:#5865F2;color:#fff;font-family:var(--font-body);font-size:13px;font-weight:600;letter-spacing:0.04em;border-radius:var(--radius);border:none;cursor:pointer;transition:all 0.25s var(--ease)}
        .discord-btn:hover{background:#4752C4;transform:translateY(-1px)}.discord-btn svg{width:18px;height:14px}
        .community-feature{display:block;margin:0 auto 28px;max-width:980px;border:1px solid var(--border);overflow:hidden}
        .community-feature-image{width:100%;height:auto;display:block}
        .community-pills{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
        .comm-pill{font-family:var(--font-mono);font-size:9px;letter-spacing:0.22em;text-transform:uppercase;padding:6px 14px;border:1px solid var(--border);color:var(--text-dim);transition:all 0.2s}
        .comm-pill:hover{border-color:rgba(224,64,251,0.3);color:var(--text-muted)}

        /* ── Shop — Currency ── */
        #shop{position:relative;padding:100px 0;border-top:1px solid var(--border);overflow:hidden}
        .glow-shop{width:600px;height:400px;background:radial-gradient(circle,var(--accent2) 0%,transparent 70%);opacity:0.06;top:30%;right:-5%;position:absolute;border-radius:50%;pointer-events:none;filter:blur(120px);mix-blend-mode:screen}
        .shop-header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:48px;gap:20px}
        @media(max-width:700px){.shop-header{flex-direction:column;align-items:flex-start}}
        .shop-h2{font-family:var(--font-display);font-size:clamp(38px,5vw,64px);text-transform:uppercase;color:var(--white);line-height:0.93;letter-spacing:0.02em}
        .shop-h2 span{color:rgba(240,240,248,0.3)}
        .shop-note{font-family:var(--font-mono);font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent);border:1px solid rgba(224,64,251,0.2);padding:6px 12px;background:var(--accent-dim)}
        .shop-actions{display:flex;align-items:center;gap:12px}

        /* Currency grid */
        .currency-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:32px}
        @media(max-width:900px){.currency-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:560px){.currency-grid{grid-template-columns:1fr}}

        .currency-card{border:1px solid var(--border);background:var(--surface);overflow:hidden;border-radius:var(--radius);display:block;transition:border-color 0.3s,transform 0.3s var(--ease),box-shadow 0.3s}
        .currency-card:hover{border-color:var(--currency-color,var(--border-strong));transform:translateY(-4px);box-shadow:0 12px 40px var(--currency-glow,rgba(255,255,255,0.05))}

        .currency-visual{position:relative;padding:36px 24px 24px;display:flex;flex-direction:column;align-items:center;gap:12px;background:var(--bg)}
        .currency-glow-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 120%,var(--currency-glow,transparent),transparent 70%);pointer-events:none;transition:opacity 0.3s}
        .currency-card:hover .currency-glow-bg{opacity:1.5}
        .currency-icon-wrap{position:relative;z-index:1;filter:drop-shadow(0 4px 16px var(--currency-glow,rgba(255,255,255,0.1)))}
        .currency-game-label{font-family:var(--font-mono);font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:var(--currency-color,var(--text-dim));position:relative;z-index:1}

        .currency-info{padding:16px 20px 20px;display:flex;flex-direction:column;gap:12px;border-top:1px solid var(--border)}
        .currency-name{font-family:var(--font-display);font-size:20px;text-transform:uppercase;color:var(--white);letter-spacing:0.04em;line-height:1}
        .currency-packs{display:flex;flex-direction:column;gap:6px}
        .currency-pack{display:flex;justify-content:space-between;align-items:center;padding:7px 10px;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius)}
        .pack-label{font-family:var(--font-mono);font-size:10px;color:var(--text-muted);letter-spacing:0.08em}
        .pack-price{font-family:var(--font-display);font-size:14px;color:var(--currency-color,var(--white))}
        .currency-buy-btn{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:var(--currency-color,var(--accent));transition:gap 0.2s;padding-top:4px}
        .currency-card:hover .currency-buy-btn{gap:10px}

        .shop-disclaimer{font-family:var(--font-mono);font-size:10px;letter-spacing:0.1em;color:var(--text-dim);text-align:center;line-height:1.7;max-width:500px;margin:0 auto}

        /* ── Merch (locked) ── */
        #merch{position:relative;padding:100px 0;border-top:1px solid var(--border)}
        .merch-locked-wrap{position:relative}
        .merch-blurred{filter:blur(7px);pointer-events:none;user-select:none}
        .merch-lock-overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;z-index:2;background:radial-gradient(ellipse at center,rgba(6,6,8,0.55) 0%,rgba(6,6,8,0.75) 100%)}
        .merch-lock-icon{width:72px;height:72px;border:1px solid var(--border-strong);border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--surface);color:var(--accent)}
        .merch-lock-title{font-family:var(--font-display);font-size:clamp(28px,4vw,42px);text-transform:uppercase;color:var(--white);letter-spacing:0.04em}
        .merch-lock-sub{font-family:var(--font-mono);font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:var(--text-muted)}
        .merch-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:0}
        @media(max-width:700px){.merch-grid{grid-template-columns:1fr}}
        .merch-card{border:1px solid var(--border);background:var(--surface);overflow:hidden;border-radius:var(--radius);display:block}
        .merch-visual{aspect-ratio:1;background:var(--surface2);position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
        .merch-visual-letter{font-family:var(--font-display);font-size:100px;color:rgba(255,255,255,0.04);letter-spacing:-0.02em;position:relative;z-index:2}
        .merch-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.92}
        .merch-tag{position:absolute;top:10px;left:10px;font-family:var(--font-mono);font-size:8px;letter-spacing:0.2em;text-transform:uppercase;padding:4px 8px;background:rgba(224,64,251,0.15);border:1px solid rgba(224,64,251,0.3);color:var(--accent)}
        .merch-info{padding:16px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
        .merch-name{font-weight:600;font-size:14px;color:var(--white);margin-bottom:2px}
        .merch-brand{font-size:10px;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.1em}
        .merch-price{font-family:var(--font-display);font-size:20px;color:var(--white)}

        /* ── Case Study Modal ── */
        .cs-overlay{position:fixed;inset:0;z-index:300;background:rgba(6,6,8,0.88);backdrop-filter:blur(16px);display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:40px 20px}
        .cs-modal{background:var(--surface);border:1px solid var(--border-strong);width:100%;max-width:780px;border-radius:var(--radius);overflow:hidden;position:relative;animation:cs-in 0.35s var(--ease)}
        @keyframes cs-in{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .cs-close{position:absolute;top:16px;right:16px;z-index:10;width:36px;height:36px;background:rgba(6,6,8,0.7);backdrop-filter:blur(8px);border:1px solid var(--border-strong);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--text-muted);transition:all 0.2s}
        .cs-close:hover{color:var(--white);border-color:var(--accent)}
        .cs-hero-img{width:100%;height:auto;display:block;border-bottom:1px solid var(--border)}
        .cs-body{padding:32px}
        .cs-meta{display:flex;align-items:center;gap:12px;margin-bottom:12px}
        .cs-title{font-family:var(--font-display);font-size:clamp(32px,5vw,52px);text-transform:uppercase;color:var(--white);letter-spacing:0.03em;line-height:1;margin-bottom:4px}
        .cs-subtitle{font-family:var(--font-mono);font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent);margin-bottom:28px}
        .cs-section{margin-bottom:28px}
        .cs-section-label{font-family:var(--font-mono);font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:var(--text-dim);margin-bottom:10px;display:flex;align-items:center;gap:10px}
        .cs-section-label::before{content:"";display:block;width:16px;height:1px;background:var(--accent)}
        .cs-text{font-size:14px;color:var(--text-muted);line-height:1.8}
        .cs-exec-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px}
        .cs-exec-group{border:1px solid var(--border);padding:16px}
        .cs-exec-label{font-family:var(--font-mono);font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent);margin-bottom:10px}
        .cs-exec-list{list-style:none;display:flex;flex-direction:column;gap:5px}
        .cs-exec-list li{font-size:13px;color:var(--text-muted);line-height:1.5;padding-left:12px;position:relative}
        .cs-exec-list li::before{content:"·";position:absolute;left:0;color:var(--accent)}
        .cs-impact-grid{display:flex;flex-direction:column;gap:10px}
        .cs-impact-item{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--text-muted);line-height:1.6}
        .cs-impact-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);flex-shrink:0;margin-top:6px}
        .cs-outcomes{font-family:var(--font-mono);font-size:11px;letter-spacing:0.08em;color:var(--text-dim);border-top:1px solid var(--border);padding-top:20px;margin-bottom:24px;line-height:1.6}
        .cs-cta{width:100%;justify-content:center}

        /* ── Work ── */
        #work{position:relative;padding:100px 0;background:var(--surface);border-top:1px solid var(--border);overflow:hidden}
        #work .glow-1{width:500px;height:500px;background:radial-gradient(circle,var(--accent2) 0%,transparent 70%);opacity:0.06;top:20%;left:-10%}
        .work-shell{position:relative;z-index:2}
        .work-header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:56px;gap:20px}
        @media(max-width:700px){.work-header{flex-direction:column;align-items:flex-start}}
        .work-h2{font-family:var(--font-display);font-size:clamp(40px,5vw,72px);text-transform:uppercase;color:var(--white);line-height:0.93;letter-spacing:0.02em}
        .work-h2 span{color:rgba(240,240,248,0.3);display:block}
        .campaigns-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
        @media(max-width:900px){.campaigns-grid{grid-template-columns:1fr}}
        .campaign-card{border:1px solid var(--border);background:var(--bg);padding:28px;position:relative;overflow:hidden;cursor:pointer;transition:border-color 0.3s,background 0.3s;display:flex;flex-direction:column;gap:14px;border-radius:var(--radius);text-align:left;color:var(--text);width:100%}
        .campaign-image{width:calc(100% + 56px);height:auto;margin:-28px -28px 18px;display:block;border-bottom:1px solid var(--border)}
        .campaign-card:hover{border-color:rgba(224,64,251,0.25);background:var(--surface2)}
        .campaign-card::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:var(--accent);transform:scaleX(0);transform-origin:left;transition:transform 0.5s var(--ease)}
        .campaign-card:hover::before{transform:scaleX(1)}
        .campaign-cat{display:flex;justify-content:space-between;align-items:center;gap:16px}
        .campaign-year{font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:0.1em}
        .campaign-title{font-family:var(--font-display);font-size:30px;text-transform:uppercase;color:var(--white);letter-spacing:0.03em;line-height:1}
        .campaign-desc{font-size:13px;color:var(--text-muted);line-height:1.75;flex:1}
        .campaign-outcomes{padding-top:14px;border-top:1px solid var(--border);font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:0.06em;line-height:1.6}
        .campaign-arrow{font-family:var(--font-mono);font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(224,64,251,0);display:flex;align-items:center;gap:6px;transition:all 0.3s}
        .campaign-card:hover .campaign-arrow{color:var(--accent)}

        /* ── Leadership ── */
        #leadership{position:relative;padding:100px 0;border-top:1px solid var(--border)}
        .leadership-h2{font-family:var(--font-display);font-size:clamp(38px,5vw,64px);text-transform:uppercase;color:var(--white);line-height:0.93;letter-spacing:0.02em;margin-bottom:52px}
        .leadership-h2 span{color:rgba(240,240,248,0.3)}
        /* 4+3 layout for 7 members */
        .team-people-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px}
        @media(max-width:900px){.team-people-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:480px){.team-people-grid{grid-template-columns:1fr}}
        .team-ig-cta{display:flex;justify-content:center;margin-top:20px}
        .person-card{border:1px solid var(--border);background:var(--surface);padding:16px;transition:border-color 0.3s,background 0.3s;border-radius:var(--radius);display:block;overflow:hidden}
        @media(max-width:480px){.person-card{padding:12px}}
        .person-image{width:100%;height:180px;display:block;border-bottom:1px solid var(--border);object-fit:cover;object-position:center}
        @media(max-width:480px){.person-image{height:140px}}
        .person-card:hover{border-color:var(--border-strong);background:var(--surface2)}
        .person-avatar{width:52px;height:52px;border-radius:50%;background:var(--surface2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:20px;color:var(--text-dim);margin-bottom:14px;transition:border-color 0.3s}
        .person-card:hover .person-avatar{border-color:rgba(224,64,251,0.3)}
        .person-role{font-family:var(--font-mono);font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent);margin-bottom:4px}
        .person-name{font-family:var(--font-display);font-size:20px;text-transform:uppercase;color:var(--white);letter-spacing:0.04em;line-height:1;margin-bottom:2px}
        .person-handle{font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:0.08em}

        /* ── Footer ── */
        #footer{background:var(--surface);border-top:1px solid var(--border);padding:72px 0 32px}
        .footer-grid{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:48px;margin-bottom:64px}
        @media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr;gap:36px}}
        @media(max-width:560px){.footer-grid{grid-template-columns:1fr;gap:28px}}
        .footer-logo{margin-bottom:16px}
        .footer-brand{display:inline-flex;align-items:center}
        .footer-logo-icon{width:74px;height:auto;display:block;filter:brightness(0) invert(1)}
        .footer-tagline{font-size:13px;color:var(--text-muted);line-height:1.7;max-width:240px;margin-bottom:24px}
        .footer-socials{display:flex;gap:8px}
        .social-btn{width:36px;height:36px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--text-dim);transition:all 0.2s;cursor:pointer;background:none;border-radius:var(--radius)}
        .social-btn:hover{border-color:var(--accent);color:var(--accent)}
        .footer-col-title{font-family:var(--font-mono);font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:var(--text-dim);margin-bottom:18px}
        .footer-links{display:flex;flex-direction:column;gap:10px}
        .footer-links a{font-size:13px;color:var(--text-muted);transition:color 0.2s}
        .footer-links a:hover{color:var(--white)}
        .footer-contact{font-size:13px;color:var(--text-muted);line-height:1.7}
        .footer-contact p{margin-bottom:8px}
        .footer-contact a{color:var(--accent);font-size:12px;font-family:var(--font-mono)}
        .footer-contact a:hover{color:var(--text)}
        .footer-bottom{padding-top:28px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
        .footer-copy{font-family:var(--font-mono);font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:var(--text-dim)}
        .footer-made{font-family:var(--font-mono);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-dim)}
        .footer-developed{font-family:var(--font-mono);font-size:10px;letter-spacing:0.05em;color:var(--text-dim)}
        .footer-developed a{color:var(--text-muted);text-decoration:none;transition:color 0.2s}
        .footer-developed a:hover{color:var(--accent)}

        /* ── Scroll / Cursor ── */
        #scroll-bar{position:fixed;top:0;left:0;height:2px;background:var(--accent);z-index:200;transition:width 0.05s linear}
        #cursor{position:fixed;width:6px;height:6px;border-radius:50%;background:var(--accent);pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:transform 0.1s,opacity 0.3s;mix-blend-mode:screen}
        @media(hover:none){#cursor{display:none}}

        @media(prefers-reduced-motion:reduce){
          html{scroll-behavior:auto}
          *,*::before,*::after{animation-duration:0.01ms !important;animation-iteration-count:1 !important;transition-duration:0.01ms !important}
          .reveal{opacity:1;transform:none}
          .ticker-inner{animation:none}
          #cursor{display:none}
        }
      `}</style>
    </>
  );
}
