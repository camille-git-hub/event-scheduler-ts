import { z } from 'zod';

export const EventSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(3).max(255),
    description: z.string().max(5000).optional(),
    date: z.string(),
    location: z.string().max(255),
}).strip();


export const ApiEventSchema = z.object({
  results: z.array(EventSchema)
}).strip();

export type Event = z.infer<typeof EventSchema>;

export type ReactProviderProps = {
    children: React.ReactNode;
    isAuthenticated: boolean;
};


export type User = {
  email: string;
  password: string;
  name?: string;
};

export type AuthResponse = {
  token: string;
  user: {
    id?: number;
    email: string;
  };
};

