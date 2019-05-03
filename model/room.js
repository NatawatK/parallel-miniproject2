let db = require('../firebase')

const roomRef = db.collection("Rooms")

async function getAllRooms(){
    let rooms = []
    let snapshot = await roomRef.get()
    snapshot.forEach(doc => {
        // console.log(doc.id, '=>', doc.data());
        rooms.push(doc.data())
        });
        console.log("Here is rooms array", rooms)
    return rooms
}

async function checkExistingRoom(roomID){
    var doc = await roomRef.doc(roomID).get()
    
    if (!doc.exists) {
      console.log('No matching documents.');
      return false
    }
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      return true
    })

}

async function createRoom(roomID){
    let room = await roomRef.doc(roomID).set({
        user : []
    })
    console.log('Added document with ID: ', room);
    return room;
}

async function deleteRoom(roomID){
    var deleteDoc = roomRef.doc(roomID).delete();
}

async function getUsersInRoom(roomID){
    users = []
    var snapshot = await citiesRef.doc(roomID).get()
    if (snapshot.empty) {
        console.log('No matching documents.');
        return false
      }
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        users = doc.data().user;
        return users
    })

}

async function joinRoom(roomID, userID){
    let oldUsers = await getUsersInRoom(roomID)
    if(oldUsers.includes(userID)){
        return 0
    }
    let newUsers = oldUsers.concat([userID])
    let doc = await roomRef.doc(roomID).update({user : newUsers})
    return 1
}

async function exitRoom(roomID, userID){
    
}

module.exports = { getAllRooms , createRoom}
