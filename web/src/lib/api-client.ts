const getApiUrl = () => {
  return typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_API_URL!
    : process.env.API_URL!;
};

const apiUrl = getApiUrl();

const addApiUrlPrefix = (endpoint: string) => {
  return apiUrl + endpoint;
};

export const RequestMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export interface RequestParams {
  headers: Record<string, string>;
  endpoint: string;
  body: object;
}

interface RequestParamsWithMethod extends RequestParams {
  method: keyof typeof RequestMethod;
}

export class RequestError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

const request = async ({
  method,
  headers,
  endpoint,
  body,
}: RequestParamsWithMethod) => {
  const response = await fetch(addApiUrlPrefix(endpoint), {
    method,
    body: JSON.stringify(body),
    headers,
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

const get = (params: RequestParams) => {
  return request({ method: RequestMethod.GET, ...params });
};

const post = (params: RequestParams) => {
  return request({ method: RequestMethod.POST, ...params });
};

const put = (params: RequestParams) => {
  return request({ method: RequestMethod.PUT, ...params });
};

const patch = (params: RequestParams) => {
  return request({ method: RequestMethod.PATCH, ...params });
};

// JavaScript doesn't let us name this method "delete", so we declare it as "remove"
// and rename the object's method when exporting below.
const remove = (params: RequestParams) => {
  return request({ method: RequestMethod.DELETE, ...params });
};

export const apiClient = {
  get,
  post,
  put,
  patch,
  delete: remove,
};
