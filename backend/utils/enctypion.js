import bcrypt from "bcrypt";
import * as dotenv from "dotenv";

dotenv.config();

const encrypt = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
};

const decrypt = async (hashedPass, plainPass) => {
  return await bcrypt.compare(plainPass, hashedPass);
};

export { encrypt, decrypt };
