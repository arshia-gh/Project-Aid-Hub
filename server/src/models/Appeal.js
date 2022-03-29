import { DataTypes, Model } from '@sequelize/core';
import sequelize from '../sequelize.js';
import Contribution from './Contribution.js';

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
Contribution.belongsTo(Appeal, { foreignKey: 'appealId' });

export default Appeal;
