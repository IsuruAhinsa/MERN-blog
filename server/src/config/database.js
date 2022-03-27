import "dotenv/config";
import mongoose from "mongoose";

let database;

const connect = async () => {

    if (database) return false;

    const URL = process.env.MONGODB_URL;

    await mongoose.connect(URL,{
        autoIndex: true,
    }).then((connection) => {
        database = connection;
        console.log('Database Synced!');
    }).catch((err) => console.log(err.message));
}

export {connect};