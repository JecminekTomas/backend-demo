import { createNamespace } from 'cls-hooked';
import { databaseModels } from '@backend-demo/backend-libs/tables';
import { Sequelize } from 'sequelize-typescript';
import { config } from 'dotenv';
config();

export const databaseProviders = [
	{
		provide: 'SEQUELIZE',
		useFactory: async () => {
			const myNamespace = createNamespace('my-namespace');
			Sequelize.useCLS(myNamespace);
			const sequelize = new Sequelize({
				dialect: 'postgres',
				host: process?.env?.['DB_HOST'],
				port: Number(process?.env?.['DB_PORT']) ?? 5433,
				username: process?.env?.['DB_USERNAME'],
				password: process?.env?.['DB_PASSWORD'],
				database: process?.env?.['DB_NAME'],
			});
			sequelize.addModels(databaseModels);
			return sequelize;
		},
	},
];
