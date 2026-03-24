const { add, sub, mul, div, modulo, power, squareRoot } = require('../calculator');
const { spawnSync } = require('child_process');

describe('calculator functions', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('addition: negative and float values', () => {
    expect(add(-1, 1)).toBe(0);
    expect(add(2.5, 0.5)).toBeCloseTo(3.0);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(sub(10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(mul(45, 2)).toBe(90);
  });

  test('multiplication with zero', () => {
    expect(mul(5, 0)).toBe(0);
  });

  test('division: 20 / 5 = 4', () => {
    expect(div(20, 5)).toBe(4);
  });

  test('division: floating point result', () => {
    expect(div(7, 2)).toBeCloseTo(3.5);
  });

  test('division by zero returns Infinity when using exported function', () => {
    expect(div(1, 0)).toBe(Infinity);
  });

  // New operation unit tests
  test('modulo: 5 % 2 = 1', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('power: 2 ^ 3 = 8', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('squareRoot: sqrt(16) = 4', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('squareRoot of negative number throws', () => {
    expect(() => squareRoot(-9)).toThrow(/square root of negative/i);
  });
});

describe('CLI integration', () => {
  test('CLI add 2 3 prints 5 and exits 0', () => {
    const r = spawnSync(process.execPath, ['src/calculator.js', 'add', '2', '3'], { encoding: 'utf8' });
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toBe('5');
  });

  test('CLI division by zero exits with non-zero code and prints error', () => {
    const r = spawnSync(process.execPath, ['src/calculator.js', 'div', '1', '0'], { encoding: 'utf8' });
    // Expect non-zero exit code
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/division by zero/i);
  });

  test('CLI invalid number returns non-zero exit code', () => {
    const r = spawnSync(process.execPath, ['src/calculator.js', 'add', 'a', '1'], { encoding: 'utf8' });
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/operands must be valid numbers/i);
  });

  // New CLI integration tests
  test('CLI mod 5 2 prints 1 and exits 0', () => {
    const r = spawnSync(process.execPath, ['src/calculator.js', 'mod', '5', '2'], { encoding: 'utf8' });
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toBe('1');
  });

  test('CLI pow 2 3 prints 8 and exits 0', () => {
    const r = spawnSync(process.execPath, ['src/calculator.js', 'pow', '2', '3'], { encoding: 'utf8' });
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toBe('8');
  });

  test('CLI sqrt 16 prints 4 and exits 0', () => {
    const r = spawnSync(process.execPath, ['src/calculator.js', 'sqrt', '16'], { encoding: 'utf8' });
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toBe('4');
  });

  test('CLI sqrt -1 returns non-zero and prints error', () => {
    const r = spawnSync(process.execPath, ['src/calculator.js', 'sqrt', '-1'], { encoding: 'utf8' });
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/square root of negative/i);
  });

  test('CLI mod by zero exits non-zero and prints error', () => {
    const r = spawnSync(process.execPath, ['src/calculator.js', 'mod', '1', '0'], { encoding: 'utf8' });
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/modulo by zero/i);
  });
});
