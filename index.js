
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors({credentials: true, origin: true}));
const meta = require('./routes/meta');
const google = require('./routes/google');
const shopify = require('./routes/shopify');
const klaviyo = require('./routes/klaviyo');
const user = require('./routes/user');

app.use('/meta',meta);
app.use('/google',google);
app.use('/shopify',shopify);
app.use('/klaviyo',klaviyo);
app.use('/user',user);



const PORT = 3004;

app.get('/', (req, res) => {
  res.send('<h1>Hello, world!</h1>');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
