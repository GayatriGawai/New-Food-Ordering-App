import mongoose from 'mongoose';
import { Categories } from '../../models/Categories';

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
    await Categories.updateOne({ _id }, { name });
    return Response.json(true);
}

export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    await Categories.deleteOne({ _id });
    return Response.json(true);
}
