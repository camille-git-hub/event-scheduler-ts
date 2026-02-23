
import { ApiEventSchema } from '../types';
import type { Event, User, AuthResponse } from '../types';

const API_URL: string = (import.meta.env.VITE_API_URL) || "http://localhost:3001";

console.log('API_URL:', API_URL); 
console.log('ENV:', import.meta.env.VITE_API_URL);

function getToken() {
  return localStorage.getItem("token");
}

const getIncomingEvents = async (): Promise<Event[]> => {
    try {
        console.log('🔍 Fetching from:', `${API_URL}/api/events/incoming`);
        
        const response = await fetch(`${API_URL}/api/events/incoming`); 
        console.log('📡 Response status:', response.status);

        const data = await response.json();
        console.log('📦 Raw data received:', data);  // ← What does API send?
        
        const result = ApiEventSchema.safeParse(data);
        console.log('✅ Validation success?:', result.success);
        
        if (!result.success) {
            console.error('❌ Validation errors:', result.error);  // ← What's wrong?
            console.error('❌ Full error:', result.error);
            throw new Error('Invalid API response format');
        }
        return result.data.results;
        
    } catch (err) {
        console.error('💥 Error:', err);
        throw new Error('Failed to load events. Please try again.');
    }
};




const getAllEvents = async (): Promise<Event[]> => {
    try {
        const response = await fetch(`${API_URL}/api/events`); 

        const data = await response.json();
        const result = ApiEventSchema.safeParse(data);
        if (!result.success) {
            console.error('Validation errors:', result.error);
            throw new Error('Invalid API response format');
        }
        return result.data.results;
    } catch (err) {
        console.error('Error:', err);
        throw new Error('Failed to load events. Please try again.');

    }
};

const signUp = async (userData: User): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await fetch(`${API_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error(`Error found: ${response.status})`);
        }
        const result = await response.json();
        return result;
    } catch (err) {
        console.error('Error:', err);
        throw new Error('Failed to register user. Please try again.');
    }
};

const login = async (credentials: User): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            throw new Error(`Error found: ${response.status})`);
        }
        const result = await response.json();
        return result;
    } catch (err) {
        console.error('Error:', err);
        throw new Error('Failed to login. Please check your credentials and try again.');
    }
};

const createEvent = async (eventData: Omit<Event, 'id'>): Promise<{
  id: any; success: boolean; message?: string 
}> => {
    try {
        const token = getToken();
        const response = await fetch(`${API_URL}/api/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(eventData),
        });
        if (!response.ok) {
            throw new Error(`Error found: ${response.status})`);
        }
        const result = await response.json();
        return result;
    } catch (err) {
        console.error('Error:', err);
        throw new Error('Failed to create event. Please try again.');
    }
};

const updateEvent = async (id: number | string, eventData: Partial<Event>): Promise<{ success: boolean; message?: string }> => {
    try {
        const token = getToken();
        const response = await fetch(`${API_URL}/api/events/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(eventData),
        });
        if (!response.ok) {
            throw new Error(`Error found: ${response.status})`);
        }
        const result = await response.json();
        return result;
    } catch (err) {
        console.error('Error:', err);
        throw new Error('Failed to update event. Please try again.');

    }
};

const getEventById = async (id: number): Promise<Event> => {
    try {
        const response = await fetch(`${API_URL}/api/events/${id}`);
        if (!response.ok) {
            throw new Error(`Error found: ${response.status})`);
        }
        const result = await response.json();
        return result;
    } catch (err) {
        console.error('Error:', err);
        throw new Error('Failed to fetch event details. Please try again.');
    }
};

const deleteEvent = async (id: number): Promise<{ success: boolean; message?: string }> => {
    try {
        const token = getToken();
        
        if (!token) {
            throw new Error('You must be logged in to delete events');
        }
        
        const response = await fetch(`${API_URL}/api/events/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        
        console.log('Delete response status:', response.status);
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Unauthorized. Please log in again.');
            }
            
            if (response.status === 403) {
                throw new Error('You are not authorized to delete this event.');
            }
            
            if (response.status === 404) {
                throw new Error('Event not found.');
            }
            
            // Try to get error message from response
            try {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete event');
            } catch (parseError) {
                throw new Error(`Failed to delete event: ${response.status}`);
            }
        }
        
        // Check if there's a response body
        const text = await response.text();
        if (text) {
            try {
                return JSON.parse(text);
            } catch {
                return { success: true, message: text };
            }
        }
        
        // Empty response means success
        return { success: true };
        
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};

export { getIncomingEvents, getAllEvents, getToken, signUp, createEvent, getEventById, updateEvent, deleteEvent, login };  




