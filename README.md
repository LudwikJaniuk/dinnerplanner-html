# Interaction Programing - Lab 1
=================================================

This branch contains new tests for lab 1. For more details on how to complete the assignment follow the instructions on the [course website](https://www.kth.se/social/course/DH2642).

You only need to modify dinnerModel.js. If you modify the other files, merging might be a bit more tricky for you when moving to the next lab.
It might make sense to add new files tho, for example a settings file for the API key.

## Testing

Open `index.html` in the browser and tests should run automatically

## What's in this repo
-----

* [index.html](/index.html) - open to run the tests. 
* [src/model/dinnerModel.js](/src/model/dinnerModel.js) - write code here. This is a skeleton for the model of the application, but it does not yet support the functionality needed (number of guests, selected dishes, et.c.). It also contains a first dummy hardcoded "database" to use as test data.
* [src/model/dinnerModel.test.js](/src/model/dinnerModel.test.js) - tests for the model. You do not need to modify these, but study how they are written. You might be asked to write more tests in the future. In your opinion, do these tests cover the most important areas, or would you have written them differently? 

* [src/app.js](/src/app.js) - this is the overall code of the application. It is responsible for initial setup of the app (when the page loads for the first time). You will find it more relevant when you start working with views in future labs.
* [images/](/images) - folder contains some pictures you can use for your dishes.

## Feedback

* Bra att ni inte pushat API-nyckeln, men notera att appen kraschar helt om filen saknas. Hade man kunnat göra det bättre?
* Separata HTML-filer, bra för navigering i den här labben. Tänker du en HTML per view eller en per screen? Hur ska flera views komponeras?
* Nästa steg blir ju att lägga in data dynamiskt i HTML-en, tänk på hur det ska göras! Särskilt då man inte vet t.ex. hur många divvar det ska bli!
