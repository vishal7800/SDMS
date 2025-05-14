import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-form">
      <h1>Contact Us</h1>
      <div className="container">
        <div className="main">
          <div className="content">
            <h2>Contact Us</h2>
            <form action="https://api.web3forms.com/submit" method="POST">
              <input type="hidden" name="access_key" value="1ed2bd84-0d8b-47d2-99ee-c8b3797c4034" />
              <input type="text" name="name" placeholder="Enter Your Name" required />
              <input type="email" name="email" placeholder="Enter Your Email" required />
              <textarea name="message" placeholder="Your Message" required></textarea>
              <button type="submit" className="btn">
                Send <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
          <div className="form-img">
            <img src="bg1.png" alt="Contact Illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
