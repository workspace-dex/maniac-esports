import type { Metadata } from "next";
import Link from "next/link";
import "./campaign.css";

export const metadata: Metadata = {
  title: "iQOO x MANIAC | Case Study",
  description: "Maniac partnered with iQOO to launch the Neo 10 & Neo 13, combining digital content with on-ground experiences to drive adoption.",
};

export default function IQooCampaign() {
  return (
    <main className="campaign-page">
      <div className="campaign-hero iqoo-hero">
        <div className="campaign-hero-overlay" />
        <div className="campaign-hero-content">
          <div className="campaign-badge">Campaign Case Study</div>
          <h1 className="campaign-title">iQOO x MANIAC</h1>
          <p className="campaign-category">Product Launch | Adoption & Scale</p>
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
            Maniac partnered with iQOO to launch the Neo 10 & Neo 13, combining digital content with on-ground experiences to drive adoption.
          </p>
        </section>

        <section className="campaign-section">
          <div className="campaign-label">Approach</div>
          <p className="campaign-text">
            A full-funnel campaign blending creator content, live engagement, and real-world gameplay experiences.
          </p>
        </section>

        <section className="campaign-section">
          <div className="campaign-label">Execution</div>
          <div className="campaign-execution-grid">
            <div className="execution-card">
              <div className="execution-header">
                <span className="execution-tag">Digital</span>
                <span className="execution-duration">2 Months</span>
              </div>
              <div className="execution-list">
                <div className="execution-item">
                  <span className="exec-icon">👥</span>
                  <span>20 gaming creators</span>
                </div>
                <div className="execution-item">
                  <span className="exec-icon">📱</span>
                  <span>Reels, stories, daily live streams</span>
                </div>
              </div>
            </div>
            <div className="execution-card">
              <div className="execution-header">
                <span className="execution-tag execution-tag-highlight">On-Ground</span>
                <span className="execution-duration">BGMI LAN Event</span>
              </div>
              <div className="execution-list">
                <div className="execution-item">
                  <span className="exec-icon">🎤</span>
                  <span>11 creators hosted IRL meetups</span>
                </div>
                <div className="execution-item">
                  <span className="exec-icon">🎮</span>
                  <span>20,000+ attendees</span>
                </div>
                <div className="execution-item">
                  <span className="exec-icon">📲</span>
                  <span>Creator zones with fan interactions</span>
                </div>
                <div className="execution-item">
                  <span className="exec-icon">⚡</span>
                  <span>Live gameplay on iQOO devices</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="campaign-section impact-section">
          <div className="campaign-label">Impact</div>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-number">80M+</div>
              <div className="impact-label">Impressions</div>
            </div>
            <div className="impact-card">
              <div className="impact-number">20,000+</div>
              <div className="impact-label">Event Attendees</div>
            </div>
            <div className="impact-card">
              <div className="impact-number">Strong</div>
              <div className="impact-label">Product Adoption</div>
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
        <Link href="/campaigns/kreo" className="campaign-nav-item next">
          <span className="nav-label">Next Case Study</span>
          <span className="nav-title">KREO GAME DROP</span>
          <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </main>
  );
}
