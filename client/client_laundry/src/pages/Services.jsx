import { Link } from 'react-router-dom';
import clothes from "../assets/clothes.jpg"
import mats from "../assets/mats.jpg"
import './Services.css';

function Services() {
  return (
    <div className="services-container">
      <h2>Our Services</h2>
      <div className="services-list">
        <div className="service-card">
          <img src={mats} alt="Mat Cleaning" />
          <h3>Mat Cleaning</h3>
          <p>Professional mat cleaning for all sizes.</p>
          <Link to="/clean/mats" className="btn">Clean Now</Link>
        </div>

        <div className="service-card">
          <img src={clothes} alt="Clothes Cleaning" />
          <h3>Clothes Cleaning</h3>
          <p>Expert washing and dry-cleaning for clothes.</p>
          <Link to="/clean/clothes" className="btn">Clean Now</Link>
        </div>
      </div>
    </div>
  );
}

export default Services;
