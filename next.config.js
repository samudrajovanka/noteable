const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      eslint: {
        ignoreDuringBuilds: true,
      },
      env: {
        MONGO_URI: process.env.MONGO_URI_DEV,
        API_KEY: process.env.API_KEY_DEV,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        SECRET_KEY: process.env.SECRET_KEY_DEV,
        CALLBACK_URL: 'http://localhost:3000',
      },
    };
  }

  return {
    eslint: {
      ignoreDuringBuilds: true,
    },
    env: {
      MONGO_URI: process.env.MONGO_URI,
      API_KEY: process.env.API_KEY,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      SECRET_KEY: process.env.SECRET_KEY,
      CALLBACK_URL: 'https://noteable-task.vercel.app/',
      NEXTAUTH_URL: 'https://nextauth.vercel.app/api/auth',
    },
  };
};
