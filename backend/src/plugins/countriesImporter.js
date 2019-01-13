import axios from "axios";
import fs from 'fs';
import extract from 'extract-zip';

import logger from '../utils/logger'
import Country from "../models/Country";
import City from "../models/City";

export async function importCountries() {
    const url = 'https://restcountries.eu/rest/v2/all';

    try {
        const response = await axios.get(url);

        if (response.data) {
            const data = response.data;

            const countries = [];

            for (let country of data) {
                delete country["capital"];
                let latLng = country.latlng;

                if(country.alpha2Code === 'GB') {
                    country.name = 'United Kingdom';
                }

                if(country.alpha2Code && latLng && latLng.length === 2) {
                    countries.push({_id: country.alpha2Code, ...country, latitude: latLng[0], longitude: latLng[1]});
                }
            }

            await Country.insertMany(countries);
            return countries.map(x => x.alpha2Code);
        }
    } catch (e) {
        throw e;
    }
}

export async function importCities(countries) {
    const citiesFileName = `cities${process.env.CITY_MIN_POPULATION}`;
    const citiesDataURL = `http://download.geonames.org/export/dump/${citiesFileName}.zip`;
    const targetZip = __dirname + `/data/${citiesFileName}.zip`;
    const targetFolder = __dirname + `/data/${citiesFileName}`;

    if (!fs.existsSync(__dirname + '/data')) fs.mkdirSync(__dirname + '/data');
    if (!fs.existsSync(targetFolder)) fs.mkdirSync(targetFolder);

    try {
        const response = await axios.get(citiesDataURL, {responseType: 'arraybuffer'});

        if (response.data) {
            fs.writeFileSync(targetZip, response.data);

            await new Promise((resolve, reject) => {
                extract(targetZip, {dir: targetFolder}, function (err) {
                    if(err) throw err;
                    resolve()
                })
            });

            const content = fs.readFileSync(targetFolder + `/${citiesFileName}.txt`, "utf8");
            const cities = [];

            content.split('\n').map(async (city) => {
                const p = city.split('\t');
                const geoCityId = p[0];

                if (geoCityId && countries.includes(p[8])) {
                    cities.push({
                        _id: geoCityId, name: p[1], latitude: p[4], longitude: p[5], country: p[8],
                        population: p[14], timezone: p[17]
                    });
                }
            });

            await City.insertMany(cities);
        }
    } catch (e) {
        logger.error(e.message);
        throw e;
    }
}