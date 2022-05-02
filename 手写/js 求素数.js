// 素数  : 质数 2, 3,5,7,11   只有除以 自身 和 1 能被整除
function isPrime(n) {
  if (n <= 1) return false;
  if (n === 2) return true;
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function isPrimePro(n) {
  if (n <= 1) return false;
  if (n === 2) return true;
  for (let i = 2; i <= n / 2; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function isPrimeSqrt(n) {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}
function isPrimePlus(n) {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  for (let i = 2; i <= n / 2; i++) {
    if (n % i === 0) return false;
  }
  return true;
}
