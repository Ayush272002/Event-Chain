import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ImageCarousel from './ImageCarousel';
import { buyHandler } from '@/lib/buyHandler';
import { useToast } from '@/hooks/use-toast';
import NumberPicker from './TicketButton';

export interface EventDescriptionProps {
  eventDetails: {
    EventID: number;
    name: string;
    date: string;
    location: string;
    ticketPrice: number;
    description: string;
    capacity: number;
    ticketsSold: number;
    imageUrl: string[];
    host: string;
  };
}

const EventDescription: React.FC<EventDescriptionProps> = ({
  eventDetails,
}) => {
  const { toast } = useToast();
  const [numTickets, setNumTickets] = useState(1);
  const eventDate = new Date(Number(eventDetails.date) * 1000).toLocaleString();

  const handleBuyNow = () => {
    buyHandler(eventDetails.EventID, numTickets, toast);
  };

  return (
    <Card className="pt-5 px-6 bg-gradient-to-r from-slate-400 to-slate-200 rounded-xl shadow-lg max-w-4xl mt-20 mx-auto">
      <CardHeader className="flex flex-col items-start space-y-4">
        <h1 className="text-3xl font-semibold text-gray-800">
          {eventDetails.name}
        </h1>
        <Badge
          variant="outline"
          className="text-light-purple bg-blue-100 px-3 py-1 rounded-full"
        >
          Price: ${eventDetails.ticketPrice.toFixed(2)}
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-10">
        <div className="md:w-1/2 flex justify-center">
          <ImageCarousel images={eventDetails.imageUrl || []} />
        </div>
        <div className="md:w-1/2 text-gray-700">
          <Separator className="my-4" />
          <p className="leading-relaxed">{eventDetails.description}</p>
          <Separator className="my-4" />
          <p><b>Location:</b><br />{eventDetails.location}</p><br />
          <p><b>Date:</b><br />{eventDate}</p><br />
          <p><b>Host:</b><br />{eventDetails.host}</p>
          {eventDetails.ticketsSold / eventDetails.capacity >= 0.9 && (
            <div className="mt-2 p-2 bg-yellow-300 text-black rounded">
              Limited Tickets Remaining!
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <Button
          variant="default"
          // className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700"
          className="w-full md: w-auto px-4 py-2 text-left hover:bg-purple hover:bg-opacity-75"
          onClick={handleBuyNow}
        >
          Buy now Using MetaMask
        </Button>
        <div className="relative md:left-5">
          <NumberPicker
            initialCount={numTickets}
            min={1}
            max={eventDetails.capacity - eventDetails.ticketsSold}
            onChange={setNumTickets}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventDescription;
