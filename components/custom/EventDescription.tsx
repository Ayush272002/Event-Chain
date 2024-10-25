'use client';
import React from 'react';
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
import BuyTicket from './BuyTicket';
import TicketButton from './TicketButton';

const EventDescription = () => {
  return (
    <Card className="pt-10 pb-16 px-6 bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl shadow-lg max-w-4xl mx-auto">
      <CardHeader className="flex flex-col items-start space-y-4">
        <h1 className="text-3xl font-semibold text-gray-800">TicketTitle</h1>
        <Badge
          variant="outline"
          className="text-blue-600 bg-blue-100 px-3 py-1 rounded-full"
        >
          Price: $99
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-10">
        <div className="md:w-1/2 flex justify-center">
          <ImageCarousel />
        </div>
        <div className="md:w-1/2 text-gray-700">
          <Separator className="my-4" />
          <p className="leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <Separator className="my-4" />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <Button
          variant="default"
          className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700"
        >
          Buy now Using MetaMask
        </Button>
        <div className="relative md:left-5">
          <TicketButton />
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventDescription;
