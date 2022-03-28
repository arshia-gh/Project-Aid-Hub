import Joi from 'joi';
import User from './user-schema.js';

export default User.keys({
	username: Joi.string().min(6).max(12).required(),
	jobTitle: Joi.string().max(255).required(),
	email: User.extract('email').required(),
	mobileNo: User.extract('mobileNo').required(),
});
