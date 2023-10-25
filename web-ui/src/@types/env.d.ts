
/// <reference types="vite/client" />

// vite import.meta.env variable
interface ImportMetaEnv {
  readonly VITE_MOCK_APP_APIHOST: string; // api interface mock name
  readonly VITE_APP_APIHOST: string; // api interface domain name
  readonly VITE_APP_API_VERSION: string; // api version
  // More environment variables...
}
// vite import.meta.env variable
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

