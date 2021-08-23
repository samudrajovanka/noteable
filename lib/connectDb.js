import mongoose from 'mongoose';

const connectDb = (handler, login) => async (req, res) => {
  const apiKey = req.headers['x-api-key'];

  if (!login) {
    if (apiKey !== process.env.API_KEY) {
      return res.status(403).json({
        success: false,
        message: 'You not allowed to access this resource',
      });
    }
  }

  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }

  await mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
  });

  return handler(req, res);
};

export default connectDb;
