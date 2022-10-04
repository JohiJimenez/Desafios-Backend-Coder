
import { usersModel } from "../model/users.js";
import logger from "../utils/logger.js";

    
   export async function createUser(object) {
        try {
            return await usersModel.create(object);
        } catch (error) {
            logger.error(error);
            return null;
        }
    }