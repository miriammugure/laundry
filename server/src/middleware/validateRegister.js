export const validateRegister = (req, res, next) => {
    const { name, email, phone, password, confirmPassword } = req.body;
    if (!name || !email || !phone || !password || password !== confirmPassword) {
      return res.status(400).json({ error: 'Invalid input or passwords do not match' });
    }
    next();
  };