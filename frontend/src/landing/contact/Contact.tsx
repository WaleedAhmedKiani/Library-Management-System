import './Contact.css';

export const Contact = () => {
    return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Left Side Info */}
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>We’d love to hear from you! Reach out with any questions or feedback.</p>

          <div className="contact-details">
            <p><strong>Email:</strong> info@yourlibrary.com</p>
            <p><strong>Phone:</strong> +92 300 1234567</p>
            <p><strong>Address:</strong> Main Street, Islamabad, Pakistan</p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="contact-form">
          <h3>Send us a message</h3>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows={5} required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}