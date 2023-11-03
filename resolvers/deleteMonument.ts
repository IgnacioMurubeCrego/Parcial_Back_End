// @ts-ignore : import error
import {Request, Response} from "npm:express@4.18.2";
import { MonumentModel } from "../db/monument.ts";

const deleteMonument = async (req : Request, res : Response) => {
    try {
        const { MongoID } = req.params;
        const disc = await MonumentModel.findOneAndDelete({ MongoID }).exec();
        if (!disc) {
          res.status(404).send("Monument not found");
          return;
        }
        res.status(200).send("Monument deleted");
      } catch (error) {
        res.status(500).send(error.message);
        return;
      }
    };

export default deleteMonument;