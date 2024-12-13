const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema ({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },  
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;