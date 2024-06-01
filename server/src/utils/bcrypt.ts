import bcrypt from "bcrypt";

const hashValue = async (
  value: string,
  saltRound?: number
): Promise<string> => {
  return bcrypt.hash(value, saltRound || 10);
};

const compareValue = async (value: string, hashedValue: string) => {
  await bcrypt.compare(value, hashedValue).catch(() => false);
};

export { hashValue, compareValue };
