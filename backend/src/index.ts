require('dotenv').config();

import app from './app';
import config from './config/config';

app.listen(config.port, () => {
  console.log(`DIALOG-Backend-Server running on port ${config.port}`);
});
