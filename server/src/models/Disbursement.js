import { DataTypes, Model } from '@sequelize/core';
import sequelize from '../sequelize.js';

class Disbursement extends Model {}

Disbursement.init(
	{
		disbursementDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		amount: {
			type: DataTypes.DECIMAL({ precision: 8, scale: 2 }),
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ sequelize }
);

export default Disbursement;
