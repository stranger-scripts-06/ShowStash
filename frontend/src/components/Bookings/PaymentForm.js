import React, { useState } from "react";
import "./PaymentForm.css";

const PaymentForm = ({ bookingId }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true); // Trigger animation

    setTimeout(async () => {
      try {
        await fetch("http://localhost:5000/routes/paymentRoutes/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, bookingId }),
        });
        setPaymentSuccess(true);
        setTimeout(() => {
          window.location.href = "/booking-confirm";
        }, 2000);
      } catch (error) {
        setPaymentSuccess(false);
        console.error("Error processing payment:", error);
        setTimeout(() => {
          window.location.href = "/booking-confirm";
        }, 2000);
      } finally {
        setIsProcessing(false);
      }
    }, 2000); // Simulate API delay for animation
  };

  return (
    <div className="payment-form-container">
      <div className="payment-form">
        <div className="branding">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/768px-Stripe_Logo%2C_revised_2016.svg.png"
            alt="Stripe"
          />
          <p>Secure Payment Gateway</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                id="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                name="cvv"
                id="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="name">Cardholder Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="pay-button" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </form>
        {paymentSuccess !== null && (
          <div
            className={`payment-status ${
              paymentSuccess ? "success" : "failure"
            }`}
          >
            {paymentSuccess ? "Payment Successful!" : "Payment Failed!"}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
