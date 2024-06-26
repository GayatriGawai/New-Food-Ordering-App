import { Schema, models, model } from 'mongoose';
import { type } from 'os';

const ExtraPriceSchema = new Schema({
    name: String,
    price: Number,
});

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
        sizes: {
            type: [ExtraPriceSchema],
        },
        extraIngredients: {
            type: [ExtraPriceSchema],
        },
    },
    { timestamps: true }
);

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);
