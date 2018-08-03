const port = process.env.PORT || 3500;
require('./app/app').listen(port, () => console.log('listening on port: ', port));
