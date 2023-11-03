// @ts-ignore : import error
import {Request, Response} from "npm:express@4.18.2";
import { MonumentModel } from "../db/monument.ts";
import { getLocation } from "./getLocation.ts";
import { getWeather } from "./getWeather.ts";
import { getTime } from "./getTime.ts";

const updateMonument = async (req : Request, res : Response) => {
    try {
        const {_id} = req.params.id;

        const {name, description, postCode, ISO} = req.body;
        if (!name || !description || !postCode || !ISO) {
          res.status(500).send("Name, description, postCode and ISO code are required");
          return;
        }
    
        const exists = await MonumentModel.findOne().where(_id).equals(_id).exec();
    
        if (!exists) {
          res.status(404).send("Monument does not exist.");
          return;
        }
    
        const location = await getLocation(postCode,ISO);
        const weather_data = await getWeather(location);
        
        const city : string = location.city;
        const country : string = location.country;
        const continent : string = location.continent;
        const time : string = (await getTime(location)).timestamp;
        const weather : string = weather_data.description;
    
        const newMonument = new MonumentModel({ name, description, postCode 
          ,city, country, continent, time, weather});

        await MonumentModel.findByIdAndUpdate({_id},newMonument);
    
        res.status(200).send({
          name: newMonument.name,
          description: newMonument.description,
          postCode: newMonument.postCode,
          city : newMonument.city,
          country : newMonument.country,
          continent : newMonument.continent,
          time : newMonument.time,
          weather : newMonument.weather
        });
    
      } catch (error) {
        res.status(500).send(error.message);
        return;
      }
    };

export default updateMonument;