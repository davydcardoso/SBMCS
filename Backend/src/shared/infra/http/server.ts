import app from './app';

const port = 80;

app.listen(port,  () => {
    console.info('Server started', `http://localhost:${port}/`);
});