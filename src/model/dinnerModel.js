// DinnerModel class
class DinnerModel {
	constructor() {
		// APIConfig is declared in separate file APIConfig.js
		this.APIConfig = APIConfig;
		this.numberOfGuests = 0;
		this.menu = [];
	}

	setNumberOfGuests(num) {
		if (num >= 0) {
			this.numberOfGuests = num;
		}
	}

	getNumberOfGuests() {
		return this.numberOfGuests;
	}

	// Returns the dish that is on the menu for selected type 
	getSelectedDish(type) {
		let res = this.getFullMenu().filter(x => x.type === type).pop();
		return res;
	}

	// Returns all the dishes on the menu.
	getFullMenu() {
		return this.menu;
	}

	// Returns all ingredients for all the dishes on the menu.
	getAllIngredients() {
		let res = this.getFullMenu().map(dish => dish.ingredients).flat();
		return res;
	}

	// Returns the total price of the menu (all the ingredients multiplied by number of guests).
	getTotalMenuPrice() {
		res = this.getAllIngredients().map(a => a.price).reduce((acc, elem) => acc + elem, 0) * this.getNumberOfGuests();
		return res;
	}

	// Adds the passed dish to the menu. If the dish of that type already exists on the menu
	// it is removed from the menu and the new one added.
	addDishToMenu(data) {
		let menu = this.getFullMenu();
		let otherDish = menu.filter(elem => data.dishTypes.includes(elem.type))[0];
		if (otherDish != undefined) {
			this.removeDishFromMenu(otherDish.id);
		}
		this.menu.push(data);
	}

	// Removes dish from menu
	removeDishFromMenu(id) {
		this.menu = this.getFullMenu().filter(dish => dish.id !== id);
	}

	// Returns all dishes of specific type (i.e. "starter", "main dish" or "dessert").
	// query argument, text, if passed only returns dishes that contain the query in name or one of the ingredients.
	// if you don't pass any query, all the dishes will be returned
	getAllDishes(type, query) {
		let request = "search";

		if (type || query) {
			request += '?';
			if (type) {
				request += 'type=' + type;
				if (query) {
					request += '&';
				}
			}
			if (query) {
				request += 'query=' + query;
			}
		}

		const authHeader = { "X-Mashape-Key": this.APIConfig.key };
		let dishes = fetch(this.APIConfig.host + request, {
			method: "GET",
			headers: authHeader
		})
			.then(handleErrors)
			.then(response => response.json())
			.then(response => response.results)
			.catch(function (error) {
				console.log(error);
			})
			.finally(function () {
				document.getElementById("loader").style.display = "none";
			});

		return dishes;
	}

	// Returns a dish of specific ID
	getDish(id) {
		const request = id + "/information/";
		const authHeader = { "X-Mashape-Key": this.APIConfig.key };
		let dish = fetch(this.APIConfig.host + request, {
			method: "GET",
			headers: authHeader
		})
			.then(handleErrors)
			.then(function (response) {
				return response.json()
			})
			.catch(function (error) {
				console.log(error);
			})
			.finally(function () {
				document.getElementById("loader").style.display = "none";
			});
		return dish;
	}
}

function handleErrors(response) {
	if (!response.ok && response.status !== 404) {
		console.log('Error caught in handler.');
		throw Error(response.statusText);
	}
	return response;
}