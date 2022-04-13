const express = require('express');
const routes = require('./controllers');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const { Console } = require('console');

const app = express();
const port = process.env.PORT || 3000;

const sequelize = requre('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'process.env.secret',
    cookie: {},
    resave: false,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});