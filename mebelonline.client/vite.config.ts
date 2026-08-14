import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';
import type { UserConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
    ? env.ASPNETCORE_URLS.split(';')[0]
    : 'https://localhost:7087';

const loadDevHttps = () => {
  const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
      ? `${env.APPDATA}/ASP.NET/https`
      : `${env.HOME}/.aspnet/https`;

  const certificateName = 'mebelonline.client';
  const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
  const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

  if (!fs.existsSync(baseFolder)) {
    fs.mkdirSync(baseFolder, { recursive: true });
  }

  if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (
      0 !==
      child_process.spawnSync(
        'dotnet',
        ['dev-certs', 'https', '--export-path', certFilePath, '--format', 'Pem', '--no-password'],
        { stdio: 'inherit' },
      ).status
    ) {
      throw new Error('Could not create certificate.');
    }
  }

  return {
    key: fs.readFileSync(keyFilePath),
    cert: fs.readFileSync(certFilePath),
  };
};

export default defineConfig(({ command }) => {
  const config: UserConfig = {
    plugins: [plugin()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: true,
      include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    },
  };

  if (command === 'serve') {
    const useHttp = env.VITE_HTTP === '1';
    config.server = {
      proxy: {
        '^/api/': {
          target,
          secure: false,
        },
      },
      port: Number(env.VITE_PORT || 51347),
      ...(useHttp ? {} : { https: loadDevHttps() }),
    };
  }

  return config;
});
