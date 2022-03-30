import Joi from 'joi';

const authSchema = Joi.object({
	username: Joi.string().trim().uppercase().required(),
	password: Joi.string().required(),
});

export default authSchema;
