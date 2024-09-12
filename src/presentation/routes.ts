import {Router} from 'express';
import { CaseRoutes } from './casos/routes';

export class AppRoutes {
    static get routes() : Router{
        const router = Router();
        router.use("/api/caso", CaseRoutes.routes);
        return router
    }
}