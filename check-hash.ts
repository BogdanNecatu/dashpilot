import { compare, hashSync } from "bcrypt";

const hash = "$2b$10$wXZKExrV/XNnAOzQYwOr3eGXTtBAChqFHU8VpAX1mOapA7qLnAr36";
const password = "Password111@";

compare(password, hash).then((result) => console.log("Match?", result));

console.log(hashSync("Password222@", 10));
