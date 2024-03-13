import { app } from "./app.js";
import { config } from "dotenv";
import { connectDataBase } from "./src/config/db.js";

config();

const port = process.env.PORT || 8088;

connectDataBase();

app.listen(port, () => {
    console.log(`Server is running on => http://localhost:${port}`);
});

