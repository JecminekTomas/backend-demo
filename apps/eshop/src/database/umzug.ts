import { Umzug, SequelizeStorage } from 'umzug';
import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
config();

export const sequelize = new Sequelize({
	dialect: 'postgres',
	host: process?.env?.['DB_HOST'],
	port: Number(process?.env?.['DB_PORT']) ?? 5433,
	username: process?.env?.['DB_USERNAME'],
	password: process?.env?.['DB_PASSWORD'],
	database: process?.env?.['DB_NAME'],
});

export const migrator = new Umzug({
	migrations: {
		glob: ['migrations/*.?(js|ts)', { cwd: __dirname }],
		resolve: (ctx) => {
			console.log('Found migration:', ctx.path);
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			const migration = require(ctx.path);
			// Store migration names without .js or .ts suffix
			// so that both typescript and compiled javascript
			// migrations are compatible with each other
			ctx.name = ctx.name.replace(/\.js|\.ts/g, '');
			return {
				path: ctx.path,
				name: ctx.name,
				up: () => migration.up(ctx, Sequelize),
				down: () => migration.down(ctx, Sequelize),
			};
		},
	},
	context: sequelize,
	storage: new SequelizeStorage({
		sequelize,
	}),
	logger: undefined,
});

export type Migration = typeof migrator._types.migration;
