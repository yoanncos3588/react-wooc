import { isRequired } from "./rules";
import { Rule } from "./validation";

interface Type {
  [key: string]: Rule[];
}

const user: Type = {
  username: [isRequired],
  password: [isRequired],
};

export default user;
