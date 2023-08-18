import { CODE_ALIAS, S_ALIAS } from './base.constants';

export const PRODUCT_ALIAS = 'Product';
export const PRODUCTS_ALIAS = `${PRODUCT_ALIAS}${S_ALIAS}` as const;
export const PRODUCT_CODE_ALIAS = `${PRODUCT_ALIAS}${CODE_ALIAS}` as const;
const PRODUCT_API_PARAM = 'product';
export const PRODUCT_CODE_API_PARAM =
	`${PRODUCT_API_PARAM}${CODE_ALIAS}` as const;
export const QUANTITY_PARAM = 'quantity';

export const PRODUCT_TABLE_NAME_SINGULAR = `${PRODUCT_ALIAS}` as const;
export const PRODUCT_TABLE_NAME_PLURAL = `${PRODUCTS_ALIAS}` as const;
