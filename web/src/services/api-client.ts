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
  method = RequestMethod.GET,
  headers = {},
  endpoint,
  body,
}: RequestParamsWithMethod): Promise<ApiResponse<T>> => {
  const response = await fetch(addApiUrlPrefix(endpoint), {
    method,
    body: JSON.stringify(body),
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new RequestError(response.status, errorText);
  }

  return {
    status: response.status,
    headers: response.headers,
    data: await response.json(),
  };
};

const get = <T>(params: RequestParams) => {
  return request<T>({ method: RequestMethod.GET, ...params });
};

const post = <T>(params: RequestWithBodyParams) => {
  return request<T>({ method: RequestMethod.POST, ...params });
};

const put = <T>(params: RequestWithBodyParams) => {
  return request<T>({ method: RequestMethod.PUT, ...params });
};

const patch = <T>(params: RequestWithBodyParams) => {
  return request<T>({ method: RequestMethod.PATCH, ...params });
};

// JavaScript doesn't let us name this function as "delete", so we declare it as
// "remove" and rename the object's method when exporting below.
const remove = <T>(params: RequestParams) => {
  return request<T>({ method: RequestMethod.DELETE, ...params });
};

export const apiClient = {
  get,
  post,
  put,
  patch,
  delete: remove,
};
