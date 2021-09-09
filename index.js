const question1 = require("./routes/question1");
const question2 = require("./routes/question2");
const question3 = require("./routes/question3");
const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use("/", question1);
app.use("/question2", question2);
app.use("/question3", question3);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
