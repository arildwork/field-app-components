import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";
import Unfonts from "unplugin-fonts/vite";

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
      Unfonts({
        google: {
          display: "swap",
          injectTo: "head-prepend",
          families: [
            {
              name: "Lato",
              styles:
                "ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900",
              defer: true,
            },
          ],
        },
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
        external: [
          "react",
          "react-dom",
          "moment",
          "primeicons",
          "primereact",
          "uuid",
        ],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            moment: "moment",
            primeicons: "primeicons",
            primereact: "primereact",
            uuid: "uuid",
          },
        },
      },
      cssCodeSplit: false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/assets/styles/main";`,
        },
      },
    },
    server: {
      port: 5555,
      cors: true,
      strictPort: true,
    },
    preview: {
      port: 5555,
      strictPort: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    root: rootDirectory,
  };
});
