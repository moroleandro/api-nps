import { Router } from 'express';
import { SurveyController } from './controllers/survey.controller';
import { UserController } from './controllers/user.controller';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();

router.post('/users', userController.create);
router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.show);

export { router };
