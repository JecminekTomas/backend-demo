import { CODE_ALIAS } from './base.constants';
import { ORDER_ALIAS } from './order.constants';

export const ORDER_DETAILS_ALIAS = `${ORDER_ALIAS}Details` as const;
export const ORDER_DETAILS_CODE_ALIAS =
	`${ORDER_DETAILS_ALIAS}${CODE_ALIAS}` as const;
const ORDER_DETAILS_API_PARAM = 'orderDetails';
export const ORDER_DETAILS_CODE_API_PARAM =
	`${ORDER_DETAILS_API_PARAM}${CODE_ALIAS}` as const;

export const ORDER_DETAILS_TABLE_NAME_PLURAL =
	`${ORDER_DETAILS_ALIAS}` as const;
