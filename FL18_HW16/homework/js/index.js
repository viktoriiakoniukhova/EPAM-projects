'use strict';

/**
 * Class
 * @constructor
 * @param size - size of pizza
 * @param type - type of pizza
 * @throws {PizzaException} - in case of improper use
 */
function Pizza(size, type) {
    this.type = type;
    let size_v = size;
    let extrasType = [];
    let extrasPrice = [];

    const numOfArgs = 2;

    Pizza.prototype.getSize = function () {
        return size_v.size;
    }
    Pizza.prototype.getPrice = function () {
        return size_v.price + this.type.price;
    }

    Pizza.prototype.addExtraIngredient = function (ingredient) {
        if (!ingredient) {
            throw new PizzaException('Invalid ingredient')
        }

        if (type.type === 'VEGGIE' && ingredient.extra === 'MEAT') {
            throw new PizzaException('Invalid ingredient');
        }

        extrasPrice.push(size_v.price += ingredient.price);
        extrasType.push(ingredient.extra);
        return size_v.price;
    };

    Pizza.prototype.removeExtraIngredient = function (ingredient) {
        extrasPrice.pop(this.type.price -= ingredient.price);
        const index = extrasType.indexOf(ingredient.extra);
        if (index > -1) {
            extrasType.splice(index, 1);
        }
        return this.type.price;
    };

    Pizza.prototype.getExtraIngredients = function () {
        return extrasPrice;
    };

    Pizza.prototype.getPizzaInfo = function () {
        return `Size: ${size_v.size}, type: ${
            type.type
        }; extra ingredients: ${extrasType}; price: ${
            size_v.price + this.type.price
        }UAH`;
    };

    if (arguments.length !== numOfArgs) {
        throw new PizzaException(`Required two arguments, given: ${arguments.length}`)
    }
    if (!Pizza.allowedTypes.includes(type) || !Pizza.allowedSizes.includes(size)) {
        throw new PizzaException('Invalid type');
    }
}

/* Sizes, types and extra ingredients */
Pizza.SIZE_S = { size: 'SMALL', price: 50 };
Pizza.SIZE_M = { size: 'MEDIUM', price: 75 };
Pizza.SIZE_L = { size: 'LARGE', price: 100 };

Pizza.TYPE_VEGGIE = { type: 'VEGGIE', price: 50 };
Pizza.TYPE_MARGHERITA = { type: 'MARGHERITA', price: 60 };
Pizza.TYPE_PEPPERONI = { type: 'PEPPERONI', price: 70 };

Pizza.EXTRA_TOMATOES = { extra: 'TOMATOES', price: 5 };
Pizza.EXTRA_CHEESE = { extra: 'CHEESE', price: 7 };
Pizza.EXTRA_MEAT = { extra: 'MEAT', price: 9 };

/* Allowed properties */
Pizza.allowedSizes = [Pizza.SIZE_S, Pizza.SIZE_M, Pizza.SIZE_L];
Pizza.allowedTypes = [Pizza.TYPE_VEGGIE, Pizza.TYPE_MARGHERITA, Pizza.TYPE_PEPPERONI];
Pizza.allowedExtraIngredients = [Pizza.EXTRA_TOMATOES, Pizza.EXTRA_CHEESE, Pizza.EXTRA_MEAT];


/**
 * Provides information about an error while working with a pizza.
 * details are stored in the log property.
 * @constructor
 */
function PizzaException(log) {
    this.log = log;
    PizzaException.prototype.log = function () {
        return log;
    };
}

/* It should work */ 
// // small pizza, type: veggie
// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// // add extra meat
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT);
// // check price
// console.log(`Price: ${pizza.getPrice()} UAH`); //=> Price: 109 UAH
// // add extra corn
// pizza.addExtraIngredient(Pizza.EXTRA_CHEESE);
// // add extra corn
// pizza.addExtraIngredient(Pizza.EXTRA_TOMATOES);
// // check price
// console.log(`Price with extra ingredients: ${pizza.getPrice()} UAH`); // Price: 121 UAH
// // check pizza size
// console.log(`Is pizza large: ${pizza.getSize() === Pizza.SIZE_L}`); //=> Is pizza large: false
// // remove extra ingredient
// pizza.removeExtraIngredient(Pizza.EXTRA_CHEESE);
// console.log(`Extra ingredients: ${pizza.getExtraIngredients().length}`); //=> Extra ingredients: 2
// console.log(pizza.getPizzaInfo()); //=> Size: SMALL, type: VEGGIE; extra ingredients: MEAT,TOMATOES; price: 114UAH.

// examples of errors
// let pizza = new Pizza(Pizza.SIZE_S); // => Required two arguments, given: 1

// let pizza = new Pizza(Pizza.SIZE_S, Pizza.SIZE_S); // => Invalid type

// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT);
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT); // => Duplicate ingredient

// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT); // => Invalid ingredient
