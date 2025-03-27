export const validateEmail = (v: string): boolean => {
  return /\S+@\S+\.\S+/.test(v);
};

export const validatePassword = (v: string): boolean => {
  return v.slice(0, 7) === "$2a$10$";
};

export const validateIdentifier = (v: string): boolean => {
  return /^([a-z0-9_-]){4,32}$/.test(v);
};

export const validateUrl = (v: string): boolean => {
  return /^[a-zA-Z0-9_-]+$/.test(v);
};
