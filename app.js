const express = require('express');
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use('/news', newsRoutes);

app.use('/auth', authRoutes);




app.listen(3000, () => {
    // print message to console route tes
    console.log('Server is running on port 3000');
}
);

module.exports = app;