import type { Metadata } from "next";
import Link from "next/link";
import "./shop.css";

export const metadata: Metadata = {
  title: "Shop | In-Game Currency & Merchandise",
  description: "Purchase in-game currency and Maniac merchandise - BGMI UC, Valorant Points, Genesis Crystals, Robux, Minecoins, Steam Wallet and more.",
};

const shopItems = [
  {
    id: "bgmi",
    name: "BGMI",
    fullName: "Unknown Cash",
    description: "Premium in-game currency for Battlegrounds Mobile India",
    color: "#FF8C00",
    category: "Mobile Gaming",
    image: "/images/shop/bgmi.svg",
  },
  {
    id: "genshin",
    name: "Genshin Impact",
    fullName: "Genesis Crystals",
    description: "Wishes & Characters for HoYoverse's open world RPG",
    color: "#5B8DEF",
    category: "Mobile Gaming",
    image: "/images/shop/genshin.svg",
  },
  {
    id: "minecraft",
    name: "Minecraft",
    fullName: "Minecoins",
    description: "Marketplace & Realms for Minecraft",
    color: "#62B47A",
    category: "PC Gaming",
    image: "/images/shop/minecraft.svg",
  },
  {
    id: "mobilelegends",
    name: "Mobile Legends",
    fullName: "Diamonds",
    description: "Diamonds for Mobile Legends: Bang Bang",
    color: "#3B82F6",
    category: "Mobile Gaming",
    image: "/images/shop/mobilelegends.svg",
  },
  {
    id: "valorant",
    name: "VALORANT",
    fullName: "Valorant Points",
    description: "Skins & Battlepass for Riot's tactical shooter",
    color: "#FF4655",
    category: "PC Gaming",
    image: "/images/shop/valorant.svg",
  },
  {
    id: "steam",
    name: "Steam",
    fullName: "Steam Wallet (INR)",
    description: "Games & DLC for Steam platform",
    color: "#C6D4DF",
    category: "Platform",
    image: "/images/shop/steam.svg",
  },
];

const merchItems = [
  {
    id: "hoodie",
    name: "Maniac Core Hoodie",
    price: "Rs. 1,299",
    image: "/images/merch-hoodie.svg",
    status: "out-of-stock",
  },
  {
    id: "jersey",
    name: "Maniac Club Jersey",
    price: "Rs. 899",
    image: "/images/merch-jersey.svg",
    status: "out-of-stock",
  },
  {
    id: "tee",
    name: "Training Tee - Black",
    price: "Rs. 599",
    image: "/images/merch-tee.svg",
    status: "out-of-stock",
  },
];

export default function ShopPage() {
  return (
    <main className="shop-page">
      <div className="shop-hero">
        <div className="shop-hero-bg" />
        <div className="container">
          <Link href="/" className="shop-back">
            <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M13 7H1M6 2L1 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </Link>
          <h1 className="shop-title">Shop</h1>
          <p className="shop-subtitle">In-Game Currency & Merchandise</p>
        </div>
      </div>

      <section className="shop-section">
        <div className="container">
          <div className="section-header">
            <h2>In-Game Currency</h2>
            <p>Instant delivery via Discord</p>
          </div>
          <div className="shop-grid">
            {shopItems.map((item) => (
              <Link
                key={item.id}
                href="https://discord.com/channels/692965277532684289/1446866325463896154"
                target="_blank"
                rel="noreferrer"
                className="shop-card"
                style={{ '--card-color': item.color } as React.CSSProperties}
              >
                <div className="shop-card-visual">
                  <div className="shop-card-bg" />
                  <svg viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="45" stroke={item.color} strokeWidth="2" fill="none"/>
                    <circle cx="50" cy="50" r="32" fill={item.color} fillOpacity="0.12"/>
                    <text x="50" y="58" textAnchor="middle" fill={item.color} fontSize="22" fontFamily="sans-serif" fontWeight="bold">{item.name}</text>
                  </svg>
                </div>
                <div className="shop-card-info">
                  <div className="shop-card-name">{item.fullName}</div>
                  <div className="shop-card-desc">{item.description}</div>
                  <div className="shop-card-category">{item.category}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="shop-section merch-section">
        <div className="container">
          <div className="section-header">
            <h2>Maniac Merchandise</h2>
            <p>Exclusive club apparel</p>
          </div>
          <div className="merch-grid">
            {merchItems.map((item) => (
              <div key={item.id} className="merch-card out-of-stock">
                <div className="merch-visual">
                  <img src={item.image} alt={item.name} className="merch-image" />
                  <div className="out-of-stock-badge">OUT OF STOCK</div>
                </div>
                <div className="merch-info">
                  <div className="merch-name">{item.name}</div>
                  <div className="merch-price">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="merch-notice">Stay tuned! New merchandise dropping soon.</p>
        </div>
      </section>

      <div className="shop-cta">
        <div className="container">
          <p>Need help? Contact us on Discord for instant support.</p>
          <Link href="https://discord.com/channels/692965277532684289/1446866325463896154" className="btn btn-primary" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 18 14" fill="none" aria-hidden="true">
              <path d="M15.25 1.5A15.3 15.3 0 0 0 11.5.5a10.5 10.5 0 0 0-.5 1A14.2 14.2 0 0 0 5 1.5a10.5 10.5 0 0 0-.5-1A15.3 15.3 0 0 0 .75 1.5C-.5 5.5-.25 9.4 1 12c1.25.9 2.5 1.5 3.75 1.5l.75-1a10 10 0 0 1-2.25-1c.2-.15.4-.3.55-.45a10.9 10.9 0 0 0 9.4 0c.15.15.35.3.55.45A10 10 0 0 1 11.5 12.5l.75 1C13.5 13.5 14.75 12.9 16 12c1.25-2.6 1.5-6.5.25-10.5Z" fill="currentColor"/>
            </svg>
            Join Discord
          </Link>
        </div>
      </div>
    </main>
  );
}