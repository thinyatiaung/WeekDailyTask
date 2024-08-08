import { useAuth } from '@store/useAuth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authedRoute } from '@config/const';
import { login } from '../../api/services';
import { useNotificationStore } from '@store/useNotification';

export function useLogin() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { setNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (data: any) =>
    login(data),
      onSuccess: (data) => {
        const result = data.data?.Data;
        
        if (result?.access_token) {
          setAuth({
            staffID: result.Login_Id,
            username: result.Name,
            role: result.Role,
            access_token: result.access_token
          });
          setNotification({ variant: 'success', message: 'Login successful!'});
          navigate(authedRoute);
        }
      },
      onError: (error: any) => {
        setNotification({
          variant: 'danger',
          message: error?.data?.Error?.Details[0]?.ErrorDescription || "Login Failed! Please Try Again."
        });
      },
  });
}
