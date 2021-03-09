import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { resolve } from 'path';
import { SurveyUserRepository } from '../repositories/survey-user.repository';
import { SurveyRepository } from '../repositories/survey.repository';
import { UserRepository } from '../repositories/user.repository';
import SendMailService from '../services/sendmail.service';
import { AppError } from '../errors/app.error';

class SendMailController {
    async execute(request: Request, response: Response){
        const { email, survey_id } = request.body;
        const usersRepository = getCustomRepository(UserRepository);
        const surveyRepository = getCustomRepository(SurveyRepository);
        const surveyUserRepository = getCustomRepository(SurveyUserRepository);
        
        const user = await usersRepository.findOne({email});
        if(!user){
            throw new AppError("User does not exists");
        }
        
        const survey = await surveyRepository.findOne({id: survey_id});
        if(!survey){
            throw new AppError("Survey does not exists");
        }
        
        const npsPath = resolve(__dirname, "..", "views", "mails", "npsMail.hbs");
 
        const surveyUserAlreadyExists = await surveyUserRepository.findOne({
            where: {user_id: user.id, value: null},
            relations: ["user", "survey"]
        });
        
        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL
        }
        
        if(surveyUserAlreadyExists){
            variables.id = surveyUserAlreadyExists.id;
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveyUserAlreadyExists);
        }

        const surveyUser = surveyUserRepository.create({
            user_id: user.id,
            survey_id
        });

        await surveyUserRepository.save(surveyUser);

        variables.id = surveyUser.id;
        await SendMailService.execute(email, survey.title, variables, npsPath);

        return response.json(surveyUser)

    }
}

export { SendMailController }