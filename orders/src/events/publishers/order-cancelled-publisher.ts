import { Publisher, OrderCancelledEvent, Subjects } from '@dogslobber/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
