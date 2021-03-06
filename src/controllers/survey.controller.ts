import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from "../repositories/survey.repository";

class SurveyController {
    async create(request: Request, response: Response){
        const { title, description } = request.body;
        const surveyRepository = getCustomRepository(SurveyRepository);
        const survey = surveyRepository.create({
            title, 
            description
        });
        await surveyRepository.save(survey);
        return response.status(201).json(survey);
    }

    async show(request: Request, response: Response){
        const surveyRepository = getCustomRepository(SurveyRepository);
        const survey = await surveyRepository.find();
        return response.json(survey);
    }
}

export { SurveyController }