import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/survey.model";

@EntityRepository(Survey)
class SurveyRepository extends Repository<Survey> {}

export { SurveyRepository }; 