import { DataTypes, Model, QueryTypes } from '@sequelize/core';
import sequelize from '../sequelize.js';

// import Document from './Document.js';

class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},

		username: {
			type: DataTypes.STRING(14),
			unique: true,
		},

		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		fullname: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},

		email: {
			type: DataTypes.STRING,
			unique: true,
		},

		mobileNo: {
			type: DataTypes.STRING(12),
			unique: true,
		},

		IDno: {
			type: DataTypes.CHAR(12),
			unique: true,
		},

		householdIncome: {
			type: DataTypes.DECIMAL({ precision: 8, scale: 2 }),
		},

		address: {
			type: DataTypes.STRING,
		},

		jobTitle: {
			type: DataTypes.STRING(50),
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

// User.hasMany(Document, { foreignKey: 'userId' });
// Document.belongsTo(User, { foreignKey: 'userId' });


export async function getNextUserId(transaction) {
	return (
		await sequelize.query(
			`
	SELECT AUTO_INCREMENT a
	FROM information_schema.tables
	WHERE table_name = 'users'
	and table_schema = database();
	`,
			{ transaction, type: QueryTypes.SELECT }
		)
	)[0]['a'];
}

export default User;
