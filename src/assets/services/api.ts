const API_URL: string = (import.meta.env.VITE_API_URL) || "http://localhost:3001";

console.log('API_URL:', API_URL); 
console.log('ENV:', import.meta.env.VITE_API_URL);

function getToken() {
  return localStorage.getItem("token");
}

const getIncomingEvents = async () => {
    try {
        const response = await fetch(`${API_URL}/api/events/incoming`); 
        if (!response.ok) {
            throw new Error(`Error found: ${response.status})`);
        }
        const data = await response.json();
        console.log('Is array?', Array.isArray(data));
        console.log('Data length:', data?.length);
        
        return Array.isArray(data) ? data : [];
    } catch (err) {
        console.error('Error:', err);
        throw new Error('Failed to load events. Please try again.');

    }
};

const getAllEvents = async () => {
    try {
        const response = await fetch(`${API_URL}/api/events`); 
        if (!response.ok) {
            throw new Error(`Error found: ${response.status})`);
        }
        const data = await response.json();
        return data.results;
    } catch (err) {
        console.error('Error:', err);
        throw new Error('Failed to load events. Please try again.');

    }
};

const signUp = async (userData) => {
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

const login = async (credentials) => {
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

const createEvent = async (eventData) => {
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

const updateEvent = async (id, eventData) => {
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

const getEventById = async (id) => {
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

const deleteEvent = async (id) => {
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
