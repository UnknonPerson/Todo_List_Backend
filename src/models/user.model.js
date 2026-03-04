import mongoose, { Schema } from "mongoose";
import jsonwebtoken , {sign} from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

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


userSchema.method.generateRefreshToken = () => {

    return jsonwebtoken.sign(
        {_id : this.id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}

userSchema.method.generateAccessToken = () => {
    return jsonwebtoken.sign(
        {
            _id : this.id,
            email : this.email,
            username : this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : process.env.ACCESS_TOKEN_EXPIRY}
    )
}
 
userSchema.method.generateTemporaryToken = () => {
    const unHashedToken = crypto.randomBytes(20).toString("hex")

    const hashedTonken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex")

    const tokenExpiry = Date.now() + (20*60*1000) //20 min

    return {unHashedToken , hashedTonken, tokenExpiry}
}


export const User = mongoose.model("User",userSchema)
