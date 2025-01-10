/// <reference types="vite/client" />
export {};

declare global {
  interface ImportMetaEnv {
    VITE_API_ENDPOINT: string;
    VITE_SOCKET_ENDPOINT: string;
    VITE_SITE_USER: string;
    VITE_DOCUMENT_TEMPLATE_ENDPOINT: string;
  }

  namespace NodeJS {
    interface ProcessEnv {
      readonly SITE: "user" | "admin";
    }
  }
}
