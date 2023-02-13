import { customAlphabet } from "nanoid";
export const slug = customAlphabet(
  "1234567890abcdefghjklmnoprstuvyzxqABCDEFGHIJKLMNIOPRSTUVXYZQ",
  12,
);
