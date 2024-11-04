import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { useNotifications } from '@/components/notifications/notification-provider';

interface ApiHookOptions<TData, TError> extends Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'> {
  successMessage?: string;
  errorMessage?: string;
}

interface ApiMutationOptions<TData, TVariables, TError> extends Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'> {
  successMessage?: string;
  errorMessage?: string;
}

export function useApi<TData, TError = Error>(
  key: string[],
  fn: () => Promise<TData>,
  options?: ApiHookOptions<TData, TError>
) {
  const { addNotification } = useNotifications();

  return useQuery<TData, TError>({
    queryKey: key,
    queryFn: fn,
    onSuccess: (data) => {
      if (options?.successMessage) {
        addNotification({
          type: 'success',
          title: 'Success',
          message: options.successMessage,
        });
      }
      options?.onSuccess?.(data);
    },
    onError: (error: any) => {
      addNotification({
        type: 'error',
        title: 'Error',
        message: options?.errorMessage || error.message,
      });
      options?.onError?.(error);
    },
    ...options,
  });
}

export function useApiMutation<TData, TVariables, TError = Error>(
  fn: (variables: TVariables) => Promise<TData>,
  options?: ApiMutationOptions<TData, TVariables, TError>
) {
  const { addNotification } = useNotifications();

  return useMutation<TData, TError, TVariables>({
    mutationFn: fn,
    onSuccess: (data) => {
      if (options?.successMessage) {
        addNotification({
          type: 'success',
          title: 'Success',
          message: options.successMessage,
        });
      }
      options?.onSuccess?.(data);
    },
    onError: (error: any) => {
      addNotification({
        type: 'error',
        title: 'Error',
        message: options?.errorMessage || error.message,
      });
      options?.onError?.(error);
    },
    ...options,
  });
}