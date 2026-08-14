import type { ProblemDetailsModel } from '../models/problemDetailsModel';

export class ApiError extends Error {
  status: number;
  problem?: ProblemDetailsModel;

  constructor(status: number, message: string, problem?: ProblemDetailsModel) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.problem = problem;
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }

  get isBadRequest(): boolean {
    return this.status === 400;
  }
}

const parseProblem = async (response: Response): Promise<ProblemDetailsModel | undefined> => {
  try {
    const data = await response.json();
    if (data && typeof data === 'object') {
      return data as ProblemDetailsModel;
    }
  } catch {
    return undefined;
  }
  return undefined;
};

export const fetchJson = async <T>(url: string): Promise<T> => {
  let response: Response;

  try {
    response = await fetch(url);
  } catch {
    throw new ApiError(0, 'Мережева помилка. Спробуйте ще раз.');
  }

  if (!response.ok) {
    const problem = await parseProblem(response);
    const message =
      problem?.detail ||
      problem?.title ||
      (response.status === 404 ? 'Не знайдено' : 'Не вдалося завантажити дані.');
    throw new ApiError(response.status, message, problem);
  }

  const text = await response.text();
  if (!text || text === 'null') {
    return null as T;
  }

  return JSON.parse(text) as T;
};
