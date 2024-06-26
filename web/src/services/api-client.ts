const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL!;
  }
  return process.env.API_URL!;
};

const apiUrl = getApiUrl();

const addApiUrlPrefix = (endpoint: string) => {
  return apiUrl + endpoint;
};

const RequestMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export interface RequestParams {
  headers?: Record<string, string>;
  endpoint: string;
}

export interface RequestWithBodyParams extends RequestParams {
  body?: object;
}

export interface RequestParamsWithMethod extends RequestWithBodyParams {
  method: keyof typeof RequestMethod;
}

export interface ApiResponse<T> {
  status: number;
  data: T;
  headers: Headers;
}

export class RequestError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

const request = async <T>({
  headers,
  method,
  endpoint,
  body,
}: RequestParamsWithMethod): Promise<ApiResponse<T>> => {
  const response = await fetch(addApiUrlPrefix(endpoint), {
    method,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', ...headers },
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new RequestError(response.status, errorText);
  }

  if (response.status === 204) {
    return {
      status: response.status,
      headers: response.headers,
      data: {} as T,
    };
  }

  const responseJson = await response.json();

  return {
    status: response.status,
    headers: response.headers,
    data: responseJson,
  };
};

export const get = <T>(params: RequestParams) => {
  return request<T>({ method: RequestMethod.GET, ...params });
};

export const post = <T>(params: RequestWithBodyParams) => {
  return request<T>({ method: RequestMethod.POST, ...params });
};

export const put = <T>(params: RequestWithBodyParams) => {
  return request<T>({ method: RequestMethod.PUT, ...params });
};

export const patch = <T>(params: RequestWithBodyParams) => {
  return request<T>({ method: RequestMethod.PATCH, ...params });
};

export const remove = async (params: RequestParams) => {
  return request<undefined>({ method: RequestMethod.DELETE, ...params });
};
