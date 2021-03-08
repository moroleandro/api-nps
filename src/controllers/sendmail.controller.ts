import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyUserRepository } from '../repositories/survey-user.repository';
import { SurveyRepository } from '../repositories/survey.repository';
import { UserRepository } from '../repositories/user.repository';

class SendMailController {
    async execute(request: Request, response: Response){
        const { email, survey_id } = request.body;
        const usersRepository = getCustomRepository(UserRepository);
        const surveyRepository = getCustomRepository(SurveyRepository);
        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const userAlreadyExists = await usersRepository.findOne({email});
        if(!userAlreadyExists){
            return response.status(400).json({
                error: "User does not exists"
            });
        }

        const surveyAlreadyExists = await surveyRepository.findOne({id: survey_id});
        if(!surveyAlreadyExists){
            return response.status(400).json({
                error: "Survey does not exists"
            });
        }

        const surveyUser = surveyUserRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        });

        await surveyUserRepository.save(surveyUser);

        return response.json(surveyUser)

    }
}

export { SendMailController }