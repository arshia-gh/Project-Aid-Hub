import { DataTypes, Model } from '@sequelize/core';
import sequelize from '../sequelize.js';
import Contribution from './Contribution.js';
import Disbursement from './Disbursement.js';
import User from './User.js';

class Appeal extends Model {}

Appeal.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		fromDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		toDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		targetAmount: {
			type: DataTypes.DECIMAL({ precision: 8, scale: 2 }),
			allowNull: false,
		},
		outcome: {
			type: DataTypes.ENUM,
			allowNull: false,
			values: ['collecting', 'disbursing', 'ended'],
		},
	},
	{ sequelize, initialAutoIncrement: 1000 }
);

Appeal.hasMany(Contribution, {
	as: 'goods',
	foreignKey: 'appealId',
	scope: {
		contributionType: 'GOODS',
	},
});

Appeal.hasMany(Contribution, {
	as: 'cashDonations',
	foreignKey: 'appealId',
	scope: {
		contributionType: 'CASH_DONATION',
	},
});

Appeal.belongsToMany(User, {
	through: Disbursement,
	scope: {
		userType: 'APPLICANT',
	},
	foreignKey: 'appealId',
});

User.belongsToMany(Appeal, {
	through: Disbursement,
	foreignKey: 'userId',
});

Contribution.belongsTo(Appeal, { foreignKey: 'appealId' });

Appeal.hasMany(Disbursement, { foreignKey: 'appealId' });
Disbursement.belongsTo(Appeal, { foreignKey: 'appealId' });

User.hasMany(Disbursement, { foreignKey: 'userId' });
Disbursement.belongsTo(User, {
	scope: {
		userType: 'APPLICANT',
	},
	foreignKey: 'userId',
});

export default Appeal;
