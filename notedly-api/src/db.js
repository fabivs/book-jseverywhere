import mongoose from 'mongoose';

export default {
    connect: DB_HOST => {
        mongoose.connect(DB_HOST);

        mongoose.connection.on('error', err => {
            console.error(err);
            console.log('MongoDB connection error. Make sure MongoDB is running.');
            process.exit();
        });
    },
    close: () => {
        mongoose.connection.close();
    }
};