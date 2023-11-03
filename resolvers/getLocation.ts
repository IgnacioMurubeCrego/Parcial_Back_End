import { Location } from "../types.ts";

export const getLocation = async (
    postCode : string,
  isoCode : string
): Promise<Location> => {

  const BASE_URL_ISO = "https://restcountries.com/v3.1/alpha/";
  const url = BASE_URL_ISO + isoCode;
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error("Cannot fetch iso code location");
  }

  const data_countries = await response.json();

  const BASE_URL_POST = "https://zip-api.eu/api/v1/info/";
  const url2 = BASE_URL_POST + isoCode + "-" + postCode;
  const response2 = await fetch(url2);
  if (response2.status !== 200) {
    throw new Error("Cannot fetch zip code location");
  }

  const data_postCode = await response2.json();

  return {
    city : data_postCode.place_name,
    country : data_countries[0].name.common,
    continent: data_countries[0].continents[0],
  };
};