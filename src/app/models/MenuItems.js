import { Schema, models, model } from 'mongoose';
import { type } from 'os';

const MenuItemSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        basePrice: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);
