import { DataTypes, Model } from '@sequelize/core';
import sequelize from '../sequelize.js';

class User extends Model {}

User.init(
	{
		username: {
			type: DataTypes.STRING(20),
			primaryKey: true,
		},

		password: {
			type: DataTypes.CHAR(20),
			allowNull: false,
		},

		fullname: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},

		email: {
			type: DataTypes.STRING,
			unique: true,
			validate: {
				isEmail: {
					msg: 'Email address is not formatted properly',
				},
			},
		},

		mobile: {
			type: DataTypes.STRING(11),
			unique: true,
			validate: {
				isNumeric: {
					msg: 'Mobile number may not contain any non-numeric values',
				},
			},
		},

		IDno: {
			type: DataTypes.CHAR(12),
			unique: true,
			validate: {
				isNumeric: {
					msg: 'ID number may not contain any non-numeric values',
				},
			},
		},

		householdIncome: {
			type: DataTypes.DECIMAL({ precision: 8, scale: 2 }),
			validate: {
				min: {
					args: 0,
					msg: 'Household income must be equal or greater than 0',
				},
			},
		},

		address: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {
					msg: 'Address cannot be empty',
				},
			},
		},

		jobTitle: {
			type: DataTypes.STRING(50),
			validate: {
				notEmpty: {
					msg: 'Job title cannot be empty',
				},
			},
		},

		// discriminator field
		userType: {
			type: DataTypes.ENUM,
			allowNull: false,
			values: ['ADMIN', 'APPLICANT', 'ORG_REPRESENTATIVE'],
		},
	},
	{ sequelize }
);

export default User;
