import { DataTypes, Model } from '@sequelize/core';
import sequelize from '../sequelize.js';

class Document extends Model {}

Document.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},

		filename: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		description: {
			type: DataTypes.STRING,
		},
	},
	{ sequelize, initialAutoIncrement: 1000 }
);

export default Document;
