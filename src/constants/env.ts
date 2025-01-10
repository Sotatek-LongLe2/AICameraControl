export const SITE_APP = process.env.SITE;
export const SITE_USER = SITE_APP === "user";
export const SITE_ADMIN = SITE_APP === "admin";

export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
export const VITE_SITE_USER = import.meta.env.VITE_SITE_USER;
export const VITE_DOCUMENT_TEMPLATE = import.meta.env
  .VITE_DOCUMENT_TEMPLATE_ENDPOINT;
