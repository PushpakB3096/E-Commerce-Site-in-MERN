/* for user schema */

const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const schema = mongoose.Schema;

const userSchema = new schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 28,
        trim: true
    },
    lastName: {
        type: String,
        required: false,
        maxlength: 28,
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
    encryptedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    privilege: {
        type: String,
        enum: ["Admin", "Basic"],
        default: "Basic"
    },
    orders: {
        type: Array,
        default: []
    }
},
{
    timestamps: true //to keep track of when a particular record was stored
});

//defining schema virtuals
userSchema.virtual("password")
            .set(function(password){
                this._password = password;
                this.salt = uuidv1(); //generates a random salt using the UUID package
                this.encryptedPassword = this.generateSecuredPW(password);
            })
            .get(function(){
                return this._password;
            });

//defining schema methods
userSchema.methods = {
    generateSecuredPW: function(plainTextPW){
        if(!plainTextPW){
            return ""; //TODO: move common constants like null values, spaces, etc to a separate file.
        }

        var securedPW; //for storing and returing the encrypted password

        try{
            securedPW = crypto.createHmac("sha256", this.salt)
                        .update(plainTextPW)
                        .digest("hex");

            return securedPW;
        } catch(err){
            return "Something went wrong";
        }
    },
    authenticateUser: function(plainTextPW){ //basic user authentication
        return this.generateSecuredPW(plainTextPW) === this.encryptedPassword;
    }
};

module.exports = mongoose.model("User", userSchema);

/* end of user shema */