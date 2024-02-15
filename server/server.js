const express = require("express");
const cors = require("cors");
const accessTokenRouter = require("./routers/AccessTokenRouter");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/userRouter");

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/accessToken", accessTokenRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is Listening on Port ${PORT}`);
});
