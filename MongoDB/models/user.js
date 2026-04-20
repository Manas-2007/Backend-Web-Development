const mongoose = require("mongoose");

// ✅ Create Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    occupation: {
        type: String
    },
    salary: {
        type: Number
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    married: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true   // adds createdAt & updatedAt automatically
});

// ✅ Create Model
const User = mongoose.model("User", userSchema);

// ✅ Export Model
module.exports = User;