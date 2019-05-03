const db = require('../firebase')

const userRef = db.collection("Users")

async function getAllUsers(){
    let snapshot = userRef.get()


}



module.exports = {getAllUsers}