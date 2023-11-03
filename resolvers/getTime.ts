import { Location, Time } from "../types.ts";

export const getTime = async (
    location : Location
): Promise<Time> => {

  const BASE_URL = "http://worldtimeapi.org/api/timezone/";
  const url = BASE_URL + location.continent + "/" + location.city;
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error("Cannot fetch iso code location");
  }

  const data = await response.json();

  return {
    timestamp : data.datetime
    };
};