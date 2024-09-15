import {Router} from 'express';
import {Request, Response} from 'express';
import { CaseController } from './controller';

export class CaseRoutes{

    static get routes(): Router{
        const router = Router();
        const caseController = new CaseController();
        router.get("/", caseController.getCases);
        router.post("/", caseController.createCase);
        router.get("/week", caseController.getLastWeekCases);
        router.get("/:id", caseController.getCaseById);
        router.put("/:id", caseController.updateCase);
        router.delete("/:id", caseController.deleteCase);
        return router;
    }
}