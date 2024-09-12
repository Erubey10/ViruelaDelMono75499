import {Router} from 'express';
import {Request, Response} from 'express';
import { CaseController } from './controller';

export class CaseRoutes{

    static get routes(): Router{
        const router = Router();
        const caseController = new CaseController();
        router.get("/", caseController.getIncidents);
        router.post("/", caseController.createCase);
        router.get("/:id", caseController.getIncidentById);
        router.put("/:id", caseController.updateIncident);
        router.delete("/:id", caseController.deleteIncident);
        return router;
    }
}