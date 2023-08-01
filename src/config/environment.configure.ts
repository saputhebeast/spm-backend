export const EnvironmentConfiguration = () => {
  const config = {
    NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 3001,
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
    db: { url: process.env.DATABASE_URL },
  };
  return config;
};
