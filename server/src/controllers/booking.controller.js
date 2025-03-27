import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBooking = async (req, res) => {
    try {
      const { userId, phoneNumber, numBaskets, matSize } = req.body;
  
  
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!numBaskets && !matSize) {
        return res.status(400).json({ error: "You must provide either number of baskets or mat size." });
      }
  
    
      const PRICES = {
        clothes: 5, 
        mats: {
          Small: 10,
          Medium: 20,
          Large: 30,
        },
      };
  
     
      const totalPrice = numBaskets
        ? numBaskets * PRICES.clothes 
        : PRICES.mats[matSize] || 0;  
  

      const booking = await prisma.booking.create({
        data: {
          name: user.name, 
          phoneNumber,
          numBaskets: numBaskets || null, 
          matSize: matSize || null, 
          totalPrice, 
          userId: user.id,
        },
        include: { user: true }, 
      });
  
      res.status(201).json({ message: "Booking created successfully", booking });
    } catch (error) {
      console.error("Booking error:", error);
      res.status(500).json({ error: "Failed to create booking" });
    }
  };
export const getBookings = async (req, res) => {
    try {
      const bookings = await prisma.booking.findMany();
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  export const deleteBooking = async (req, res) => {
    try {
      const { id } = req.params;
  
      await prisma.booking.delete({
        where: { id },
      });
  
      res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };  