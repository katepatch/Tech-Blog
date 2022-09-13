const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

const helpers = require('./utils/helpers');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});

const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;
// app.listen(process.env.PORT || 3000, function(){
//     console.log("server listening", this.address().port, app.settings.env);
// });

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: "super secret secret",
    cookie: { originalMaxAge: 600000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`))
});