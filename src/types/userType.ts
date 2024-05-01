export type LogInType = {
  password: string;
  username: string;
};

export type RegisterType = LogInType & {
  email: string;
};
