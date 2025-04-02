import React, { useState, useEffect } from "react";
import "./Chatbot.css";
import { jwtDecode } from "jwt-decode";



const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState(null); // State to hold user ID

  useEffect(() => {
    // Fetch bookings when the component mounts
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getbookings");
        if (!response.ok) throw new Error("Failed to fetch bookings");
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    // Get user ID from localStorage (JWT token)
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token); // Decode the JWT token to extract the userId
      setUserId(decoded.id); // Save userId to state
      console.log("User ID from localStorage:", decoded.id); // Log userId
    }

    fetchBookings(); // Fetch the bookings data
  }, []); // Only fetch bookings once, on mount

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    const botResponse = await getBotResponse(input, userId); // Pass userId as a parameter
    setMessages([...newMessages, { sender: "bot", text: botResponse }]);
    setInput("");
  };

  const getBotResponse = async (userInput, userId) => {
    return await askGemini(userInput, userId); // Pass userId to Gemini API
  };

  const askGemini = async (question, userId) => {
    try {
      // Ensure userId is available and valid before proceeding
      if (!userId) {
        return "I couldn't find a user ID. Please make sure you're logged in.";
      }

      console.log("User ID:", userId);
      console.log("Bookings:", bookings);

      // Find the booking associated with the logged-in user
      const userBooking = bookings.find((b) => String(b.userId) === String(userId));

      let bookingDetails;
      if (userBooking) {
        const orderTime = new Date(userBooking.createdAt);
        const readyTime = new Date(orderTime.getTime() + 90 * 60000); // Adding 90 minutes to order time

        // Format times in 12-hour format
        const formattedOrderTime = orderTime.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        const formattedReadyTime = readyTime.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        bookingDetails = `You placed a laundry order at ${formattedOrderTime}, and it will be ready by ${formattedReadyTime}.`;
      } else {
        bookingDetails = "You have no active laundry bookings in the system.";
      }

      const structuredPrompt = `
        You are a helpful AI assistant for a laundry service. Your task is to answer questions based on the provided booking information.
        
        **User Question:** ${question}
        **Booking Details:** ${bookingDetails}
        
        If the user asks about when their clothes will be ready, use the provided booking details to calculate the exact pickup time. If there are no bookings, inform them politely.
      `;

      // Call Gemini API to get the chatbot response
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: structuredPrompt }] }], // Send structured prompt to Gemini API
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Response Data:", data);

      if (data.candidates && data.candidates.length > 0) {
        return data.candidates[0].content.parts[0].text;
      } else {
        console.error("Gemini API Response Format Error:", data);
        return "I'm having trouble answering right now. Please try again later.";
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I'm having trouble answering right now. Please try again later.";
    }
  };

  return (
    <div className="chatbot-container">
      <h2>Chat with LaundryBot</h2>
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chatbot;
