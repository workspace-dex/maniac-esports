import type { Metadata } from "next";
import Link from "next/link";
import "./campaign.css";

export const metadata: Metadata = {
  title: "RAZER x MANIAC | Case Study",
  description: "Maniac partnered with Razer to drive awareness for the Razer Iskur chair and BlackShark headphones through creator-led content across India's gaming community.",
};

export default function RazerCampaign() {
  return (
    <main className="campaign-page">
      <div className="campaign-hero razer-hero">
        <div className="campaign-hero-overlay" />
        <div className="campaign-hero-content">
          <div className="campaign-badge">Campaign Case Study</div>
          <h1 className="campaign-title">RAZER x MANIAC</h1>
          <p className="campaign-category">Awareness | Community Activation</p>
          <div className="campaign-year">2024</div>
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
            Maniac partnered with Razer to drive awareness for the Razer Iskur chair and BlackShark headphones through creator-led content across India's gaming community.
          </p>
        </section>

        <section className="campaign-section">
          <div className="campaign-label">Approach</div>
          <p className="campaign-text">
            We activated top PC and mobile gaming creators to organically integrate Razer into their daily content — making the products part of real gameplay, not just promotions.
          </p>
        </section>

        <section className="campaign-section">
          <div className="campaign-label">Execution</div>
          <div className="campaign-list">
            <div className="campaign-list-item">
              <span className="list-marker">01</span>
              <div>
                <strong>Creators</strong>
                <p>Jevel, SrishtiPlayz + other top gaming creators</p>
              </div>
            </div>
            <div className="campaign-list-item">
              <span className="list-marker">02</span>
              <div>
                <strong>Content</strong>
                <p>Unboxings, reviews, daily live streams</p>
              </div>
            </div>
            <div className="campaign-list-item">
              <span className="list-marker">03</span>
              <div>
                <strong>Platforms</strong>
                <p>Instagram Reels, YouTube Live</p>
              </div>
            </div>
          </div>
        </section>

        <section className="campaign-section impact-section">
          <div className="campaign-label">Impact</div>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-number">5M+</div>
              <div className="impact-label">Impressions</div>
            </div>
            <div className="impact-card">
              <div className="impact-number">Strong</div>
              <div className="impact-label">Community Engagement</div>
            </div>
            <div className="impact-card">
              <div className="impact-number">High</div>
              <div className="impact-label">Creator Authenticity</div>
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
        <Link href="/campaigns/iqoo" className="campaign-nav-item next">
          <span className="nav-label">Next Case Study</span>
          <span className="nav-title">iQOO x MANIAC</span>
          <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </main>
  );
}
