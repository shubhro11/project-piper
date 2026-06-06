import app from "./src/app.js";
import config from "./src/config/config.js";
import { connect } from "./src/broker/rabbit.js"
import startListener from "./src/broker/listener.js"

connect().then(startListener)


const servicePort = config.SERVICE_PORT || 3001;

app.listen(servicePort, () =>
  console.log(`Notification Service is running on Port ${servicePort}`),
);