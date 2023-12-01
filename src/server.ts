import app from './app';
import config from './config';

const PORT = config.app.port

app.listen(PORT, () => {
    console.log('- App environment:: ', PORT);
})