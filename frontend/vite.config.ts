/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig(({ mode }) => {
  const appPort = Number(process.env.VITE_APP_PORT);

  return {
    plugins: [],
    server: {
      port: appPort,
    },
    preview: {
      port: appPort,
    },
  };
});

