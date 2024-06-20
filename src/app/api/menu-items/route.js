import mongoose from 'mongoose';
import { MenuItem } from '../../models/MenuItems';

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const menuItem = await MenuItem.create(data);
    return Response.json(menuItem);
}
