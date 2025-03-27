import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Detail.css";

const PRICES = {
  clothes: 5,
  mats: {
    Small: 10,
    Medium: 20,
    Large: 30,
  },
};

const DetailPage = () => {
  const { type } = useParams();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [baskets, setBaskets] = useState(1);
  const [matSize, setMatSize] = useState("Small");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setName(storedUser.name || "");
      setPhoneNumber(storedUser.phone || "");
    }
  }, []);

  const totalPrice = type === "clothes" ? baskets * PRICES.clothes : PRICES.mats[matSize];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        throw new Error("User not found. Please log in again.");
      }

      const bookingDetails = {
        userId: storedUser.id, // Assuming the user object has an `id`
        phoneNumber,
        numBaskets: type === "clothes" ? baskets : null,
        matSize: type === "mats" ? matSize : null,
        totalPrice,
      };

      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingDetails),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to place order");
      }

      toast.success(` Order placed successfully! Total: $${totalPrice}`, {
        position: "top-right",
        autoClose: 3000,
      });

      // Reset form
      setBaskets(1);
      setMatSize("Small");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="detail-container">
      <ToastContainer />
      <div className="small-container">
        <h2>{type === "clothes" ? "Clothes Cleaning" : "Mats Cleaning"}</h2>
        <form className="detail-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>

          <label>
            Phone Number:
            <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          </label>

          {type === "clothes" ? (
            <label>
              Number of Baskets:
              <input
                type="number"
                min="1"
                value={baskets}
                onChange={(e) => setBaskets(parseInt(e.target.value, 10))}
                required
              />
            </label>
          ) : (
            <label>
              Mat Size:
              <select value={matSize} onChange={(e) => setMatSize(e.target.value)}>
                <option value="Small">Small - $10</option>
                <option value="Medium">Medium - $20</option>
                <option value="Large">Large - $30</option>
              </select>
            </label>
          )}

          <h3>Total Price: ${totalPrice}</h3>
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DetailPage;
