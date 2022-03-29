import { DataTypes, Model } from '@sequelize/core';
import sequelize from '../sequelize.js';

class Contribution extends Model {}

Contribution.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		receivedDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			defaultValue: () => new Date().toISOString().substring(0, 10),
		},
		contributionType: {
			type: DataTypes.ENUM,
			allowNull: false,
			values: ['GOODS', 'CASH_DONATION'],
		},

		// Cash Donation attributes
		amount: {
			type: DataTypes.DECIMAL({ precision: 8, scale: 2 }),
		},
		paymentChannel: {
			type: DataTypes.STRING,
		},
		referenceNo: {
			type: DataTypes.STRING,
		},

		// Goods attributes
		description: {
			type: DataTypes.STRING,
		},
		estimatedValue: {
			type: DataTypes.DECIMAL({ precision: 8, scale: 2 }),
		},
	},
	{ sequelize, initialAutoIncrement: 1000 }
);

export default Contribution;
