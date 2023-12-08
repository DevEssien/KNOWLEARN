import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerApiDoc from '../../docs/api.json';

const router = Router();

router.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerApiDoc));

export default router;