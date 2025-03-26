import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you! Reach out to us using the form below.</p>

            <div className="contact-content">
                <form className="contact-form">
                    <div className="input-group">
                        <label>Name</label>
                        <input type="text" placeholder="Enter your name" required />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="input-group">
                        <label>Message</label>
                        <textarea placeholder="Write your message" rows="5" required></textarea>
                    </div>
                    <button type="submit" className="btn">Send Message</button>
                </form>

                <div className="contact-details">
                    <h3>Contact Information</h3>
                    <p><strong>Email:</strong> support@laundrypro.com</p>
                    <p><strong>Phone:</strong> +123 456 7890</p>
                    <p><strong>Address:</strong> 123 Laundry Street, Clean City</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
