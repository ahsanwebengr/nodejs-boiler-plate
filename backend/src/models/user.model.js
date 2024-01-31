import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        unique: true,
        lowercase: true,
        index: true,
    },
    fullName: {
        type: String,
        required: [true, 'Username is required.'],
    }
}, {
    timestamps: true,
});

export const User = mongoose.model('User', userSchema);