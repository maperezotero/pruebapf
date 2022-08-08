import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Destination } from './Destinations.js';
import { Activity } from './Activities.js';
import { Order } from './Orders.js';
import { OrderItem } from './OrderItems.js';
import { User } from './Users.js';
import { RatingAndFavourite } from './RatingAndFavourite.js';


export const Package = sequelize.define('package', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	main_image: {
		type: DataTypes.STRING,
		defaultValue: "",
	},
	images: {
		type: DataTypes.ARRAY(DataTypes.STRING),
		allowNull: false,
	},
	price: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
    start_date: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},
    end_date: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},
    duration: {
		type: DataTypes.VIRTUAL,
		get() {
			const start_date = new Date(this.start_date);
			const end_date = new Date(this.end_date);
			return (end_date - start_date) / (1000*60*60*24);
		},
	},
    seasson: {
		type: DataTypes.ENUM(
			"Verano",
			"Otoño",
			"Invierno",
			"Primavera",
			"Especial"
		),
		allowNull: false,
	},
    type: {
		type: DataTypes.ENUM(
			"Crucero",
			"Pack Short",
			"Pack Large",
			"Multidestino"
		),
		allowNull: false,
	},
	featured: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	available: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
	on_sale: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
}, {
	timestamps: false,
	paranoid: true,
	deletedAt: 'destroyTime',
});

Package.belongsToMany(Order, {through: OrderItem})
Order.belongsToMany(Package, {through: OrderItem})

Package.belongsToMany(Destination, {through: 'Package_Destination'})
Destination.belongsToMany(Package, {through: 'Package_Destination'})

Package.belongsToMany(Activity, {through: 'Package_Activity'})
Activity.belongsToMany(Package, {through: 'Package_Activity'})

User.belongsToMany(Package, {through: RatingAndFavourite})
Package.belongsToMany(User, {through: RatingAndFavourite})
