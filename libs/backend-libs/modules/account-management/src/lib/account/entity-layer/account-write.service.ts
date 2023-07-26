import { Account } from '@backend-demo/backend-libs/tables';
import { ACCOUNT_REPOSITORY } from '@backend-demo/shared/constants';
import { AccountReadService } from './account-read.service';
import { Inject, Injectable } from '@nestjs/common';
import {
	IAccountCreateManyParams,
	IAccountCreateManyQuery,
	IAccountCreateOneParams,
	IAccountCreateOneQuery,
	IAccountUpdateManyParams,
	IAccountUpdateManyQuery,
	IAccountUpdateOneParams,
	IAccountUpdateOneQuery,
	IAccountUpsertOneParams,
	IAccountUpsertOneQuery,
} from './interfaces/account-write.interfaces';
import { IAccountCreate } from '../dto/interfaces/create-account.interface';
import { IAccountUpdate } from '../dto/interfaces/update-account.interface';
/**
 * inject AccountReadService v konstruktoru
 *
 * transaction -- na konci (možná bude libka transactionService)
 * createOne
 * createMany
 * upsertOne
 * updateOne
 * updateMany
 */

@Injectable()
export class AccountWriteService {
	constructor(
		@Inject(ACCOUNT_REPOSITORY)
		private readonly accountRepository: typeof Account,
		private readonly accountReadService: AccountReadService
	) {}

	async createOne(
		payload: IAccountCreate,
		params?: IAccountCreateOneParams,
		query?: IAccountCreateOneQuery
	): Promise<Account> {
		const { address, email, name, phone, surname } = payload;

		return this.accountRepository.create({
			address: address,
			email: email,
			name: name,
			surname: surname,
			phone: phone,
		});
	}

	async updateOne(
		payload: IAccountUpdate,
		params: IAccountUpdateOneParams,
		query?: IAccountUpdateOneQuery
	) {
		const { address, email, name, phone, surname } = payload;
		const { code } = params;

		const account = await this.accountReadService.findOne({
			code: code,
		});

		return this.accountRepository.update(
			{
				name: name,
				surname: surname,
				address: address,
				email: email,
				phone: phone,
			},
			{ where: { code: account.code } }
		);
	}

	async createMany(
		payload: IAccountCreate[],
		params?: IAccountCreateManyParams,
		query?: IAccountCreateManyQuery
	) {
		return await Promise.all([
			payload.forEach((account) => this.createOne(account)),
		]);
	}

	//TODO: Think how to use it
	async updateMany(
		payload: IAccountUpdate[],
		params?: IAccountUpdateManyParams,
		query?: IAccountUpdateManyQuery
	) {}

	async upsertOne(
		payload: IAccountCreate,
		params?: IAccountUpsertOneParams,
		query?: IAccountUpsertOneQuery
	): Promise<Account> {
		const { address, email, name, phone, surname } = payload;
		const [instance, created] = await this.accountRepository.upsert({
			address: address,
			email: email,
			name: name,
			surname: surname,
			phone: phone,
		});
		return instance;
	}
}
