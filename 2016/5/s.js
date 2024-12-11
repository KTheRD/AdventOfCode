const input = require("fs").readFileSync("./input", "utf-8").trim();
const createHash = require("crypto").createHash;

{
  let password = "";
  for (let i = 0; password.length < 8; i++) {
    const hash = createHash("md5")
      .update(input + i.toString())
      .digest("hex");
    if (hash.startsWith("00000")) {
      password += hash[5];
      console.log(password);
    }
  }
  console.log(password);
}

{
  let password = [];
  for (let i = 0; password.length < 8; i++) {
    const hash = createHash("md5")
      .update(input + i.toString())
      .digest("hex");
    if (hash.startsWith("00000")) {
      const pos = parseInt(hash[5]);
      if (pos < 8 && password[pos] === undefined) {
        password[pos] = hash[6];
        console.log(password.join(""));
      }
    }
  }
  console.log(password.join(""));
}
