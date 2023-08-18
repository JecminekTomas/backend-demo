import { OrderDetails, Product } from '@backend-demo/backend-libs/tables';
import { Migration, sequelize } from '../umzug';
import {
	ORDER_DETAILS_TABLE_NAME_PLURAL,
	ORDER_TABLE_NAME_PLURAL,
	PRODUCT_TABLE_NAME_PLURAL,
} from '@backend-demo/shared/constants';
import { DataType } from 'sequelize-typescript';
import { ConstraintRule } from '@backend-demo/backend-libs/foreign-keys';
import { Order } from 'sequelize';

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize
		.getQueryInterface()
		.createTable<OrderDetails>(ORDER_DETAILS_TABLE_NAME_PLURAL, {
			code: {
				type: DataType.STRING,
				allowNull: false,
			},
			quantity: {
				type: DataType.INTEGER,
				allowNull: false,
			},
			totalPrice: {
				type: DataType.DECIMAL,
				allowNull: false,
			},
			canBeDeliveredSeparately: {
				type: DataType.BOOLEAN,
				allowNull: false,
			},
			OrderCode: {
				type: DataType.UUID,
				allowNull: false,
			},
			ProductCode: {
				type: DataType.UUID,
				allowNull: false,
			},
			createdAt: {
				type: DataType.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: DataType.DATE,
				allowNull: true,
			},
			deletedAt: {
				type: DataType.DATE,
				allowNull: true,
			},
		});
	await sequelize
		.getQueryInterface()
		.addConstraint(ORDER_DETAILS_TABLE_NAME_PLURAL, {
			fields: ['OrderCode'] as Array<keyof OrderDetails> as string[],
			onDelete: ConstraintRule.CASCADE,
			onUpdate: ConstraintRule.CASCADE,
			type: 'foreign key',
			references: {
				field: 'code' as keyof Order,
				table: ORDER_TABLE_NAME_PLURAL,
			},
		});
	await sequelize
		.getQueryInterface()
		.addConstraint(ORDER_DETAILS_TABLE_NAME_PLURAL, {
			fields: ['ProductCode'] as Array<keyof OrderDetails> as string[],
			onDelete: ConstraintRule.CASCADE,
			onUpdate: ConstraintRule.CASCADE,
			type: 'foreign key',
			references: {
				field: 'code' as keyof Product,
				table: PRODUCT_TABLE_NAME_PLURAL,
			},
		});
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize
		.getQueryInterface()
		.dropTable({ tableName: ORDER_DETAILS_TABLE_NAME_PLURAL });
};
