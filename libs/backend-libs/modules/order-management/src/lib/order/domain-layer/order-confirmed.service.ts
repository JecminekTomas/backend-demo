import { IOrderFindOneParams } from '../entity-layer/interfaces/order-read.interfaces';
import { Injectable } from '@nestjs/common';
import { OrderReadService } from '../entity-layer/order-read.service';

@Injectable()
export class OrderConfirmedService {
	constructor(private readonly orderReadService: OrderReadService) {}

	async getReceipt(params: IOrderFindOneParams) {
		const order = await this.orderReadService.findOne(
			{
				orderCode: params.orderCode,
				accountCode: params.accountCode,
			},
			{
				includeOrderDetails: true,
			}
		);
		if (!order) throw new Error('This order does not exist');
		if (!order.confirmed)
			throw new Error('This order was not yet confirmed');
		return order.OrderDetails;
	}
}
