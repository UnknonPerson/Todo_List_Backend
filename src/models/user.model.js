import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is Required']
        },
        isEmailVerifide: {
            type: Boolean,
            default: false
        },
        refeshToken: {
            type: String
        },
        forgotPasswordToken: {
            type: String
        },
        forgotPasswordExpiry: {
            type: Date
        },
        emailVerificationExpiry: {
            type: Date
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model("User",userSchema)
