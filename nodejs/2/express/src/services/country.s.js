const { data } = require("../data/db");
const getTime = require("../lib/time");

function getCountry(req, res) {
    const { population_max, population_min, page = 1, limit = 10 } = req.query;

    const start = (+page - 1) * +limit;
    const end = +page * +limit;

    const filtered = data
        .filter((item) => item.alpha2Code !== "AM")
        .filter((item) =>
            population_max && population_min
                ? item.population > population_min && item.population < population_max
                : item.population,
        );


    const total = filtered.length;

    const filteredCountries = filtered
        .slice(start, end)
        .map((item) => {
            return {
                name: item.name,
                region: item.region,
                population: item.population,
                borders: item.borders,
                flags: item.flags,
            };
        });



    res.status(200).send({
        timestamp: getTime(),
        filteredCountries,
        status: "ok",
        meta: {
            page: +page,
            limit: +limit,
            total: total,
        },
    });
}


function createCountry(req, res) {
    const newCountry = req.body;

    if (
        newCountry.name &&
        newCountry.region &&
        newCountry.population &&
        newCountry.borders &&
        newCountry.flags
    ) {
        data.push(newCountry);
    } else {
        console.error(error);
    }
    res.json({ newCountry });
}




module.exports = { createCountry, getCountry }