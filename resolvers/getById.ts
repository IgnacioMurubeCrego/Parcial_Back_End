// @ts-ignore : import error
import {Request, Response} from "npm:express@4.18.2";
import { MonumentModel, MonumentModelType } from "../db/monument.ts";

const getById = async (req : Request, res : Response) => {
    try{
    const _id = req.params.id;
    const monument : MonumentModelType | null  = await MonumentModel.findOne({_id});
    if(monument){
        res.status(200).send(monument);
    }
    else{
        res.status(404).send("No Monument with id : " + _id + " found in database.");
    }
    } 
    catch(error){
        res.status(500).send(error.message);
        return;
    }
}

export default getById;