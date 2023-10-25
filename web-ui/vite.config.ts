import * as path from 'path';
import fs from 'fs';
import { PluginOption, defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

import mockDevServerPlugin from 'vite-plugin-mock-dev-server';
import UnoCSS from 'unocss/vite';
import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd();

  const env = loadEnv(mode, root);
  const { VITE_APP_PORT, VITE_APP_MOCK } = env;

  console.log('mode:', mode);
  console.log('env:', env);
  console.log('command:', command);

  const isBuild = (command === 'build');

  // vite plugin
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    UnoCSS({
      configFile: './uno.config.ts',
    }),
    react(),
    // vite-plugin-svg-icons
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(__dirname, './src/assets/iconsvg')],
      // Specify symbolId format
      symbolId: 'icon-[name]',
    }),
  ];

  // vite-plugin-mock
  if (VITE_APP_MOCK === 'true') {
    vitePlugins.push(
      mockDevServerPlugin({
        include: 'mock/**/*.mock.{ts,js,cjs,mjs,json,json5}',
        formidableOptions: {
          uploadDir: path.join(process.cwd(), './mock/_uploads'),
          filename: (name, ext, part) => {
            return part.originalFilename!;
          },
        },
      }),
    );
  }

  return {
    root,
    clearScreen: false,
    server: {
      host: true,
      port: Number(VITE_APP_PORT || 9000),
      https: {
        key: fs.readFileSync('../config/security/cert.key'),
        cert: fs.readFileSync('../config/security/cert.pem'),
      },
      // proxy: {
      //   '/api': {
      //     // For forwarding requests in the development environment
      //     // For more, please refer to：https://vitejs.dev/config/#server-proxy
      //     target: 'https://vitejs.dev/config/#server-proxy',
      //     changeOrigin: true,
      //   },
      // },
      proxy: {
        '^/api': '',
      },
    },
    preview: {
      port: Number(VITE_APP_PORT || 9000),
    },
    resolve: {
      alias: [
        {
          find: /^~/,
          replacement: `${path.resolve(__dirname, '../node_modules')}/`,
        },
        {
          find: /@\//,
          replacement: `${path.resolve(__dirname, './src')}/`,
        },
      ],
    },
    // optimizeDeps: {
    //   esbuildOptions: {
    //     target: 'es2020'
    //   }
    // },
    build: {
      target: 'ES2020',
      sourcemap: !isBuild,
    },
    // define: {
    //   __IS_DEVELOPMENT__: JSON.stringify(mode === 'development'),
    // },
    plugins: vitePlugins,
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'primary-color': '#0348A2',
            'menu-dark-bg': '#0348A2',
            'menu-dark-inline-submenu-bg': '#0348A2',
          },
          javascriptEnabled: true,
        },
      },
    },
  };
});
