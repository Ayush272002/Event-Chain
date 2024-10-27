'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Define the schema using Zod
const eventSchema = z
  .object({
    name: z.string().min(1, { message: 'Event name is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    capacity: z
      .number({ invalid_type_error: 'Capacity must be a number' })
      .min(1, { message: 'Capacity must be at least 1' })
      .refine(Number.isInteger, { message: 'Capacity must be an integer' }),
    ticketPrice: z
      .number({ invalid_type_error: 'Ticket price must be a number' })
      .min(0, { message: 'Ticket price must be at least 0' }),
    location: z.string().min(1, { message: 'Location is required' }),
    eventStartTime: z.preprocess(
      (val) =>
        typeof val === 'string' && val !== '' ? new Date(val) : undefined,
      z
        .date({ required_error: 'Event start time is required' })
        .min(new Date(), { message: 'Event start time must be in the future' })
    ),
    eventEndTime: z.preprocess(
      (val) =>
        typeof val === 'string' && val !== '' ? new Date(val) : undefined,
      z.date().optional()
    ),
    images: z.preprocess(
      (val) => {
        if (Array.isArray(val)) {
          // Filter out empty strings
          return val.filter((v) => v !== '');
        }
        return [];
      },
      z
        .array(z.string().url({ message: 'Invalid image URL format' }))
        .optional()
    ),
  })
  .superRefine((data, ctx) => {
    if (data.eventEndTime && data.eventEndTime <= data.eventStartTime) {
      ctx.addIssue({
        code: 'custom',
        message: 'Event end time must be after the start time',
        path: ['eventEndTime'],
      });
    }
  });

// Define the TypeScript type based on the Zod schema
export type EventFormData = z.infer<typeof eventSchema>;

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
}

const EventForm = ({ onSubmit }: EventFormProps) => {
  const [imageFields, setImageFields] = useState<string[]>(['']);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    mode: 'onChange',
    defaultValues: {
      images: [''],
    },
  });

  const images = watch('images') || [];

  const handleAddImageField = () => {
    setImageFields((prev) => [...prev, '']);
  };

  const handleRemoveImageField = (index: number) => {
    const updatedImages = [...imageFields];
    updatedImages.splice(index, 1);
    setImageFields(updatedImages);
    // Also update the form values
    setValue('images', updatedImages);
  };

  const currentDateTime = new Date().toISOString().slice(0, 16);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name Field */}
      <div>
        <Label htmlFor="name">Event Name</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      {/* Description Field */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register('description')} />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Capacity Field */}
      <div>
        <Label htmlFor="capacity">Capacity</Label>
        <Input
          type="number"
          id="capacity"
          {...register('capacity', { valueAsNumber: true })}
        />
        {errors.capacity && (
          <p className="text-red-500">{errors.capacity.message}</p>
        )}
      </div>

      {/* Ticket Price Field */}
      <div>
        <Label htmlFor="ticketPrice">Ticket Price (in USD)</Label>
        <Input
          id="ticketPrice"
          {...register('ticketPrice', { valueAsNumber: true })}
        />
        {errors.ticketPrice && (
          <p className="text-red-500">{errors.ticketPrice.message}</p>
        )}
      </div>

      {/* Location Field */}
      <div>
        <Label htmlFor="description">Location</Label>
        <Textarea id="description" {...register('location')} />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Event Start Time Field */}
      <div>
        <Label htmlFor="eventStartTime">Event Start Date & Time</Label>
        <Input
          type="datetime-local"
          id="eventStartTime"
          {...register('eventStartTime')}
          min={currentDateTime}
          max="2100-12-31T23:59"
        />
        {errors.eventStartTime && (
          <p className="text-red-500">{errors.eventStartTime.message}</p>
        )}
      </div>

      {/* Event End Time Field */}
      <div>
        <Label htmlFor="eventEndTime">Event End Date & Time (Optional)</Label>
        <Input
          type="datetime-local"
          id="eventEndTime"
          {...register('eventEndTime')}
          min={currentDateTime}
          max="2100-12-31T23:59"
        />
        {errors.eventEndTime && (
          <p className="text-red-500">{errors.eventEndTime.message}</p>
        )}
      </div>

      {/* Images Field */}
      <div>
        <Label>Event Images (Optional)</Label>
        {imageFields.map((_, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <Input
              type="text"
              placeholder="Enter image URL"
              {...register(`images.${index}`)}
            />
            {imageFields.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleRemoveImageField(index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button type="button" onClick={handleAddImageField}>
          Add URL
        </Button>
        {/* Display individual image URL errors */}
        {errors.images &&
          Array.isArray(errors.images) &&
          errors.images.map((imgError, index) => {
            if (imgError) {
              const message = imgError.message || 'Invalid image URL';
              return (
                <p key={index} className="text-red-500">
                  Image {index + 1}: {message}
                </p>
              );
            }
            return null;
          })}
      </div>

      {/* Submit Button */}
      <Button type="submit">Create Event</Button>
    </form>
  );
};

export default EventForm;
