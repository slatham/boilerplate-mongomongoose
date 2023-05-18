const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

arrayOfPeople = [{name:"STe", age:22, favoriteFoods:["Bacon", "Eggs"]},{name: "Sid", age:44, favoriteFoods:["Sausage", "Mince"]}];



let personSchema = new mongoose.Schema ({

	name: {type: String, required: true},
	age: Number,
	favoriteFoods: [String]


});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {

  let steve = new Person({
	name: 'Stephen Latham',
	age: '41',
	favoriteFoods: ['Chips', 'Sausage']

  })
  steve.save()
	.then((doc) => {done(null, doc);})
  .catch((err) => {

	console.error(err)
})

};

const createManyPeople = (arrayOfPeople, done) => {


 Person.create(arrayOfPeople, function (err, data) {

	if(err) return console.log(err);
	done(null, data);


})


};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName}, function (err, data) {
	if(err) {
		console.log(err)
	} else {
	done(null, data);
	}
})
};

const findOneByFood = (food, done) => {


	Person.findOne({favoriteFoods: food}, function(err, data) {
	if(err) {
	 	console.log(err)
	} else {

		done(null, data)
	}


})


};

const findPersonById = (personId, done) => {

	Person.findById(personId, function(err, data) {

	if(err) {
		console.log(err)
	} else {
		done(null, data)
	}

})


};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function(err, data){

	if(err) {
		console.log(err)
	} else {
		
		data.favoriteFoods.push(foodToAdd)
		data.save((err, updatePerson) => {
			done(null, updatePerson)

		})
	}

})
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
	
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, data) {
	if(err) return console.log(err)
	done(null, data)

})

};

const removeById = (personId, done) => {
	Person.findByIdAndRemove(personId, function(err, data) {

	if(err) return console.log(err)

	done(null, data)

})

};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

	Person.remove({name: nameToRemove}, function(err, data) {

	if(err) return console.log(err)

	done(null, data)
})

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
	Person.find({favoriteFoods: foodToSearch}).sort({name: 'asc'}).limit(2).select('-age').exec(function(err, data) {
	if(err) return console.log(err)

	done(null, data)

})
	
 
};



/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
