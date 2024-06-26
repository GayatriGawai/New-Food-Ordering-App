import NextAuth, { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../../../../libs/mongoConnect';
import mongoose from 'mongoose';
import { User } from '../../../models/User';
import bcrypt from 'bcrypt';
import { userInfo } from 'os';

export const authOptions = {
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // allowDangerousEmailAccountLinking: true,
        }),
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                username: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'test@example.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;
                // We have to add logic for the login, register and validation

                mongoose.connect(process.env.MONGO_URL);
                const user = await User.findOne({ email });
                const passwordOk =
                    user && bcrypt.compareSync(password, user.password);

                if (passwordOk) {
                    return user;
                }

                return null;
            },
        }),
    ],
};

export async function isAdmin() {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
        return false;
    }
    return userInfo.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
