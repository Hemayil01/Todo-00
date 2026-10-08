const express = require("express");

const countryRouter = require("./src/routes/country.r")
const app = express();
app.use(express.json());


app.use("/country", countryRouter)

app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`);
});
