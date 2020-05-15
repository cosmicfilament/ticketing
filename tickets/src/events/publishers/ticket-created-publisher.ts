import { Publisher, Subjects, TicketCreatedEvent } from '@dogslobber/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	// variable : type = assignment
	subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
