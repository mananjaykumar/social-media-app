export const ROOT = "/";
export const REGISTER = "/register";
export const LOGIN = "/login";

export const PROTECTED = "/protected";
export const DASHBOARD = `${PROTECTED}/dashboard`;
export const USERS = `${PROTECTED}/users`;
export const PROFILE = `${PROTECTED}/profile/:id`;
export const COMMENTS = `${PROTECTED}/comments/:id`;
