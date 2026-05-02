const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const path = require("path");

module.exports = defineConfig(async ({ mode }) => {
  // Initialize plugin list. React SWC gives faster TS/JSX compilation.
  const plugins = [react()];
  require("./src/utils/vite");
  // Only include the component tagger (or other dev-only plugins) in development.
  if (mode === "development") {
    try {
      // Lazy-load a dev helper to tag or log components for easier debugging.
      // const tagger = require("./src/dev/componentTagger");
      // plugins.push(tagger());
    } catch (error) {
      console.warn("Could not load dev componentTagger:", error.message);
    }
  }

  // Final config returned to Vite.
  return {
    server: {
      host: "0.0.0.0", // Accessible from LAN — useful for mobile testing.
      port: 8080, // Default local dev port.
    },
    plugins: plugins.filter(Boolean), // Filter out any null plugins.
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // Shortcut for imports like "@/components/Button"
      },
    },
  };
});