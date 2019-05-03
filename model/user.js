const db = require('../firebase')

const userRef = db.collection("Users")
const Room = require('./room')

async function getAllUsers(){
    let rooms = await Room.getAllRooms();
    let users = []
    for(let i = 0 ; i<rooms.length; i++){
        console.log(rooms[i])
        let userInRoom = await Room.getUsersInRoom(rooms[i])
        console.log("user in room : ", userInRoom)
        if(userInRoom.length > 0)
            users = users.concat(userInRoom)
        console.log('updated users', users)
    }
    console.log(users)
    return users.filter( (u)=>{
        return u!==''
    })
}



module.exports = {getAllUsers}