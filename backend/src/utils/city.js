import City from "../models/City";

export function sortByPopulation(a, b) {
    return b.population - a.population;
}

// TODO: Better way to write this?
export async function findCityByCityAndCountryName(cityName, countryName) {
    return await new Promise(async (resolve, reject) => {
        await City.find({name: cityName}).sort({'population': -1}).populate("country").exec((err, cities) => {
            const city = cities.filter(city => city.country.name === countryName)[0];
            if(city) resolve(city);
            else reject("Could not find a matching city");
        });
    });
}