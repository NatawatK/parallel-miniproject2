let db = require('../firebase')

const roomRef = db.collection("Rooms")

async function getAllRooms(){
    let rooms = []
    let snapshot = await roomRef.get()
    snapshot.forEach(doc => {
        // console.log(doc.id, '=>', doc.data());
        rooms.push(doc.id)
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
    
    console.log(doc.id, '=>', doc.data());
    return true
}

async function createRoom(roomID){
    try{
        let room = await roomRef.doc(roomID).set({
            user : []
        })
        console.log('Added document with ID: ', room);
        return true;
    }
    catch(err){
        console.log("create new room err :", err)
        return false
    }
    
}

async function deleteRoom(roomID){
    try{
        var deleteDoc = await roomRef.doc(roomID).delete();
        return true
    }
    catch(err){
        return false
    }
    
}

async function getUsersInRoom(roomID){
    users = []
    try{
        var snapshot = await roomRef.doc(roomID).get()
        if (snapshot.empty) {
            console.log('No matching documents.');
            return false
        }
        user = snapshot.data().user
        console.log("number of user", user.length, " ==> ", user)
        return user
    }
    catch(err){
        console.log("Firebase error", err)
        return []
    }
}

async function joinRoom(roomID, userID){
    console.log('join room ', userID, " --> ", roomID)
    let oldUsers = await getUsersInRoom(roomID) || []
    console.log("oldusers = ", oldUsers)
    if(oldUsers.includes(userID)){
        console.log("Already has user in room")
        return 0
    }
    let newUsers = oldUsers.concat([userID])
    let doc = await roomRef.doc(roomID).update({user : newUsers})
    return 1
}

async function exitRoom(roomID, userID){
    let oldUsers = await getUsersInRoom(roomID) || []
    console.log(roomID + " has user " + oldUsers)
    if(!oldUsers.includes(userID)){
        return 0
    }
    let newUsers = oldUsers.filter( (id) => {
        return id !== userID
    })
    let doc = await roomRef.doc(roomID).update({user : newUsers})
    return 1
}

module.exports = { 
    getAllRooms, 
    createRoom,
    checkExistingRoom,
    deleteRoom, 
    getUsersInRoom,
    joinRoom,
    exitRoom
}
