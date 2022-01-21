import { useCallback } from 'react';
import { useInfiniteQuery } from 'react-query';
import api from '@/configs/api';
import { buildURL } from '@/utils';
import { DEFAULT_PAGE_SIZE } from '@/configs/constants';

interface fetcherProps
{
  url: string;
  params?: any;
}

export const fetcher = async ({ url, params }: fetcherProps) =>
{
  const { page, pageSize = DEFAULT_PAGE_SIZE, ...rest } = params || {};
  const URL = buildURL(url, {
    page: page || 1,
    pageSize,
    ...rest,
  });
  const response = await api.get(URL);
  return response.data;
};

export const useInfinite = (
  queryURL: string,
  paramKey: any,
  defaultParams: any = {},
  options = {},
) =>
{
  const _queryKey = Array.isArray(paramKey)
    ? paramKey
    : [paramKey, { ...defaultParams }];
  const result = useInfiniteQuery(
    _queryKey,
    ({ pageParam = 1 }) =>
    {
      return fetcher({
        url: queryURL,
        params: { page: pageParam, ...defaultParams },
      });
    },
    {
      select: (data: any) =>
      {
        return data;
      },

      getNextPageParam: (lastPage: { hasNextPage: any; page: number; totalPages: number; }) =>
                lastPage?.hasNextPage || lastPage?.page < lastPage?.totalPages - 1
                  ? lastPage?.page + 1
                  : false,
      staleTime: 5000,
      ...options,
    },
  );

  const { hasNextPage, fetchNextPage } = result;

  const loadMore = useCallback(() =>
  {
    if (hasNextPage)
    {
            fetchNextPage?.();
    }
  }, [hasNextPage]);

  return {
    ...result,
    loadMore,
  };
};
