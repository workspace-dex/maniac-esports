import type { Metadata } from "next";
import Link from "next/link";
import "./campaign.css";

export const metadata: Metadata = {
  title: "KREO GAME DROP | Case Study",
  description: "Maniac partnered with Kreo to launch their Naruto Edition peripherals and new gaming chairs through creator-driven engagement.",
};

export default function KreoCampaign() {
  return (
    <main className="campaign-page">
      <div className="campaign-hero kreo-hero">
        <div className="campaign-hero-overlay" />
        <div className="campaign-hero-content">
          <div className="campaign-badge">Campaign Case Study</div>
          <h1 className="campaign-title">KREO GAME DROP</h1>
          <p className="campaign-category">Product Launch | Brand Activation</p>
          <div className="campaign-year">2023</div>
        </div>
        <Link href="/#work" className="campaign-back">
          <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M13 7H1M6 2L1 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Campaigns
        </Link>
      </div>

      <div className="campaign-container">
        <section className="campaign-section">
          <div className="campaign-label">Overview</div>
          <p className="campaign-text">
            Maniac partnered with Kreo to launch their Naruto Edition peripherals and new gaming chairs through creator-driven engagement.
          </p>
        </section>

        <section className="campaign-section">
          <div className="campaign-label">Approach</div>
          <p className="campaign-text">
            We used live, interactive content to educate users while building hype during launch. The focus was on engaging the gaming community through authentic gameplay experiences.
          </p>
        </section>

        <section className="campaign-section">
          <div className="campaign-label">Execution</div>
          <div className="campaign-list">
            <div className="campaign-list-item">
              <span className="list-marker">01</span>
              <div>
                <strong>Creator Network</strong>
                <p>10+ PC gaming creators</p>
              </div>
            </div>
            <div className="campaign-list-item">
              <span className="list-marker">02</span>
              <div>
                <strong>Content Format</strong>
                <p>Live streams featuring gameplay + product reviews</p>
              </div>
            </div>
            <div className="campaign-list-item">
              <span className="list-marker">03</span>
              <div>
                <strong>Audience Engagement</strong>
                <p>Sub-games, community challenges, and giveaways</p>
              </div>
            </div>
          </div>
        </section>

        <section className="campaign-section impact-section">
          <div className="campaign-label">Impact</div>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-number">2M+</div>
              <div className="impact-label">Impressions</div>
            </div>
            <div className="impact-card">
              <div className="impact-number">High</div>
              <div className="impact-label">Launch Engagement</div>
            </div>
            <div className="impact-card">
              <div className="impact-number">Strong</div>
              <div className="impact-label">Gaming Visibility</div>
            </div>
          </div>
        </section>

        <section className="campaign-section">
          <div className="campaign-cta">
            <p className="campaign-cta-text">Interested in a similar campaign?</p>
            <Link href="https://www.instagram.com/maniacesports.in/" className="campaign-cta-btn">
              Get In Touch
              <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </section>
      </div>

      <div className="campaign-nav">
        <Link href="/campaigns/razer" className="campaign-nav-item next">
          <span className="nav-label">Next Case Study</span>
          <span className="nav-title">RAZER x MANIAC</span>
          <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </main>
  );
}
