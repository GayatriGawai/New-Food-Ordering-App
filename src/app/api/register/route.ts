import { User } from '../../models/User';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export async function POST(req) {
    const body = await req.json();

    // Make sure you pass the string to the connect() function
    mongoose.connect(process.env.MONGO_URL);
    const pass = body.password;

    if (!pass?.length || pass.length < 5) {
        new Error('Password must be 8 characters long');
    }

    const nothashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(nothashedPassword, salt);

    const createdUser = await User.create(body);
    return Response.json(createdUser);
}
