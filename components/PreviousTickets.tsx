import React from 'react';
import { PreviousTicketComponent } from '@/components/custom/previousTicket';
import { PreviousTicket } from '@/components/custom/previousTicket';

const PreviousTickets = ({}: PreviousTicket) => {
  return (
    <div className="flex flex-col space-y-4">
      <PreviousTicketComponent
        name="Concert Ticket"
        status={true}
        description="This is a previous ticket for a concert event."
        capacity={500}
        ticketPrice={50}
        eventStartDate={new Date('2023-09-15T19:00:00')}
        eventHost="0x1234567890abcdef1234567890abcdef12345678"
      />
      <PreviousTicketComponent
        name="Festival Ticket"
        status={false}
        description="This is a previous ticket for a festival event."
        capacity={1000}
        ticketPrice={100}
        eventStartDate={new Date('2023-07-10T12:00:00')}
        eventEndDate={new Date('2023-07-12T23:59:00')} // Optional, passed here
        eventHost="0xabcdef1234567890abcdef1234567890abcdef12"
      />
    </div>
  );
};

export default PreviousTickets;
