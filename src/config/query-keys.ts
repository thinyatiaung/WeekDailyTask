export const center = {
    all: ['center'] as const,
    lists: () => [...center.all, 'list'] as const,
    list: (filters: string | Record<string, unknown>) =>
      [...center.lists(), { filters }] as const,
    details: () => [...center.all, 'detail'] as const,
    detail: (id: string | undefined) => [...center.details(), id] as const,
  };
  