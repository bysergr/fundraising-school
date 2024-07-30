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

// API function parameter types
interface AddToCalendarParams {
  email: string;
  eventId: string;
}

interface RemoveFromCalendarParams {
  email: string;
  eventId: string;
}

interface ListCalendarEventsParams {
  email: string;
  page?: number;
  limit?: number;
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

const addToCalendar = async ({
  email,
  eventId,
}: AddToCalendarParams): Promise<ApiResponse<void>> => {
  return fetchApi<void>('/calendar/add', {
    method: 'POST',
    body: JSON.stringify({ email, eventId }),
  });
};

const removeFromCalendar = async ({
  email,
  eventId,
}: RemoveFromCalendarParams): Promise<ApiResponse<void>> => {
  return fetchApi<void>('/calendar/remove', {
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
export const useAddToCalendar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const mutate = useCallback(async (params: AddToCalendarParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await addToCalendar(params);
      setIsLoading(false);
      return response;
    } catch (err) {
      setError(err instanceof ApiError ? err : new ApiError('Unknown error', 500));
      setIsLoading(false);
      throw err;
    }
  }, []);

  return { mutate, isLoading, error };
};

export const useRemoveFromCalendar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const mutate = useCallback(async (params: RemoveFromCalendarParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await removeFromCalendar(params);
      setIsLoading(false);
      return response;
    } catch (err) {
      setError(err instanceof ApiError ? err : new ApiError('Unknown error', 500));
      setIsLoading(false);
      throw err;
    }
  }, []);

  return { mutate, isLoading, error };
};

export const useListCalendarEvents = (email: string, page = 1, limit = 150) => {
  const [data, setData] = useState<ApiResponse<PaginatedCalendarEvents> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await listCalendarEvents({ email, page, limit });
      setData(response);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof ApiError ? err : new ApiError('Unknown error', 500));
      setIsLoading(false);
    }
  }, [email, page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};

// Utility function to prefetch calendar events (for server-side rendering)
export const prefetchCalendarEvents = async (
  email: string,
  page = 1,
  limit = 20,
): Promise<ApiResponse<PaginatedCalendarEvents>> => {
  return listCalendarEvents({ email, page, limit });
};
