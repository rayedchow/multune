import { User } from '../@types/User';
import { getModelForClass } from '@typegoose/typegoose';

export default getModelForClass(User);
