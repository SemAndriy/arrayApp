'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////
// APP
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach((mov, i) => {
    const movType = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${movType}">${
      i + 1
    } ${movType}</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
};

calcDisplayBalance(account1.movements);

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((el, i, arr) => el.at(0))
      .join('');
  });
};
createUserNames(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*


// CODING CHALLENGE

const checkDogs = (dogsJulia, dogsKate) => {
  const updDogsJulia = dogsJulia.slice(1, -2);
  const allDogs = updDogsJulia.concat(dogsKate);
  allDogs.forEach((el, i) => {
    const description =
      el >= 3 ? `an adult, and is ${el} years old` : `still a puppy 🐶`;
    console.log(`Dog number ${++i} is ${description}`);
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE - we can take part of original array without change it
console.log(arr.slice(2));
console.log(arr.slice(2, 4)); // the end parameter is not included in output
console.log(arr.slice(-2)); // ["d", "e"]
console.log(arr.slice(-1)); // ['e'] -> last element from the array
console.log(arr.slice(1, -2)); // ['b', 'c']

// shallow copy of the array
console.log([...arr]); // ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice()); // ['a', 'b', 'c', 'd', 'e'];

// SPLICE -> CHANGE THE ORIGINAL ARRAY
console.log(arr.splice(2)); // ['c', 'd', 'e'];
console.log(arr); // ['a', 'b']
arr.splice(-1); // remove the last element from array

// REVERSE -> change original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - ')); // STRING a - b - c - d - e - f - g - h - i - j



/////////////////////////////////////////
// AT method

const arr = [23, 11, 64];
console.log(arr[0]); // 23
console.log(arr.at(0)); // 23

// traditional methods to take last element from the array
console.log(arr[arr.length - 1]); // 64
console.log(arr.slice(-1)); // [64]
console.log(arr.slice(-1)[0]); // 64

console.log(arr.at(-1)); // 64
console.log(arr.at(-2)); // 11

console.log('kseniia'.at(0)); // k
console.log('kseniia'.at(-1)); // a



///////////////////////////
// FOR EACH
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(
      `Movement ${i + 1}: Lei ha fatto prelievo di ${Math.abs(movement)}`
    );
  }
}

console.log('-----------');

movements.forEach((movement, index, array) => {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(
      `Movement ${index + 1}: Lei ha fatto prelievo di ${Math.abs(movement)}`
    );
  }
});




///////////////////////////////////////
// FOREACH with MAPS and SETS
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);

currenciesUnique.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});




const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

const momentsUsd = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(momentsUsd);

console.log('-------- for of -------');
// For of insted map
const movementsUSDFor = [];

for (const mov of movements) {
  movementsUSDFor.push(mov * eurToUsd);
}
console.log(movementsUSDFor);

const movementsDescription = movements.map(
  (mov, i, arr) =>
    `Movement ${++i}: You ${mov > 0 ? 'depositet' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescription);




///////////////////
// FILTER

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposit = movements.filter(mov => mov > 0);
const withdrawals = movements.filter(mov => mov < 0);

//////////////////
// REDUCE

const balance = movements.reduce((acc, el, i, arr) => acc + el, 0);
let balance2 = 0;

for (const mov of movements) {
  balance2 += mov;
}

// Maximum value with reduce
const max = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);
console.log(max);




/////////////////////
// Coding challenge #2

const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map((el, i, arr) => (el <= 2 ? el * 2 : 16 + el * 4));
  const adultDogs = humanAge.filter((el, i, arr) => el >= 18);
  // const average =
  //   adultDogs.reduce((acc, age) => acc + age, 0) / adultDogs.length;
  const average = adultDogs.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );
  return console.log(average);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);


*/

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

movements.filter(mov => mov > 0).map(ma);
