import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../models/survey-user.model";

@EntityRepository(SurveyUser)
class SurveyUserRepository extends Repository<SurveyUser> {}

export { SurveyUserRepository }; 