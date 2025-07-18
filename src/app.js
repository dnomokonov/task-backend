const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./config/db');
const router = require('./routes/index');

app.use(express.json())
app.use('/api', router)

db.one('SELECT NOW()')
    .then(result => {
        console.log('✅ Connected to DB at:', result.now);

        app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
        });
    })
    .catch(error => {
        console.error('❌ Database connection error:', error.message || error);
        process.exit(1);
    })