import mongoose from 'mongoose';
import { Categories } from '../../models/Categories';
import { isAdmin } from '@/app/api/auth/[...nextAuth]/route';

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const { name } = await req.json();
    const category = await Categories.create({ name });
    return Response.json(category);
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    return Response.json(await Categories.find());
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const { _id, name } = await req.json();
    if (await isAdmin()) {
        await Categories.updateOne({ _id }, { name });
    }
    return Response.json(true);
}
