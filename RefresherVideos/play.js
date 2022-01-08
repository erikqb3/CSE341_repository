// const name = "Erik";
// let age = 24;
// var hasHobbies = true;

// age = 25;

// function summarizeUser(userName,userAge,userHasHobbies) {
//   return("Name is "+ 
//   userName + ", age is " + 
//   userAge + ", and the user has hobbies: " + 
//   userHasHobbies)
// }

/////////////////
// const summarizeUser = function (userName,userAge,userHasHobbies) {
//     return("Name is "+ 
//   userName + ", age is " + 
//   userAge + ", and the user has hobbies: " + 
//   userHasHobbies)
// }


// const summarizeUser = (userName, userAge, userHasHobby) => {
//   return("Name is "+ 
//   userName + ", age is " + 
//   userAge + ", and the user has hobbies: " + 
//   userHasHobbies)
// }  

// // const add = (a,b) => {
// //   return a + b;
// // }

// const add = (a,b) => a+b;
// const addOne = a => a +1;
// const addRandom = () => 1+2


// console.log(summarizeUser(name,age,hasHobbies))


////////////////////
// const person = {
//   name: "Erik",
//   age: 24,
//   greet () {
//     console.log("Hi, I am " + this.name);
//   }
// }
// person.greet();
////////////////////


// const hobbies = ['Reading','Drawing','Videogames','Music'];
// for (let hobby of hobbies) {
//   console.log(hobby)
// }

// console.log(hobbies.map(hobby => "Hobby: " + hobby)); //map makes a new array
// console.log(hobbies);

///////////////////////////////////

// const hobbies = ['Reading','Drawing','Videogames','Music'];
// hobbies.push('Programming');
// console.log(hobbies)

/////////////////////////////////
// const person = {
//   name: "Erik",
//   age: 24,
//   greet () {
//     console.log("Hi, I am " + this.name);
//   }
// }
// const hobbies = ['Reading','Drawing','Videogames','Music'];
// // const copiedArray = hobbies.slice(); //slice simply copies an array

// // const copiedArray = [hobbies] //Nope
// const copiedArray = [...hobbies]; // "..." = spread operator, takes object after ..., pulls stuff from it, and adds it to whatever it's in ([]) //Yes
// const copiedPerson = {...person}
// console.log(copiedArray);


// // const toArray = (arg1, arg2, arg3) => {
// //   return [arg1, arg2, arg3];
// // };

// const toArray = (...args) => args; //"..." takes whatever parameters are given and bundles them into an array
// console.log(toArray(1,2,3,4,5,6,7,8,9))

// // "..." is a spread oporator when it takes stuff out of an array or object, and a rest operator when it puts stuff back into an array


/////////////////


// const person = {
//   name: "Erik",
//   age: 24,
//   greet () {
//     console.log("Hi, I am " + this.name);
//   }
// }

// // const printName = (personData) => {
// //   console.log(personData.name);
// // }

// const printName = ({ name, age }) => { //object deconstructuring pulls out of object and makes it's own variable
//   console.log(name);
// }

// printName(person);

// const { name, age } = person; // {} is object destructuring, based on name
// // console.log(person.name, person.age) //Before
// console.log(name, age) //After

// const hobbies = ['Reading','Drawing','Videogames','Music'];
// const [hobby1, hobby2] = hobbies;
// console.log(hobby1, hobby2); //array destructuring; pulls out based on position

////////////////////////////


//How to work with Async Code

//asynchronise code --> take time no matter how short
setTimeout( ()=> {
  console.log("Timer is done!")
},2000);

setTimeout( ()=> { 
  console.log("Booom!")
},1);

//synchronise code, instantly after the other
console.log("Pokemon");
console.log("is Cool!");

//synchronise code before asynchronise no matter how fast the asynchronise code is.


const fetchData = callback => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      callback("Done");
    }, 1500);
  });
  return promise;
};

// setTimeout(() => {
//   console.log("Timer is donezo");
//   fetchData(text => {
//     console.log(text);
//   });
// }, 2000);

setTimeout(() => {
  console.log("Timer is donezo");
  fetchData()
  .then(text => {
    console.log(text);
    return fetchData();
  })
  .then(text2 => {
    console.log(text2);
  });
}, 2000);