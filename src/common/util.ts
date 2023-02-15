// 이메일 조건: @ 포함
// 비밀번호 조건: 8자 이상

export const emailChecker = (email: string): boolean => {
  return email.includes("@");
};

export const passwordChecker = (password: string): boolean => {
  return password.length >= 8;
};
