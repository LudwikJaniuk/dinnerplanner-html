//DinnerModel class
class DinnerModel {
    
  constructor() {
      this.dishes = dishesConst;
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
  addDishToMenu(id) {
      let dish = this.getDish(id);
      let menu = this.getFullMenu();
      let otherDish = menu.filter(elem => elem.type === dish.type).pop();
      if (otherDish != undefined) {
          this.removeDishFromMenu(otherDish.id);
      }
      this.menu.push(dish);
  }
  
  //Removes dish from menu
  removeDishFromMenu(id) {
      this.menu = this.getFullMenu().filter(dish => dish.id !== id);     
  }

  //Returns all dishes of specific type (i.e. "starter", "main dish" or "dessert").
  //query argument, text, if passed only returns dishes that contain the query in name or one of the ingredients.
  //if you don't pass any query, all the dishes will be returned
  getAllDishes(type, query) {
      return this.dishes.filter(function (dish) {
    let found = true;
    if (query) {
      found = false;
      dish.ingredients.forEach(function (ingredient) {
      if (ingredient.name.indexOf(query) !== -1) {
        found = true;
      }
      });
      if (dish.name.indexOf(query) !== -1) {
      found = true;
      }
    }
    if (!type && found) {
      return dish; 
    } else {
      return dish.type === type && found;
    }
      });
  }
  
  //Returns a dish of specific ID
  getDish(id) {
      let dish = this.dishes.filter(dish => dish.id === id).pop();
      return dish;
  }
}    
// load your api key here
const clientKey = getClientKey();
const authHeader={"X-Mashape-Key":clientKey};
const URL = "http://sunset.nada.kth.se:8080/iprog/group/11/";
const request = "recipes/search"
fetch(URL+request, {
    method: "GET",
    headers: authHeader;
})
.then(handleHTTPError)
.then(response => response.json())
.then(object => fetch("https://api.imgur.com/3/image"+object.data.deleteHash, {
    method: "POST",
    body: createFormData({description: "some image description"});
    headers: authHeader;
})
.then(handleHTTPError)
.then(console.log)
.catch(console.error)