import { useEffect } from 'react';
import { useAuth } from '@store/useAuth';
import { authedRoute } from '@config/const';
import { useNavigate } from 'react-router-dom';

export function useAuthedRoute() {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);
}

export function useAuthRoute() {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      navigate(authedRoute);
    }
  }, [accessToken, navigate]);
}
