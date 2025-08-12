import { z } from "zod";
export const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "the  first name is needs at least 2 chars" })
    .max(49, { message: "no more than 48 char man" }),
  lastName: z
    .string()
    .min(2, { message: "the last name is needs at least 2 chars" })
    .max(49, { message: "no more than 48 char man" }),
  phone: z.string().refine(
    (val) => {
      
      if (!(val.length === 9 || val.length === 10)) return false;
      
      return /^(09|07|9|7)/.test(val);
    },
    {
      message:
        "Enter correct phone number",
    }
  ),

  address: z
    .string()
    .min(6, { message: "the address is needs at least 6 chars" })
    .max(60, { message: "no more than 60 char man" }),
  password: z
    .string()
    .min(8, { message: "the password is needs at least 8 chars" })
    .max(40, { message: "no more than 48 char man" }),
});
export const signinSchema = formSchema.pick({
  phone: true,
  password: true,
});
