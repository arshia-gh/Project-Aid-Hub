import { DataTypes, Model } from '@sequelize/core';
import sequelize from '../sequelize.js';

class Appeal extends Model {}

Appeal.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		fromDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		toDate: {
			type: DataTypes.DATE,
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

export default Appeal;
