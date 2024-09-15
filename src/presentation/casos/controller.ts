import { Request, Response } from 'express';
import { CaseModel } from '../../data/models/caso.model';
// import { EmailService } from '../../domain/service/email.service';

export class CaseController{
    public getCases = async (req:Request, res:Response) => {
        try {
            const incidents = await CaseModel.find();
            res.json(incidents);
        } catch (error) {

        }
    }
    public getLastWeekCases = async (req:Request, res:Response) => {
        try {
            const today = new Date();
            const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
            const incidents = await CaseModel.find({
                creationDate: {
                    $gte: lastWeek,
                    $lt: today
                }
            });
            res.json(incidents);
        } catch (error) {

        }
    }

    public createCase = async (req:Request, res:Response) => {
        try {
            const {latitude, longitude, genre, age } = req.body;
            const todayDate = new Date();  
            const newIncident = await CaseModel.create({
                latitude, longitude, genre, age, creationDate:todayDate});
            return res.json(newIncident);
        }
        catch (error) {

        }
    }

    public getCaseById = async (req:Request, res:Response) => {
        const {id} = req.params;
        try {
            const incident = await CaseModel.findById(id);
            res.json(incident);
        } catch (error) {
            return res.status(404).json({message: 'Incident not found'});
        }
    }

    public updateCase = async (req:Request, res:Response) => {
        const {id} = req.params;
        const {latitude, longitude, genre, age} = req.body;
        try {
            const incident = await CaseModel.findByIdAndUpdate(id,{
                latitude, longitude, genre, age
            });
            res.json(incident);
        } catch (error) {
            return res.status(404).json({message: 'Case not found'});
        }
    }

    public deleteCase = async (req:Request, res:Response) => {
        const {id} = req.params;
        try {
            const caso = await CaseModel.findByIdAndDelete(id);
            res.json({message: 'Case deleted'});
        } catch (error) {
            return res.status(404).json({message: 'Case not found'});
        }
    }
}