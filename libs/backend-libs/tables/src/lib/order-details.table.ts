import { Order } from './order.table';
import { ORDER_ALIAS, PRODUCT_ALIAS } from '@backend-demo/shared/constants';
import { Product } from './product.table';
import {
	IOrderDetailsAttributes,
	IOrderDetailsCreationAttributes,
} from '@backend-demo/backend-libs/entities';
import {
	OrderForeignKey,
	ProductForeignKey,
} from '@backend-demo/backend-libs/foreign-keys';
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Scopes,
	Table,
} from 'sequelize-typescript';

@Scopes(() => ({
	WITH_PRODUCT: {
		include: [
			{
				model: Product,
				as: PRODUCT_ALIAS,
			},
		],
	},
	WITH_ORDER: {
		include: [
			{
				model: Order,
				as: ORDER_ALIAS,
			},
		],
	},
}))
@Table
export class OrderDetails
	extends Model<IOrderDetailsAttributes, IOrderDetailsCreationAttributes>
	implements IOrderDetailsAttributes
{
	@Column({
		type: DataType.UUID,
		allowNull: false,
		primaryKey: true,
		defaultValue: DataType.UUIDV4,
	})
	code!: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	quantity!: number;

	@Column({
		type: DataType.DECIMAL,
		allowNull: false,
	})
	totalPrice!: number;

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
	})
	canBeDeliveredSeparately!: boolean;

	@ForeignKey(() => Order)
	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
	OrderCode!: string;

	@ForeignKey(() => Product)
	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
	ProductCode!: string;

	@BelongsTo(() => Order, OrderForeignKey.belongsTo())
	Order?: Order;

	@BelongsTo(() => Product, ProductForeignKey.belongsTo())
	Product?: Product;
}
