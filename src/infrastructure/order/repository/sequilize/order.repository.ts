import Order from "../../../../domain/checkout/entity/order";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItem from "../../../../domain/checkout/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface{
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

    async find(id: string): Promise<Order> {
        const found  = await OrderModel.findOne({
            where: {
                id,
            },
            include: ["items"],
            rejectOnEmpty: true,
        })

        const items = found.items.map((item) => {
            return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
        })

        return new Order(found.id, found.customer_id, items);
    }

    async findAll(): Promise<Order[]> {
        const found  = await OrderModel.findAll({
            include: ["items"],
        })

        return found.map((order: OrderModel) => {
            const items = order.items.map((item) => {
                return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
            })

            return new Order(order.id, order.customer_id, items)
        });
  }

    async update(entity: Order): Promise<void> {
         await OrderModel.update(
            {
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
             {
                 where: {
                     id: entity.id,
                 }
             }
        );
    }
}
