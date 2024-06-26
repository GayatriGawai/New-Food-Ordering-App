import mongoose from 'mongoose';
import { MenuItem } from '../../models/MenuItems';

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const menuItem = await MenuItem.create(data);
    return Response.json(menuItem);
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    return Response.json(await MenuItem.find());
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const { _id, ...data } = await req.json();
    await MenuItem.findByIdAndUpdate(_id, data);
    return Response.json(true);
}
