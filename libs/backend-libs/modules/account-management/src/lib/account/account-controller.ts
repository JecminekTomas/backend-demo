import {
	Body,
	Delete,
	Get,
	Injectable,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { AccountExternalService } from './account-external.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
/**
 * controller bude mít stejné metody jako external-service, ale bude používat dto classes
 */

import {
	QueryManyAccountDto,
	QueryOneAccountDto,
} from './dto/query-account.dto';

export class AccountController {
	constructor(
		private readonly accountExternalService: AccountExternalService
	) {}

	@Get(':code')
	async findOne(@Param() code: string, @Query() query?: QueryOneAccountDto) {
		return this.accountExternalService.findOne({ code }, query);
	}
	@Get()
	async findFirst(@Query() query?: QueryManyAccountDto) {
		return this.accountExternalService.findFirst(query);
	}
	@Get()
	async findAll(@Query() query?: QueryManyAccountDto) {
		return this.accountExternalService.findAll(query);
	}
	@Get('/count')
	async count() {
		return this.accountExternalService.count();
	}
	@Delete(':code')
	async delete(@Param() code: string) {
		return this.accountExternalService.delete({ code });
	}

	@Post()
	async createOne(@Body() payload: CreateAccountDto) {
		return this.accountExternalService.createOne(payload);
	}
	@Post()
	async createMany(@Body() payload: CreateAccountDto[]) {
		return this.accountExternalService.createMany(payload);
	}

	//TODO: WHAT IS PURPOSE OF THIS?
	// @Post()
	// async upsertOne(@Body() payload: CreateAccountDto) {
	// 	return this.accountExternalService.upsertOne(payload);
	// }

	@Patch(':code')
	async updateOne(@Param() code: string, @Body() payload: UpdateAccountDto) {
		return this.accountExternalService.updateOne(payload, { code });
	}

	@Get('/restore/:code')
	async restore(@Param() code: string) {
		return this.accountExternalService.restore({ code });
	}
}
