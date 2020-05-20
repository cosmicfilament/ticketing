import { Publisher, OrderCreatedEvent, Subjects } from '@dogslobber/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
	subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
