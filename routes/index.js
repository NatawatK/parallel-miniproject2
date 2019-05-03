var express = require('express');
var router = express.Router();
var User = require('../model/user')
var Room = require('../model/room')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* allRooms endpoint */
router.get('/allrooms', async function(req, res, next){
  console.log("jdfksjfkldsjfkljskld")
  let rooms = await Room.getAllRooms();
  console.log("GET ROOMS", rooms)
  res.json(rooms)
});

router.put('/allrooms')

router.delete('/allrooms')

/* room endpoint */

router.get('/room')

router.post('/room')

router.put('/room')

router.delete('/room')

/* User endpoint  */

router.get('/users', async function(req, res, next){
  let users = await User.getAllUsers();
  res.json(users);
})


module.exports = router;
