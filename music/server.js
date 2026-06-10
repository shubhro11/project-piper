import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/db/db.js";

connectDB();

const servicePort = config.SERVICE_PORT || 3002;
app.listen(servicePort, () =>
  console.log(`Music Service is running on Port ${servicePort}`),
);
