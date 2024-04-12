import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
    "./nuxt.proxyoverride.ts",
    "unplugin-icons/nuxt",
    '@nuxtjs/google-fonts',
    {
      families: {
        Roboto: {
          wght: [400, 600, 700],
        },
      },
      // subsets: ['latin'],
      display: 'swap',
      prefetch: false,
      preconnect: false,
      preload: false,
      download: true,
      base64: false,
    },
  ],
  nitro: {
    devProxy: {
      "/api": {
        target: "http://localhost:7745/api",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  css: ["@/assets/css/main.css", "@/assets/fonts/noto-naskh-arabic.css"],
  pwa: {
    workbox: {
      navigateFallbackDenylist: [/^\/api/],
    },
    injectRegister: "script",
    injectManifest: {
      swSrc: "sw.js",
    },
    devOptions: {
      // Enable to troubleshoot during development
      enabled: false,
    },
    manifest: {
      name: "Homebox",
      short_name: "Homebox",
      description: "Home Inventory App",
      theme_color: "#5b7f67",
      start_url: "/home",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
  },
});
