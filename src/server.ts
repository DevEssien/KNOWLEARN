import app from './app';
import config from './config';
import createMongodbConnection from './db/connection';

const PORT = config.app.port

createMongodbConnection();

app.listen(PORT, () => {
    console.log('- App environment:: ', PORT);
})