/* for user schema */

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    firstName: {
        type: String,
        required: true,
        maxlength = 28,
        trim: true
    },
    lastName: {
        type: String,
        required: false,
        maxlength = 28,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,

    },
    userInfo: {
        type: String,
        trim: true
    },
    //TODO: add salting for password later
    password: {
        type: String,
        trim: true,
        minlength: 6,
        maxlength: 12
    },
    salt: {
        type: String
    },
    privilege: {
        type: UserPrivileges,
        default: UserPrivileges.USER
    },
    orders: {
        type: Array,
        default: []
    }
});

//TODO: move this to a specific file for enums/constants later
//defining a user privilege enum
const UserPrivileges = {
    USER: "user",
    ADMIN: "admin"
};

module.exports = mongoose.model("User", userSchema);