const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString("hex");
console.log("SECRET_KEY=", secretKey);
