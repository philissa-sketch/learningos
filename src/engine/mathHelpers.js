// ---------------------------------------------------------------------------
// Small math helpers used by problem templates. Kept dependency-free and
// pure so templates stay easy to unit-test.
// ---------------------------------------------------------------------------

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function choice(array) {
  return array[randInt(0, array.length - 1)];
}

export function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

/** Reduce a fraction to lowest terms, return as "p/q" string (or integer string if q divides evenly). */
export function reduceFractionToString(numerator, denominator) {
  const g = gcd(numerator, denominator);
  const n = numerator / g;
  const d = denominator / g;
  if (d === 1) return String(n);
  return `${n}/${d}`;
}

function factorsOf(n) {
  const factors = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) factors.push(i);
  }
  return factors;
}

/**
 * Explains HOW to find the greatest common factor of two numbers — not
 * just stating what it is. Lists each number's factors, then shows which
 * is the largest one they share. Used in explanations so simplifying a
 * fraction is a teachable method, not a fact to take on faith.
 */
export function explainGCF(a, b) {
  const factorsA = factorsOf(a);
  const factorsB = factorsOf(b);
  const shared = factorsA.filter((f) => factorsB.includes(f));
  const g = Math.max(...shared);
  return (
    `To find the greatest common factor of ${a} and ${b}: list each number's factors — ` +
    `${a}: ${factorsA.join(', ')}. ${b}: ${factorsB.join(', ')}. ` +
    `The largest number appearing in both lists is ${g}, so that's the greatest common factor.`
  );
}

/** Format a decimal, trimming trailing zeros, up to 4 decimal places. */
export function formatDecimal(value) {
  return String(Math.round(value * 10000) / 10000);
}
