'use client';
import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface props {
  ticketTitle: string;
  eventDate: string;
  ticketID: string;
}

const ConfirmationTicket = ({ ticketTitle, eventDate, ticketID }: props) => {
  return (
    <Card
      className="max-w-md mx-auto bg-blue-900 text-blue-100 rounded-xl shadow-md p-6 
                     transition-all duration-300 hover:shadow-[0px_0px_20px_5px_rgba(59,130,246,0.5)]"
    >
      <CardHeader className="flex flex-col items-center space-y-4">
        <CheckCircle className="text-green-400 w-10 h-10" />
        <h1 className="text-2xl font-semibold text-blue-50">
          Ticket Confirmed!
        </h1>
        <Badge
          variant="outline"
          className="text-blue-200 bg-blue-800 px-3 py-1 rounded-full"
        >
          #{ticketID}
        </Badge>
      </CardHeader>

      <CardContent className="text-center">
        <Separator className="my-4 border-blue-700" />
        <h2 className="text-lg font-medium">{ticketTitle}</h2>
        <p className="text-blue-300 mt-2">Event Date: {eventDate}</p>
        <Separator className="my-4 border-blue-700" />
      </CardContent>

      <CardFooter className="flex flex-col items-center space-y-3">
        <Button
          variant="default"
          className="w-full bg-blue-700 text-blue-100 font-semibold rounded-lg hover:bg-blue-600"
        >
          View Ticket
        </Button>
        <Button
          variant="outline"
          className="w-full text-blue-200 border-blue-700 hover:bg-blue-800"
        >
          Download PDF
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConfirmationTicket;
