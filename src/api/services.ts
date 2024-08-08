import { authAPI } from '@config/const';
import axios from 'axios';
import { endpoint } from './endpoint';
import { QueryFunction } from '@tanstack/react-query';

export const login = async (payload: Record<string, unknown>) => {
  return await axios.post(`${authAPI}/${endpoint.login}`, payload as any, {
    headers: {
      'Content-Type': 'application/json; charset=utf8',
    },
  });
};

export const loginById = async ({ id }: { id: string | undefined }) => {
  return await axios.get(`${authAPI}/${endpoint.login}/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf8',
    },
  });
};