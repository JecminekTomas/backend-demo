import { ConstraintRule } from '@backend-demo/backend-libs/foreign-keys';
import { Account, Product } from '@backend-demo/backend-libs/tables';
import {
	ACCOUNT_TABLE_NAME_PLURAL,
	PRODUCT_TABLE_NAME_PLURAL,
} from '@backend-demo/shared/constants';
import { DataType } from 'sequelize-typescript';
import { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize
		.getQueryInterface()
		.createTable<Product>(PRODUCT_TABLE_NAME_PLURAL, {
			code: {
				allowNull: false,
				primaryKey: true,
				type: DataType.UUID,
			},
			name: {
				type: DataType.STRING,
				allowNull: false,
			},
			description: {
				type: DataType.STRING,
				allowNull: false,
			},
			price: {
				type: DataType.DOUBLE,
			},
			color: {
				type: DataType.STRING,
				allowNull: true,
			},
			AccountCode: {
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
		.addConstraint(PRODUCT_TABLE_NAME_PLURAL, {
			fields: ['AccountCode'] as Array<keyof Product> as string[],
			onDelete: ConstraintRule.CASCADE,
			onUpdate: ConstraintRule.CASCADE,
			type: 'foreign key',
			references: {
				field: 'code' as keyof Account,
				table: ACCOUNT_TABLE_NAME_PLURAL,
			},
		});
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize
		.getQueryInterface()
		.dropTable({ tableName: PRODUCT_TABLE_NAME_PLURAL });
};
