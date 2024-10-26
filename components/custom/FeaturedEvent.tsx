'use client';
import React from 'react';
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';

interface props {
    name: string;
    description: string;
    location: string;
    eventStartDate: number;
    eventHost: string;
    imageURL: string | null;
}

const FeaturedEvent = ({
    name, description, location, eventStartDate, eventHost, imageURL
}: props) => {
    return <Card>
        <CardHeader>
            {imageURL && <img src={imageURL} alt={name}></img>}
            <CardTitle>
            {name}
            </CardTitle>
            <CardDescription>
            {location}<br />
            {new Date(eventStartDate*1000).toLocaleString()}
            </CardDescription>
        </CardHeader>
        <CardContent>
            {description}
        </CardContent>
        <CardFooter>
            <i>Host: {eventHost.substring(0, 8)}...{eventHost.substring(eventHost.length-3)}</i>
        </CardFooter>
    </Card>
}

export default FeaturedEvent;