import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/user.model";

@EntityRepository(User)
class UserRepository extends Repository<User> {}

export { UserRepository };