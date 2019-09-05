//DinnerModel class
class DinnerModel {
    
  constructor() {
      this.numberOfGuests = 0;
      this.menu = [];
  }
  
  setNumberOfGuests(num) {
      if (num<0) {num *= -1};
      this.numberOfGuests = num;
  }
  
  getNumberOfGuests() {
      return this.numberOfGuests;
  }
  
  //Returns the dish that is on the menu for selected type 
  getSelectedDish(type) {
      let res = this.getFullMenu().filter(x => x.type === type).pop();
      return res;               
  }
  
  //Returns all the dishes on the menu.
  getFullMenu() {
      return this.menu;
  }
  
  //Returns all ingredients for all the dishes on the menu.
  getAllIngredients() {
      let res = this.getFullMenu().map(dish => dish.ingredients).flat();
      return res;
  }
  
  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  getTotalMenuPrice() {
      res = this.getAllIngredients().map(a => a.price).reduce((acc, elem) => acc + elem, 0)*this.getNumberOfGuests();
      return res;
  }
  
  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  addDishToMenu(data) {
      let menu = this.getFullMenu();
      let otherDish = menu.filter(elem => data.dishTypes.includes(elem.type)).pop();
      if (otherDish != undefined) {
          this.removeDishFromMenu(otherDish.id);
      }
      this.menu.push(data);
  }
  
  //Removes dish from menu
  removeDishFromMenu(id) {
      this.menu = this.getFullMenu().filter(dish => dish.id !== id);     
  }

  //Returns all dishes of specific type (i.e. "starter", "main dish" or "dessert").
  //query argument, text, if passed only returns dishes that contain the query in name or one of the ingredients.
  //if you don't pass any query, all the dishes will be returned
  getAllDishes(type, query) {
		let host = "http://sunset.nada.kth.se:8080/iprog/group/11/";
		let key = "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767";
		const authHeader={"X-Mashape-Key": key};
		let request = "recipes/search";
		if (type || query) {
			request += '?';
			if (type) {
				request += 'type='+type;
				if (query) {
					request += '&';
				}
			}
			if (query) {
				request += 'query='+query;
			}
		}
		
		let dishes = fetch(host+request, {
			method: "GET",
			headers: authHeader
		})
		.then(handleErrors)
		.then(response => response.json())
		.then(response => response.results)
		.catch(function(error) {
			console.log(error);
		});

    return dishes;
  }
  
	//Returns a dish of specific ID
  getDish(id) {
		/* THIS GOES AGAINST CORS POLICY - DOESNT WORK!
		let actual_JSON = null;
		loadJSON(function(response) {
			actual_JSON = JSON.parse(response);
			console.log(actual_JSON);
		});
		*/
		let host = "http://sunset.nada.kth.se:8080/iprog/group/11/";
		let key = "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767";
    const authHeader={"X-Mashape-Key": key};
		const request = "recipes/"+id+"/information/";
		let dish = fetch(host+request, {
			method: "GET",
			headers: authHeader
		})
		.then(handleErrors)
		.then(function(response) {
			document.getElementById("loader").style.display = "none";
			return response.json()
		})
		.catch(function(error) {
			console.log(error);
		});
		return dish;
	}
		
}    

function handleErrors(response) {
	if(!response.ok && response.status !== 404) {
		console.log('error caught in handler');
		throw Error(response.statusText);
	}
	return response;
}

function loadJSON(callback) {
	let xhr = new XMLHttpRequest();
	xhr.overrideMimeType("application/json");
	xhr.open('GET', 'config.json', true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status === 200) {
			callback(xhr.responseText);
		}
	};
	xhr.send(null);
}