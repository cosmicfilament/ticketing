import { Publisher, Subjects, TicketUpdatedEvent } from '@dogslobber/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
	// variable : type = assignment
	subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
