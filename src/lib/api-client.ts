import { 
  NormalizedPerson, 
  NormalizedPlanet, 
  NormalizedStarship, 
  NormalizedVehicle,
  ApiListResponse,
  StatsResponse,
  ChatRequest,
  ChatResponse,
  ListQueryParams 
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

class ApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      500
    );
  }
}

export const peopleApi = {
  getAll: (params?: ListQueryParams): Promise<ApiListResponse<NormalizedPerson>> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page);
    if (params?.search) searchParams.set('search', params.search);
    
    const query = searchParams.toString();
    return fetchApi(`/people${query ? `?${query}` : ''}`);
  },

  getById: (id: string): Promise<NormalizedPerson> => {
    return fetchApi(`/people/${id}`);
  },
};

export const planetsApi = {
  getAll: (params?: ListQueryParams): Promise<ApiListResponse<NormalizedPlanet>> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page);
    if (params?.search) searchParams.set('search', params.search);
    
    const query = searchParams.toString();
    return fetchApi(`/planets${query ? `?${query}` : ''}`);
  },

  getById: (id: string): Promise<NormalizedPlanet> => {
    return fetchApi(`/planets/${id}`);
  },
};

export const starshipsApi = {
  getAll: (params?: ListQueryParams): Promise<ApiListResponse<NormalizedStarship>> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page);
    if (params?.search) searchParams.set('search', params.search);
    
    const query = searchParams.toString();
    return fetchApi(`/starships${query ? `?${query}` : ''}`);
  },

  getById: (id: string): Promise<NormalizedStarship> => {
    return fetchApi(`/starships/${id}`);
  },
};

export const vehiclesApi = {
  getAll: (params?: ListQueryParams): Promise<ApiListResponse<NormalizedVehicle>> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page);
    if (params?.search) searchParams.set('search', params.search);
    
    const query = searchParams.toString();
    return fetchApi(`/vehicles${query ? `?${query}` : ''}`);
  },

  getById: (id: string): Promise<NormalizedVehicle> => {
    return fetchApi(`/vehicles/${id}`);
  },
};

export const statsApi = {
  getStats: (): Promise<StatsResponse> => {
    return fetchApi('/stats');
  },
};

export const chatApi = {
  sendMessage: (request: ChatRequest): Promise<ChatResponse> => {
    return fetchApi('/chat', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },
};

export { ApiError };