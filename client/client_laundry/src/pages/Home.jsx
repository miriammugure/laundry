import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to Our Laundry Service</h1>
        <p>Effortless cleaning at your fingertips</p>
        <div className="cta-buttons">
          <Link to="/register" className="ctabtn">Register</Link>
          <Link to="/services" className="ctabtn">Services</Link>
        </div>
      </section>
      
      <section className="services">
        <h2>Our Services</h2>
        <div className="service-card">
          <h3>Dry Cleaning</h3>
          <p>Professional dry cleaning for all fabrics.</p>
          <Link to="/service-detail/dry-cleaning" className="btn">Clean Now</Link>
        </div>
        <div className="service-card">
          <h3>Mat Cleaning</h3>
          <p>Specialized mat and carpet cleaning.</p>
          <Link to="/service-detail/mat-cleaning" className="btn">Clean Now</Link>
        </div>
      </section>

      <section className="reviews">
        <h2>Customer Reviews</h2>
        <div className="review">
          <p>"Best laundry service ever! Highly recommend."</p>
          <span>- Jane Doe</span>
        </div>
        <div className="review">
          <p>"Fast, efficient, and affordable. Love it!"</p>
          <span>- John Smith</span>
        </div>
      </section>
    </div>
  );
}

export default Home;
