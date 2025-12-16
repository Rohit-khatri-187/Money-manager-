export const validateEmail = (email) => {
  const trimmed = email.trim();
  if (!trimmed) return false;

  const reExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return reExp.test(trimmed);
};
