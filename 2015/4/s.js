const input = require("fs").readFileSync("./input", "utf-8").trim();

for (let i = 0; true; i++) {
  const hash = require("crypto")
    .createHash("md5")
    .update(input + i)
    .digest("hex");
  if (hash.startsWith("00000")) {
    console.log(i, hash);
  }
  if (hash.startsWith("000000")) {
    console.log(i, hash);
    break;
  }
}
