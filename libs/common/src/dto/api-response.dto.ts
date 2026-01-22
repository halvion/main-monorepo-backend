export class ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: PaginationMeta;

  static success<T>(data: T, message?: string, meta?: PaginationMeta): ApiResponse<T> {
    const response = new ApiResponse<T>();
    response.success = true;
    response.data = data;
    response.message = message;
    response.meta = meta;
    return response;
  }

  static error<T>(message: string): ApiResponse<T> {
    const response = new ApiResponse<T>();
    response.success = false;
    response.message = message;
    return response;
  }
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function createPaginationMeta(
  page: number,
  limit: number,
  total: number,
): PaginationMeta {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}
