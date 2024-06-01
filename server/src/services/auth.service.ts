export type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};

const createAccount = async (data: CreateAccountParams) => {
  // verifing the existing user
  //   create user
  // create verification code
  // send verification email
  // create session
  // sign access token && refresh token
  // return user
};

export { createAccount };
