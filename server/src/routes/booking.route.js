import express from "express";
import { createBooking, getBookings, deleteBooking } from "../controllers/booking.controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/bookings", createBooking); 
bookingRouter.get("/getbookings", getBookings); 
bookingRouter.delete("/deletebookings/:id", deleteBooking); 

export default bookingRouter;
