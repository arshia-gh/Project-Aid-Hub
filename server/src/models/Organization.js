import { DataTypes, Model } from '@sequelize/core';
import sequelize from '../sequelize.js';
import User from './User.js';

class Organization extends Model {}

Organization.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},

		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ sequelize, initialAutoIncrement: 1000 }
);

Organization.hasMany(User, {
	as: 'representatives',
	foreignKey: 'orgId',
	scope: {
		userType: 'ORG_REPRESENTATIVE',
	},
});

Organization.hasMany(User, {
	as: 'applicants',
	foreignKey: 'orgId',
	scope: {
		userType: 'APPLICANT',
	},
});

User.belongsTo(Organization, { foreignKey: 'orgId' });
export default Organization;
