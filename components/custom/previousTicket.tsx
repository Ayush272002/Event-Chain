'use client';
import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export interface PreviousTicket {
  name: string;
  status: boolean;
  description: string;
  capacity: number;
  ticketPrice: number;
  eventStartDate: Date;
  eventEndDate?: Date;
  eventHost: string; // metamask address
}

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const PreviousTicketComponent = ({
  name,
  status,
  description,
  capacity,
  ticketPrice,
  eventStartDate,
  eventEndDate,
  eventHost,
}: PreviousTicket) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Card className="w-[350px] bg-[#1e2a3a] text-white shadow-lg">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
            <CardDescription className="text-gray-400">
              Status: {status ? 'Active' : 'Inactive'}
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 wrap">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <p className="text-gray-300 mb-2 whitespace-normal break-words">
                {description}
              </p>
              <p className="text-gray-400">
                <strong>Capacity:</strong> {capacity}
              </p>
              <p className="text-gray-400">
                <strong>Ticket Price:</strong> ${ticketPrice.toFixed(2)}
              </p>
              <p className="text-gray-400">
                <strong>Event Start:</strong> {eventStartDate.toLocaleString()}
              </p>
              {eventEndDate && (
                <p className="text-gray-400">
                  <strong>Event End:</strong> {eventEndDate.toLocaleString()}
                </p>
              )}
              <p className="text-gray-400 whitespace-normal break-all">
                <strong>Host:</strong> {eventHost}
              </p>
            </motion.div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <Button className="bg-[#365b85] text-white hover:bg-[#2b4a70]">
              View Details
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
