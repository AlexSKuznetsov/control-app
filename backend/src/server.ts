import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// config
import { BASE_URL, PORT, ENV } from "./config";

// camunda users seed
import seed from "./seed";

// routes
import processRoutes from "./routes/process";
import userRoutes from "./routes/users";
import sitesRoutes from "./routes/sites";

// services
import { subscribeToGetSites } from "./services/getSitesTopic";

const app = express();

if (!BASE_URL) {
  throw new Error("Camunda api url not found!");
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.disable("x-powered-by");

app.use("/process", processRoutes);
app.use("/users", userRoutes);
app.use("/sites", sitesRoutes);

app.get("/", (_, res) => {
  res.send("working");
});

// subscribe to sites topic
subscribeToGetSites();

// seeding Camunda Engine with 3 users
seed();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
  console.log("Current env", ENV);
});
