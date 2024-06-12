import { User } from '../../models/User';
import mongoose from 'mongoose';

export async function POST(req) {
    const body = await req.json();

    // Make sure you pass the string to the connect() function
    mongoose.connect(process.env.MONGO_URL);
    console.log('##########################');

    const createdUser = await User.create(body);
    return Response.json(createdUser);
}
