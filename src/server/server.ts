import * as path from 'path';
import * as express from 'express';
import * as passport from 'passport';
import * as morgan from 'morgan';

// these need to be imported where you initialize passport as middleware
import './middleware/localstrategy';
import './middleware/bearerstrategy';

import routes from './routes';

const app = express();

let p = path.join(__dirname, '../public');
console.log(p);

app.use(express.static(p));
// express.json parses the req.body
app.use(express.json());
app.use(morgan('dev'));
// passport needs to be somewhere above app.use(routes);
app.use(passport.initialize());

app.use(routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});