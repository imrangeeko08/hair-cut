import mongoose from 'mongoose';

// Include the database name in the connection string
const MONGODB_URI = "mongodb+srv://imrangeekologix:xv6BQ7ciy8dvurUP@cluster0.6es0k.mongodb.net/hair-cut?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((mongoose) => {
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectToDatabase;
