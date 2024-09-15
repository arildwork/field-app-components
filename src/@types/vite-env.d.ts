/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ROOT_DIR: string;
  readonly VITE_NPM_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
