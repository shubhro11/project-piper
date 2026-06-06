import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/db/db.js";
import { connect } from "./src/broker/rabbit.js";

connectDB();
connect();

const servicePort = config.SERVICE_PORT || 3000;
app.listen(servicePort, () =>
  console.log(`Auth Service is running on Port ${servicePort}`),
);
