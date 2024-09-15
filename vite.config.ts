import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const rootDirectory = env.VITE_ROOT_DIR;

  return {
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
        outDir: "dist",
      }),
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "FieldAppComponents",
        formats: ["es", "umd"],
        fileName: (format) => `field-app-components.${format}.js`,
      },
      rollupOptions: {
        external: ["react", "react-dom"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
      cssCodeSplit: false,
    },
    server: {
      port: 5555,
      cors: true,
      open: true,
      strictPort: true,
    },
    preview: {
      port: 5555,
      strictPort: true,
    },
    root: rootDirectory,
  };
});
