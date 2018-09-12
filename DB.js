const mongoose = require('mongoose');

const init = () => {
  mongoose.connect('mongodb://localhost:27017');

  const db = mongoose.connection;

  db
    .on('error', console.error.bind(console, 'connection error:'))
    .once('open', function() {
      console.log('connected');
    });

  const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String
  });

  const User = mongoose.model('User', userSchema);


  const testUser = new User({name: 'Ivan', email:'test@gmail.com', password: '12345'});

  testUser.save(function (err, res) {
    if (err) return console.error(err);

    console.log('User was saved: ', testUser)
  });

};

module.exports = {
  startDB: init
};
