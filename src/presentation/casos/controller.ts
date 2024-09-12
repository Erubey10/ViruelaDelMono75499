import { Request, Response } from 'express';
import { CaseModel } from '../../data/models/caso.model';
//import { EmailService } from '../../domain/service/email.service';

export class CaseController{
    public getIncidents = async (req:Request, res:Response) => {
        try {
            const incidents = await CaseModel.find();
            res.json(incidents);
        } catch (error) {

        }
    }

    public createCase = async (req:Request, res:Response) => {
        try {
            const {title, description, lat, lng} = req.body;
            const newIncident = await CaseModel.create({
                title, description, lat, lng});
                // const emailService = new EmailService();
                // await emailService.sendEmail({
                //     to: "diego.lopez.ismael@gmail.com",
                //     subject: 'title',
                //     htmlBody: <h1>${description}</h1>
                // });
            return res.json(newIncident);
        }
        catch (error) {

        }
    }

    public getIncidentById = async (req:Request, res:Response) => {
        const {id} = req.params;
        try {
            const incident = await CaseModel.findById(id);
            res.json(incident);
        } catch (error) {
            return res.status(404).json({message: 'Incident not found'});
        }
    }

    public updateIncident = async (req:Request, res:Response) => {
        const {id} = req.params;
        const {title, description, lat, lng} = req.body;
        try {
            const incident = await CaseModel.findByIdAndUpdate(id,{
                title,
                description,
                lat,
                lng
            });
            res.json(incident);
        } catch (error) {
            return res.status(404).json({message: 'Incident not found'});
        }
    }

    public deleteIncident = async (req:Request, res:Response) => {
        const {id} = req.params;
        try {
            const incident = await CaseModel.findByIdAndDelete(id);
            res.json({message: 'Incident deleted'});
        } catch (error) {
            return res.status(404).json({message: 'Incident not found'});
        }
    }
}