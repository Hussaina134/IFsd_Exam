const prompt = require('prompt-sync')();

class Shop {
  constructor(name, rent) {
    this.name = name;
    this.rent = rent;
  }
}

class RentCalculator {
  constructor() {
    this.shops = [];
  }

  addShop(name, rent) {
    const shop = new Shop(name, rent);
    this.shops.push(shop);
  }

  calculateTotalRent() {
    let totalRent = 0;
    for (const shop of this.shops) {
      totalRent += shop.rent;
    }
    return totalRent;
  }
}

function main() {
  const calculator = new RentCalculator();

  // Taking user input for number of shops
  const numShops = parseInt(prompt('Enter the number of shops: '));

  // Taking user input for each shop's name and rent
  for (let i = 1; i <= numShops; i++) {
    const name = prompt(`Enter the name of shop ${i}: `);
    const rent = parseFloat(prompt(`Enter the rent of shop ${i}: `));
    calculator.addShop(name, rent);
  }

  // Calculating total rent
  const totalRent = calculator.calculateTotalRent();
  console.log("Total Rent:", totalRent);
}

// Calling the main function
main();
