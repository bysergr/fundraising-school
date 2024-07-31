import { useState, useEffect, useCallback } from 'react';
import { ONDE_VAMOS_API_BASE_URL, TechWeekEvent } from './common';

// API response types
interface ApiResponse<T> {
  data: T;
  message: string;
}

interface CalendarEvent {
  id: string;
  eventId: string;
  createdAt: string;
  eventData: TechWeekEvent;
}

interface PaginatedCalendarEvents {
  events: CalendarEvent[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

// API error type
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface ListCalendarEventsParams {
  email: string;
  page?: number;
  limit?: number;
}

export interface ToggleCalendarEventReturn {
  mutate: (eventId: string, isAdding: boolean) => Promise<void>;
  isLoading: boolean;
  error: ApiError | null;
}

export interface ListCalendarEventsReturn {
  data: ApiResponse<PaginatedCalendarEvents> | null;
  isLoading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
  toggleCalendarEvent: ToggleCalendarEventReturn;
}

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const response = await fetch(`${ONDE_VAMOS_API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
  }

  return response.json();
}

const toggleCalendarEvent = async ({
  email,
  eventId,
  isAdding,
}: ToggleCalendarParams): Promise<ApiResponse<void>> => {
  const endpoint = isAdding ? '/calendar/add' : '/calendar/remove';
  return fetchApi<void>(endpoint, {
    method: 'POST',
    body: JSON.stringify({ email, eventId }),
  });
};

const listCalendarEvents = async ({
  email,
  page = 1,
  limit = 20,
}: ListCalendarEventsParams): Promise<ApiResponse<PaginatedCalendarEvents>> => {
  return fetchApi<PaginatedCalendarEvents>(
    `/calendar/list?email=${encodeURIComponent(email)}&page=${page}&limit=${limit}`,
  );
};

// Custom hooks
export const useToggleCalendarEvent = (
  email: string,
  onToggle: (eventId: string, isAdded: boolean) => void,
): ToggleCalendarEventReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const mutate = useCallback(
    async (eventId: string, isAdding: boolean) => {
      setIsLoading(true);
      setError(null);
      try {
        await toggleCalendarEvent({ email, eventId, isAdding });
        onToggle(eventId, isAdding);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof ApiError ? err : new ApiError('Unknown error', 500));
        setIsLoading(false);
        throw err;
      }
    },
    [email, onToggle],
  );

  return { mutate, isLoading, error };
};

export const useListCalendarEvents = (
  email: string,
  page = 1,
  limit = 250,
): ListCalendarEventsReturn => {
  const [data, setData] = useState<ApiResponse<PaginatedCalendarEvents> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await listCalendarEvents({ email, page, limit });
      const updatedEvents = response.data.events.map((event) => ({
        ...event,
        isAddedToCalendar: true,
      }));
      setData({
        ...response,
        data: {
          ...response.data,
          events: updatedEvents,
        },
      });
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof ApiError ? err : new ApiError('Unknown error', 500));
      setIsLoading(false);
    }
  }, [email, page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateEventStatus = useCallback((eventId: string, isAdded: boolean) => {
    setData((prevData) => {
      if (!prevData) return prevData;
      const updatedEvents = prevData.data.events.map((event) =>
        event.eventId === eventId ? { ...event, isAddedToCalendar: isAdded } : event,
      );
      return {
        ...prevData,
        data: {
          ...prevData.data,
          events: updatedEvents,
        },
      };
    });
  }, []);

  const toggleCalendarEvent = useToggleCalendarEvent(email, updateEventStatus);

  return { data, isLoading, error, refetch: fetchData, toggleCalendarEvent };
};

// Utility function to prefetch calendar events (for server-side rendering)
export const prefetchCalendarEvents = async (
  email: string,
  page = 1,
  limit = 20,
): Promise<ApiResponse<PaginatedCalendarEvents>> => {
  const response = await listCalendarEvents({ email, page, limit });
  const updatedEvents = response.data.events.map((event) => ({
    ...event,
    isAddedToCalendar: true,
  }));
  return {
    ...response,
    data: {
      ...response.data,
      events: updatedEvents,
    },
  };
};
