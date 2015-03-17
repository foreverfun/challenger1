var User = require('../user');

User.find({}, function(err, documents){
  //console.log(documents.length);
  if (documents.length === 0) {
    var userElsa = new User({
      username: "Frozen",
      password:  "$2a$10$Z4mbd7PrIgww759DNdzXHOuynL1RjNqV/o4IBYMp7rm/DST4tHF4m",
      name: "Else Black",
      email: "elsefrozen@yahoo.com",
      image: "elsa.jpg",
      age: 38,
      gender: "female",
      ntrp: 2.5,
      location: "Boulder CO"
    });
    userElsa.save();

    var userBelle = new User({
      username: "Beauty",
      password:  "$2a$10$Z4mbd7PrIgww759DNdzXHOuynL1RjNqV/o4IBYMp7rm/DST4tHF4m",
      name: "Belle Johnson",
      email: "bellebeauty@gmail.com",
      image: "belle.jpg",
      age: 25,
      gender: "female",
      ntrp: 4.0,
      location: "Boulder CO"
    });
    userBelle.save();

    var userFiona = new User({
      username: "Green",
      password:  "$2a$10$Z4mbd7PrIgww759DNdzXHOuynL1RjNqV/o4IBYMp7rm/DST4tHF4m",
      name: "Fiona Smith",
      email: "foreverfun7@gmail.com",
      image: "fiona.jpeg",
      age: 42,
      gender: "female",
      ntrp: 3.5,
      location: "Boulder CO"
    });
    userFiona.save();

    var userAriel = new User({
      username: "Mermaid",
      password:  "$2a$10$Z4mbd7PrIgww759DNdzXHOuynL1RjNqV/o4IBYMp7rm/DST4tHF4m",
      name: "Ariel Jones",
      email: "arielmermaid@yahoo.com",
      image: "ariel.jpeg",
      age: 22,
      gender: "female",
      ntrp: 4.0,
      location: "Los Angeles CA"
    });
    userAriel.save(); 

    var userUrsula = new User({
      username: "Octopus",
      password:  "$2a$10$Z4mbd7PrIgww759DNdzXHOuynL1RjNqV/o4IBYMp7rm/DST4tHF4m",
      name: "Ursula Brown",
      email: "ursulaoctopus@gmail.com",
      image: "ursula.jpeg",
      age: 58,
      gender: "female",
      ntrp: 3.0,
      location: "Los Angeles CA"
    });
    userUrsula.save();


    var userShrek = new User({
      username: "Shrek",
      password:  "$2a$10$Z4mbd7PrIgww759DNdzXHOuynL1RjNqV/o4IBYMp7rm/DST4tHF4m",
      name: "Shrek Davis",
      email: "forever.fun.cj@gmail.com",
      image: "shrek.jpeg",
      age: 45,
      gender: "male",
      ntrp: 3.5,
      location: "Los Angeles CA"
    });
    userShrek.save();

    var userHomer = new User({
      username: "Homer",
      password:  "$2a$10$Z4mbd7PrIgww759DNdzXHOuynL1RjNqV/o4IBYMp7rm/DST4tHF4m",
      name: "Homer Simpson",
      email: "homersimpson@live.com",
      image: "homer.jpg",
      age: 32,
      gender: "male",
      ntrp: 2.5,
      location: "Los Angeles CA"
    });
    userHomer.save();

    var userBatman = new User({
      username: "Batman",
      password:  "$2a$10$Z4mbd7PrIgww759DNdzXHOuynL1RjNqV/o4IBYMp7rm/DST4tHF4m",
      name: "Batman Miller",
      email: "batmanmiller@gyahoo.com",
      image: "batman.jpeg",
      age: 28,
      gender: "male",
      ntrp: 4.0,
      location: "Boulder CO"
    });
    userBatman.save();

    var userPikcachu = new User({
      username: "Pikachu",
      password:  "$2a$10$Z4mbd7PrIgww759DNdzXHOuynL1RjNqV/o4IBYMp7rm/DST4tHF4m",
      name: "Pikachu Go",
      email: "pkachugo@live.com",
      image: "pikachu.jpeg",
      age: 22,
      gender: "male",
      ntrp: 3.0,
      location: "Boulder CO"
    });
    userPikcachu.save();

    var userSpiderman = new User({
      username: "Spiderman",
      password:  "$2a$10$Z4mbd7PrIgww759DNdzXHOuynL1RjNqV/o4IBYMp7rm/DST4tHF4m",
      name: "Spider Harris",
      email: "spiderharris@gmail.com",
      image: "spiderman.jpeg",
      age: 48,
      gender: "male",
      ntrp: 4.0,
      location: "Boulder CO"
    });
    userSpiderman.save();
  }
});