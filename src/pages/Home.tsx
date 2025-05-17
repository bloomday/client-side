import '../styles/home.css';

const Home = () => {
  return (
    <>
      <header className="header">
        <div className="decorative-circles"></div>
        <div className="decorative-circles"></div>
        <div className="header-content">
          <div className="logo">Bloomday</div>
          <div className="user-area">
            <div className="notifications">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="notification-badge">3</span>
            </div>
            <div className="avatar">
              <img src="/images/profile.jpg" alt="User memoji" className="memoji" />
            </div>
          </div>
        </div>
        <div className="floating-element floating-confetti-1">🌟</div>
        <div className="floating-element floating-confetti-2">🎉</div>
        <div className="floating-element floating-confetti-3">✨</div>
      </header>

      <main className="main-content">
        <section className="welcome-section">
          <div className="welcome-text">
            <h1>Hey, Jessica! 👋</h1>
            <p>Ready to plan something amazing?</p>
          </div>
          <button className="create-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Event
          </button>
        </section>

        <div className="tabs">
          <div className="tab active">Upcoming</div>
          <div className="tab">Past</div>
          <div className="tab">Invitations</div>
        </div>

        <section>
          <h2 className="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Your Events
          </h2>
          <div className="events-grid">
            {/* Event 1 */}
            <div className="event-card">
              <div className="event-img" style={{ background: 'linear-gradient(45deg, #8A2387, #E94057, #F27121)' }}>
                <div className="event-decoration"></div>
                <div className="event-theme-icon">🥂</div>
                <div className="event-theme-tag">Wedding</div>
                <div className="event-date">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  May 15, 2025
                </div>
              </div>
              <div className="event-content">
                <h3 className="event-title">John & Sarah's Wedding</h3>
                <div className="event-details">
                  <span>6:00 PM</span>
                  <span>Grand Plaza Hotel</span>
                </div>
                <div className="event-attendees">
                  <div className="attendee">JD</div>
                  <div className="attendee">KM</div>
                  <div className="attendee">AL</div>
                  <div className="attendee-count">+42</div>
                </div>
                <div className="event-actions">
                  <button className="event-btn primary-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Invite
                  </button>
                  <button className="event-btn secondary-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit
                  </button>
                </div>
              </div>
            </div>

            {/* Event 2 */}
            <div className="event-card">
              <div className="event-img" style={{ background: 'linear-gradient(45deg, #00C6FF, #0072FF)' }}>
                <div className="event-decoration"></div>
                <div className="event-theme-icon">🎂</div>
                <div className="event-theme-tag">Birthday</div>
                <div className="event-date">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  April 22, 2025
                </div>
              </div>
              <div className="event-content">
                <h3 className="event-title">Mike's 30th Birthday</h3>
                <div className="event-details">
                  <span>8:00 PM</span>
                  <span>Rooftop Lounge</span>
                </div>
                <div className="event-attendees">
                  <div className="attendee">RK</div>
                  <div className="attendee">TS</div>
                  <div className="attendee-count">+16</div>
                </div>
                <div className="event-actions">
                  <button className="event-btn primary-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Invite
                  </button>
                  <button className="event-btn secondary-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <nav className="bottom-nav">
        <div className="nav-item active">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Home</span>
        </div>
        <div className="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Events</span>
        </div>
        <div className="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Profile</span>
        </div>
      </nav>

      <button className="create-event-fab">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </>
  );
};

export default Home; 