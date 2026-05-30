import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.lovable.sublimarte",
  appName: "Sublimarte",
  webDir: "dist",
  server: {
    url: "https://sublimation-art-creator.lovable.app",
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;
