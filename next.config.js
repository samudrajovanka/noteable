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
        SECRET_KEY: process.env.SECRET_KEY_DEV,
        CALLBACK_URL: 'http://localhost:3000',
        BASE_URL: 'http://localhost:3000/api',
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
      SECRET_KEY: process.env.SECRET_KEY,
      CALLBACK_URL: 'https://noteable-task.vercel.app/',
      BASE_URL: 'https://noteable-task.vercel.app/api',
    },
  };
};
