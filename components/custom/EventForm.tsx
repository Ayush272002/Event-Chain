'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
      .refine((val) => Number.isInteger(val), {
        message: 'Capacity must be an integer',
      }),
    ticketPrice: z
      .number({ invalid_type_error: 'Ticket price must be a number' })
      .min(0, { message: 'Ticket price must be at least 0' })
      .refine((val) => Number.isInteger(val), {
        message: 'Ticket price must be in cents',
      }),
    eventDate: z.coerce.date({ message: 'Event date is required' }).refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Remove time component
        return date >= today;
      },
      {
        message: 'Event date must be today or in the future',
      }
    ),
    eventStartTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
      message: 'Invalid start time format',
    }),
    eventEndTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
      message: 'Invalid end time format',
    }),
    images: z
      .array(
        z
          .string()
          .url()
          .regex(
            /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            { message: 'Invalid image URL format' }
          )
      )
      .optional(),
  })
  .superRefine((d, ctx) => {
    // Parse event start time
    const startTime = new Date(d.eventDate);
    const [startHours, startMinutes] = d.eventStartTime.split(':').map(Number);
    startTime.setHours(startHours, startMinutes, 0, 0);

    // Parse event end time
    const endTime = new Date(d.eventDate);
    const [endHours, endMinutes] = d.eventEndTime.split(':').map(Number);
    endTime.setHours(endHours, endMinutes, 0, 0);

    const currentDateTime = new Date();

    // Check if event start time is in the future
    if (startTime <= currentDateTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Event start time must be in the future',
        path: ['eventStartTime'],
      });
    }

    // Check if event end time is after start time
    if (endTime <= startTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Event end time must be after the start time',
        path: ['eventEndTime'],
      });
    }
  });

// Define the TypeScript type based on the Zod schema
type EventFormData = z.infer<typeof eventSchema>;

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
}

const EventForm = ({ onSubmit }: EventFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    mode: 'onChange',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setValue('images', filesArray, { shouldValidate: true });
    }
  };

  const images = watch('images') || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Event Name</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register('description')} />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="capacity">Capacity</Label>
        <Input
          type="number"
          id="capacity"
          {...register('capacity', {
            valueAsNumber: true,
          })}
        />
        {errors.capacity && (
          <p className="text-red-500">{errors.capacity.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="ticketPrice">Ticket Price (in USD cents)</Label>
        <Input
          type="number"
          id="ticketPrice"
          {...register('ticketPrice', {
            valueAsNumber: true,
          })}
        />
        {errors.ticketPrice && (
          <p className="text-red-500">{errors.ticketPrice.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="eventDate">Event Date</Label>
        <Input type="date" id="eventDate" {...register('eventDate')} />
        {errors.eventDate && (
          <p className="text-red-500">{errors.eventDate.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="eventStartTime">Event Start Time</Label>
        <Input
          type="time"
          id="eventStartTime"
          {...register('eventStartTime')}
        />
        {errors.eventStartTime && (
          <p className="text-red-500">{errors.eventStartTime.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="eventEndTime">Event End Time</Label>
        <Input type="time" id="eventEndTime" {...register('eventEndTime')} />
        {errors.eventEndTime && (
          <p className="text-red-500">{errors.eventEndTime.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="images">Event Images</Label>
        <input
          type="file"
          id="images"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        {errors.images && (
          <p className="text-red-500">{errors.images.message}</p>
        )}
        <div className="mt-2 flex flex-wrap gap-2">
          {images.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Event Image ${index + 1}`}
              className="w-24 h-24 object-cover rounded"
            />
          ))}
        </div>
      </div>

      <Button type="submit">Create Event</Button>
    </form>
  );
};

export default EventForm;
