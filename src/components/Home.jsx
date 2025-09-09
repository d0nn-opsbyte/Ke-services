import { Link } from "react-router-dom";


function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Find Services or Offer Your Skills</h1>
        <p>
          Kenya’s all-in-one marketplace for buyers and sellers.  
          Book instantly, pay securely, and grow your hustle.
        </p>
        <div className="hero-buttons">
          <Link to="/signup" className="cta primary">Get Started</Link>
          <Link to="/login" className="cta secondary">Explore Services</Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span>📱</span>
            <h3>Browse</h3>
            <p>Find services offered by trusted providers across Kenya.</p>
          </div>
          <div className="step">
            <span>📩</span>
            <h3>Book</h3>
            <p>Order instantly and connect with service providers.</p>
          </div>
          <div className="step">
            <span>💵</span>
            <h3>Pay</h3>
            <p>Secure payments via M-Pesa and wallet integration.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <div className="about-container">
            <h3>About Us</h3>
            <p>At <strong>KE Services</strong>, we believe finding and offering services in Kenya should be simple, trusted, and empowering.</p>
            <p>Our platform connects buyers who need reliable services with sellers who have the skills to deliver — all in one digital marketplace.</p>
            <p>✅ For Buyers: Discover a wide range of services — from home repairs and cleaning, to tech support and professional consulting. Book easily, pay securely, and review your experience.</p>
            <p>✅ For Sellers: Showcase your skills, grow your client base, and manage orders with ease. Our wallet system ensures transparent earnings, while reviews help you build trust and reputation.</p>
          </div>
        </div>
  <p>© 2025 KE Services. All rights reserved.</p>

      </footer>
    </div>
  );
}

export default Home;