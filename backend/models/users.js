const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, 
        minlength: 3, 
        maxlength: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    bookings: [
        {
            movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }, // Reference to the Movie schema
            seats: [[Number]], // Array of seat indices [row, col]
            bookingDate: { type: Date, default: Date.now }, // When the booking was made
        }
    ],
    
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[+]*[0-9]{1,3}[ -]*[0-9]+$/.test(v); // Regular expression to validate phone number format (international format)
              },
              message: 'Please provide a valid phone number'
        }
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User