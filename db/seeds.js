
const User = require("./models/UserSchema")
const userData = require("./UserData.json")

User.remove({})
.then(()=>{
    User.collection.insert(userData)
        .then((data)=>{
            console.log(data)
            process.exit()
        })
}).catch((err) =>{
    console.log(err)
})