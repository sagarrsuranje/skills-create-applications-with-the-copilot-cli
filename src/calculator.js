#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
//  - add : addition (a + b)
//  - sub : subtraction (a - b)
//  - mul : multiplication (a * b)
//  - div : division (a / b)

// Usage examples:
//   node src/calculator.js add 2 3   -> 5
//   node src/calculator.js sub 5 2   -> 3
//   node src/calculator.js mul 3 4   -> 12
//   node src/calculator.js div 10 2  -> 5

function showUsage() {
  console.error('Usage: node src/calculator.js <command> <num1> <num2>');
  console.error('Commands: add, sub, mul, div');
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

function add(a, b) { return a + b; }
function sub(a, b) { return a - b; }
function mul(a, b) { return a * b; }
function div(a, b) { return a / b; }

function main(argv) {
  const cmd = argv[2];
  const aStr = argv[3];
  const bStr = argv[4];

  if (!cmd || !aStr || !bStr) {
    showUsage();
    process.exit(1);
  }

  const a = toNumber(aStr);
  const b = toNumber(bStr);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: Both operands must be valid numbers.');
    process.exit(1);
  }

  let result;
  switch (cmd) {
    case 'add':
      result = add(a, b);
      break;
    case 'sub':
      result = sub(a, b);
      break;
    case 'mul':
      result = mul(a, b);
      break;
    case 'div':
      if (b === 0) {
        console.error('Error: Division by zero is not allowed.');
        process.exit(1);
      }
      result = div(a, b);
      break;
    default:
      console.error(`Error: Unknown command '${cmd}'.`);
      showUsage();
      process.exit(1);
  }

  // Print result to stdout
  console.log(result);
}

if (require.main === module) {
  main(process.argv);
}

// Export functions for testing or reuse
module.exports = { add, sub, mul, div, toNumber };
