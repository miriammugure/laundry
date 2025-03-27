import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import bookingRouter from './routes/booking.route.js';

dotenv.config();
const app = express();

app.use(
    cors({
      origin: "http://localhost:5174", 
      credentials: true, 
    })
  );
app.use(express.json());

app.use('/api', userRouter);
app.use('/api',bookingRouter)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
