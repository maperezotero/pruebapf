import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';


export const User = sequelize.define('user', {
	first_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	last_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	nickname: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	full_name: {
		type: DataTypes.VIRTUAL,
		get() {
			return `${this.first_name} ${this.last_name}`;
		},
	},
	email: {
		type: DataTypes.TEXT,
		allowNull: false,
		unique: true,
	},
	phone: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	city: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	state: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	postal_code: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	is_admin: {
		type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
	},
	photo: {
		type: DataTypes.STRING,
        allowNull: true,
	},
}, {
	timestamps: true,
	createdAt: 'created_date',
	updatedAt: 'update_date',
	paranoid: true,
	deletedAt: 'destroyTime',
});
