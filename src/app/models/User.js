import { Schema, model, models } from 'mongoose';
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            validate: (pass) => {
                if (!pass?.length || pass.length < 8) {
                    new Error('Password must be 8 characters long');
                }
            },
        },
    },
    { timestamps: true }
);

UserSchema.post('validate', function (user) {
    const nothashedPassword = user.password;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(nothashedPassword, salt);
});

export const User = models?.User || model('User', UserSchema);
