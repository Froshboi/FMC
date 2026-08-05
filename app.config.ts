import { defineConfig } from "@tanstack/react-start/config";

export default defineConfig({
  server: {
    preset: "static",
    prerender: {
      routes: ["/"],
      crawlLinks: true, // discovers all linked routes and prerenders them too
    },
  },
});