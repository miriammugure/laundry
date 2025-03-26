import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.css"
const DetailPage = () => {
    const { type } = useParams(); // Get type from URL (clothes or mats)
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [baskets, setBaskets] = useState(1);
    const [matSize, setMatSize] = useState("Small");

    return (
        <div className="detail-container">
            <div className="small-container">
            <h2>{type === "clothes" ? "Clothes Cleaning" : "Mats Cleaning"}</h2>
            <form className="detail-form">
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Phone Number:
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </label>

                {type === "clothes" ? (
                    <label>
                        Number of Baskets:
                        <input
                            type="number"
                            min="1"
                            value={baskets}
                            onChange={(e) => setBaskets(e.target.value)}
                            required
                        />
                    </label>
                ) : (
                    <label>
                        Mat Size:
                        <select value={matSize} onChange={(e) => setMatSize(e.target.value)}>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                        </select>
                    </label>
                )}

                <button type="submit">Proceed to Payment</button>
            </form>
            </div>
           
        </div>
    );
};

export default DetailPage;
