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
  let rooms = await Room.getAllRooms();
  console.log("GET ROOMS", rooms)
  res.json(rooms)
});

router.post('/allrooms', async (req, res) => {
  let roomID = req.body.id;
  if(await Room.checkExistingRoom(roomID)){
    res.status(404).json("ROOM_ID already exists")
    return
  }
  let newRoom = await Room.createRoom(roomID)
  if(!newRoom){
    console.log("doesn't get new room")
    res.status(500).json("doesn't get new room");
  }
  res.status(201).json( { id : roomID});
})


router.put('/allrooms', async (req, res)=>{
  let roomID = req.body.id;
  if(await Room.checkExistingRoom(roomID)){
    res.status(200).json({ id : roomID});
    return
  }
  let newRoom = await Room.createRoom(roomID)
  if(!newRoom){
    console.log("doesn't get new room")
    res.status(500).json("doesn't get new room");
  }
  res.status(201).json( { id : roomID});
})

router.delete('/allrooms', async (req, res) => {
  let roomID = req.body.id;
  if(!await Room.checkExistingRoom(roomID)){
    res.status(404).json("Room id is not found")
    return
  }
  let result = await Room.deleteRoom(roomID)
  if(result){
    res.status(200).json(roomID + " Is deleted")
    return
  }
  res.status(500).send()
  console.log("delete error")
})

/* room endpoint */

router.get('/room/:ROOM_ID', async (req, res) => {
  let roomID = req.params.ROOM_ID;
  if(!await Room.checkExistingRoom(roomID)){
    res.status(404).json("Room does not exist")
    return
  }
  try{
    let user = await Room.getUsersInRoom(roomID)
    res.status(200).json(user)
  }
  catch(err){
    console.log("get user in room error ", err)
  }
})

router.post('/room/:ROOM_ID', async (req, res) =>{
  let roomID = req.params.ROOM_ID;
  let user = req.body.user
  if(await Room.joinRoom(roomID, user)){
    res.status(200).json({})
    return
  }
  res.status(201).json({})
})

router.put('/room:ROOM_ID', async (req, res) =>{
  let roomID = req.params.ROOM_ID;
  let user = req.body.user
  if(await Room.joinRoom(roomID, user)){
    res.status(200).json({})
    return
  }
  res.status(201).json({})
})

router.delete('/room/:ROOM_ID', async (req, res) => {
  let roomID = req.params.ROOM_ID;
  let user = req.body.user
  if(await Room.exitRoom(roomID, user)){
    res.status(200).json(user+ " leaves the room")
    return
  }
  res.status(404).json("User id is not found")
})

/* User endpoint  */

router.get('/users', async function(req, res, next){
  let users = await User.getAllUsers();
  res.json(users);
})


module.exports = router;
