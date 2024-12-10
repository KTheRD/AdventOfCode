const input = require("fs").readFileSync("./input", "utf-8").trim();

const primes = [2];

const getAllPrimeDivisors = (n) => {
  const divisors = [];
  let num = n;
  for (let i = 0; i < primes.length && num / 2 > primes[i]; i++) {
    if (num % primes[i] === 0) {
      divisors.push({ prime: primes[i], count: 0 });
      while (num % primes[i] === 0) {
        divisors[divisors.length - 1].count++;
        num /= primes[i];
      }
    }
  }
  if (num > 1) {
    divisors.push({ prime: num, count: 1 });
    primes.push(num);
  }
  return divisors;
};

const gerAllDivisorsReq = (n, primeDivisors, index) => {
  const divisors = [];
  if (index === primeDivisors.length) {
    return [1];
  }
  for (let i = 0; i <= primeDivisors[index].count; i++) {
    const subDivisors = gerAllDivisorsReq(n, primeDivisors, index + 1);
    divisors.push(
      ...subDivisors.map((x) => x * Math.pow(primeDivisors[index].prime, i)),
    );
  }
  return divisors;
};

const getAllDivisors = (n) => {
  const primeDivisors = getAllPrimeDivisors(n);
  return gerAllDivisorsReq(n, primeDivisors, 0);
};

for (let i = 1; ; i++) {
  const divisors = getAllDivisors(i);
  const presents = divisors.reduce((acc, x) => acc + x, 0) * 10;
  if (presents >= input) {
    console.log(i, presents);
    break;
  }
}

for (let i = 1; ; i++) {
  const divisors = getAllDivisors(i);
  const presents =
    divisors.filter((x) => i / x <= 50).reduce((acc, x) => acc + x, 0) * 11;
  if (presents >= input) {
    console.log(i, presents);
    break;
  }
}
