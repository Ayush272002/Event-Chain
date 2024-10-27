'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { PreviousTicketComponent } from './previousTicket';

interface profileProps {
  profileKey: string;
}

// Dark theme and animation setup
const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const Profile = ({ profileKey }: profileProps) => {
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
          ></motion.div>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <motion.div
                className="flex flex-col space-y-1.5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <Label htmlFor="framework" className="text-gray-300 text-lg">
                  MetaMask Public Key:
                </Label>
                <Label id="name">{'#9383r]3r32r2rni20r9'}</Label>
              </motion.div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          ></motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
export default Profile;
// return <EventDescription/>
// return <ConfirmationTicket ticketTitle='taylor swift' ticketID='2' eventDate='27th september'/>;
// return <Profile/>;
