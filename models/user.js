const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    spinHistory: { type: String },
    joinDate: { type: Date, default: Date.now }
}, { collection: 'user' });

module.exports = mongoose.model('User', userSchema);