import { CaseModel } from "../../data/models/caso.model";

interface Case {
    latitude: string;
    longitude:string;
    isSent: boolean;
    genre: string;
    age: number;
    creationDate: Date;
}
interface CaseDocument extends Document, Case {}

export class CaseDataSource {
    public updateIncident = async (id: string, caso: Partial<CaseDocument>) => {

        await CaseModel.findByIdAndUpdate(id,{
            latitude: caso.latitude,
            longitude: caso.longitude,
            isSent: caso.isSent,
            genre: caso.genre,
            age: caso.age,
            creationDate: caso.creationDate
            
        });
    }
}