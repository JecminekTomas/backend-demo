import { IAccountQueryOne } from '../../dto/interfaces/query-account.interface';

interface IAccountSearchableParams {
	/**
	 * You can search by substring (case insensitive)
	 */
	address?: string
	email?: string
}

export interface IAccountFindOneParams {
	code: string;
}
export interface IAccountFindOneQuery extends IAccountQueryOne {}

export interface IAccountFindManyParams {}
export interface IAccountFindManyQuery extends IAccountSearchableParams{
	//countOrders: boolean;
}

export interface IAccountFindFirstParams {}
export interface IAccountFindFirstQuery extends IAccountSearchableParams {
	includeOrders?: boolean;
}