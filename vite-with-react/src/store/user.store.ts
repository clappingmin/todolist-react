import { QueryStatus } from '@tanstack/query-core';
import { atom, useAtom } from 'jotai';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { useEffect, useState } from 'react';

// ************************************************
// atomsWithQuery(GET) / atomsWithMutation(POST)
// 캐시 - 같은 key요청이 중복으로 와도 캐시로 바로 뱉어줌
// 캐시 타이밍 - 캐시만료시기 / 서버요청시기 - 포커스가 브라우저로갔을때, 컴포넌트가 mount됐을때
// 캐시=>저장소 =>> 서버요청+저장소
const [,] = atomsWithQuery<Record<string, any>[]>((get) => ({
  queryKey: ['users'], // get(idAtom)],
  queryFn: async () => {
    // 일부러 성공하기!
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
    return res.json();
  },
  cacheTime: 120,
  refetchOnReconnect: true,
  retry: true,
  retryDelay: 2,
}));

// ************************************************
// 유저리스트 아톰
const [, userListAtom] = atomsWithQuery<Record<string, any>[]>((get) => ({
  queryKey: ['users'], //get(idAtom)],
  queryFn: async () => {
    // // 일부러 시간끌기!
    // await new Promise((f) => setTimeout(f, 10000));

    // 일부러 실패하기1!
    // 실패하면, BODY의 code값을 가져와서, 그거로 throw하자~
    // throw new Error("haha");

    // // 일부러 실패하기2!
    // const res = await fetch(`http://localhost:3000/dfd`);
    // return res.json();

    // 일부러 성공하기!
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
    return res.json();
  },
  cacheTime: 0,
  refetchOnReconnect: true,
  retry: false,
}));

// 유저리스트객체에서 유저 직접 가져오기
export const useUserItemFromList = (
  id: number
): { data?: Record<string, any>; status: QueryStatus; error?: any } => {
  const [userListStatus] = useAtom(userListAtom);
  const [info, setInfo] = useState<{
    data?: Record<string, any>;
    status: QueryStatus;
    error?: any;
  }>({ status: 'loading' });

  useEffect(() => {
    let data: Record<string, any> | undefined;
    let error: any;
    if (userListStatus.status === 'success') {
      data = userListStatus.data.find((i) => i.id === id);
    }
    if (userListStatus.status === 'error') {
      error = (userListStatus.failureReason as Error)?.message ?? 'unknown';
    }
    console.log(
      `from list : ${JSON.stringify({
        data: data,
        status: userListStatus.status,
        error: error,
      })}`
    );
    setInfo({ data: data, status: userListStatus.status, error: error });
  }, [id, userListStatus.status]);

  return info;
};

// 직접 가져오기
// id 쿼리용 아톰
const idAtom = atom<number>(5);
// 유저 디테일 정보 저장 관리 아톰
const [, userDetailAtom] = atomsWithQuery<Record<string, any>[]>((get) => ({
  queryKey: ['users', get(idAtom)],
  queryFn: async () => {
    // 일부러 성공하기!
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${get(idAtom)}`
    );
    return res.json();
  },
  cacheTime: 0,
  refetchOnReconnect: true,
  retry: false,
}));

export const useUserItemFromServer = (): {
  data?: Record<string, any>;
  status: QueryStatus;
  error?: any;
} => {
  const [userDetailStatus] = useAtom(userDetailAtom);
  const [info, setInfo] = useState<{
    data?: Record<string, any>;
    status: QueryStatus;
    error?: any;
  }>({ status: 'loading' });

  useEffect(() => {
    let data: Record<string, any> | undefined;
    let error: any;
    if (userDetailStatus.status === 'success') {
      data = userDetailStatus.data;
    }
    if (userDetailStatus.status === 'error') {
      error = userDetailStatus.failureReason;
    }
    console.log(
      `야호 from server : ${JSON.stringify({
        data: data,
        status: userDetailStatus.status,
        error: error,
      })}`
    );
    setInfo({ data: data, status: userDetailStatus.status, error: error });
  }, [userDetailStatus.status]);

  return info;
};
