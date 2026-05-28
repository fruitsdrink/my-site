// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  /** 生产站点 URL；绑定自定义域名后改为最终域名 */
  site: 'https://mostack.vercel.app',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [mdx()],
  adapter: cloudflare(),
});