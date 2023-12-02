import { connect } from 'mongoose';
import config from '../config';

const createMongodbConnection = async () => {
    try {
        const dbConnect = await connect(config.db.uri);
        if (dbConnect) console.log('- Connected to MongoDB server')
    } catch (error) {
        console.log(`- Database Error:: ${error}`)
    }
}

export default createMongodbConnection;