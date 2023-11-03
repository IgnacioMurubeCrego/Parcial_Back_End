// @ts-ignore : import error
import {Request, Response} from "npm:express@4.18.2";
import { MonumentModel, MonumentModelType } from "../db/monument.ts";

const getAll = async (_req : Request, res : Response) => {
    try{
    const someMonuments : MonumentModelType[] = await MonumentModel.find()
    if(someMonuments){
        someMonuments.forEach((monument : MonumentModelType) => {
            const id = monument.toJSON()._id;
            const name = monument.toJSON().name;
            const country = monument.toJSON().country;
            const data = {id,name,country};
            res.status(200).send(data);
        });
    }
    else{
        res.status(404).send("No Monument found in database.");
    }
    } 
    catch(error){
        res.status(500).send(error.message);
        return;
    }
}

export default getAll;