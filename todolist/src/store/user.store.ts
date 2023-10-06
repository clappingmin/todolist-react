import { QueryStatus } from "@tanstack/query-core";
import { atom, useAtom } from "jotai";
import { atomsWithQuery } from "jotai-tanstack-query";
import { useEffect, useState } from "react";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: Infinity,
//     },
//   },
// });

// ************************************************
// atomsWithQuery(GET) / atomsWithMutation(POST)
// 캐시 - 같은 key요청이 중복으로 와도 캐시로 바로 뱉어줌
// 캐시 타이밍 - 캐시만료시기 / 서버요청시기 - 포커스가 브라우저로갔을때, 컴포넌트가 mount됐을때
// 캐시=>저장소 =>> 서버요청+저장소
const [,] = atomsWithQuery<Record<string, any>[]>(
  (get) => ({
    queryKey: ["users"], // get(idAtom)],
    queryFn: async () => {
      // 일부러 성공하기!
      const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
      return res.json();
    },
    cacheTime: 120,
    refetchOnReconnect: true,
    retry: true,
    retryDelay: 2,
  }),
  (get) => queryClient
);

// ************************************************
// 유저리스트 아톰
const [, userListAtom] = atomsWithQuery<Record<string, any>[]>((get) => ({
  queryKey: ["users"], //get(idAtom)],
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
  }>({ status: "loading" });

  userListStatus.remove();

  useEffect(() => {
    let data: Record<string, any> | undefined;
    let error: any;
    if (userListStatus.status === "success") {
      data = userListStatus.data.find((i) => i.id === id);
    }
    if (userListStatus.status === "error") {
      error = (userListStatus.failureReason as Error)?.message ?? "unknown";
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
  queryKey: ["users", get(idAtom)],
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
  }>({ status: "loading" });

  useEffect(() => {
    let data: Record<string, any> | undefined;
    let error: any;
    if (userDetailStatus.status === "success") {
      data = userDetailStatus.data;
    }
    if (userDetailStatus.status === "error") {
      error = userDetailStatus.failureReason;
    }
    console.log(
      `from server : ${JSON.stringify({
        data: data,
        status: userDetailStatus.status,
        error: error,
      })}`
    );
    setInfo({ data: data, status: userDetailStatus.status, error: error });
  }, [userDetailStatus.status]);

  return info;
};

// const [, postAtom] = atomsWithMutation<
//   boolean,
//   boolean,
//   { title: string; body: number }
// >((get) => ({
//   mutationKey: ["posts"],
//   mutationFn: async ({ title, body }) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
//       method: "POST",
//       body: JSON.stringify({ title, body, userId: get(idAtom) }),
//       headers: { "Content-type": "application/json; charset=UTF-8" },
//     });
//     const data = await res.json();
//     return data;
//   },
// }));

// // export const useUserItemFromServer = () => {
// //   // ): { data?: Record<string, any>; status: QueryStatus } => {
// //   const [_, statusAtom] = atomsWithQuery<Record<string, any>>((get) => ({
// //     queryKey: ["users", get(idAtom)],
// //     queryFn: async ({ queryKey: [, id] }) => {
// //       const res = await fetch(
// //         `https://jsonplaceholder.typicode.com/users/${id}`
// //       );
// //       return res.json();
// //     },
// //   }));
// //   const [userDetailAtom] = useAtom(statusAtom);
// //   let item: Record<string, any> | undefined;
// //   let error: any;
// //   if (userDetailAtom.status === "success") {
// //     item = userDetailAtom.data;
// //   }
// //   if (userDetailAtom.status === "error") {
// //     error = userDetailAtom.failureReason;
// //   }
// //   return { data: item, status: userDetailAtom.status, error: error };
// // };
// // const [_, userDetailAtom] = atomsWithQuery<Record<string, any>[]>((get) => ({
// //   queryKey: ["users"], //get(idAtom)],
// //   queryFn: async () => {
// //     // // 일부러 시간끌기!
// //     // await new Promise((f) => setTimeout(f, 10000));

// //     // 일부러 실패하기1!
// //     throw new Error("haha");
// //     // 실패하면, BODY의 code값을 가져와서, 그거로 throw하자~

// //     // // 일부러 실패하기2!
// //     // const res = await fetch(`http://localhost:3000/dfd`);
// //     // return res.json();

// //     // // 일부러 성공하기!
// //     // const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
// //     // return res.json();
// //   },
// //   cacheTime: 0,
// //   refetchOnReconnect: true,
// //   retry: false,
// // }));

// // export const getAtomForUseUserItemFromServer = () => {
// //   // ): { data?: Record<string, any>; status: QueryStatus } => {
// //   const [_, statusAtom] = atomsWithQuery<Record<string, any>>((get) => ({
// //     queryKey: ["users", get(idAtom)],
// //     queryFn: async ({ queryKey: [, id] }) => {
// //       const res = await fetch(
// //         `https://jsonplaceholder.typicode.com/users/${id}`
// //       );
// //       return res.json();
// //     },
// //   }));
// //   return statusAtom;
// // };
// // };

// // export const [_, userListAtom] = atomsWithQuery<Record<string, any>[]>(
// //   (get) => ({
// //     queryKey: ["users", 0], //get(idAtom)],
// //     queryFn: async ({ queryKey: [, id] }) => {
// //       const res = await fetch(
// //         `https://jsonplaceholder.typicode.com/users/${id}`
// //       );
// //       return res.json();
// //     },
// //   })
// // );

// // const [userAtom] = atomsWithQuery<Record<string, any>[]>((get) => ({
// //   queryKey: ["users", 0], //get(idAtom)],
// //   queryFn: async ({ queryKey: [, id] }) => {
// //     const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
// //     return res.json();
// //   },
// // }));

// const listStore = createStore();

// // 전체 "리스트 atom"
// const listAtom = atom<{ id: string; name: string }[]>([
//   { id: "a", name: "a!" },
//   { id: "b", name: "b!" },
//   { id: "c", name: "c!" },
//   { id: "d", name: "d!" },
//   { id: "e", name: "e!" },
//   { id: "f", name: "f!" },
// ]);

// // "리스트 atom"에서 특정 Id만 가져오는 atom
// export const getItemAtom = (id: string) => {
//   console.log("?");
//   return atom((get) => get(listAtom).find((i) => i.id === id));
// };

// export const GetItem = () => {
//   const [list] = useAtom(listAtom);
//   return (id: string) => list.find((i) => i.id === id);
// };

// export const useListItem = (id: string) =>
//   useAtom(listAtom)[0].find((i) => i.id === id);

// // // 컴포넌트에서 가져오깈
// // const Component = () => {
// //   const [itemAtom] = useAtom(getItemAtom("haha"));
// // };

// // {
// //   const valueAtom = atom((get) => get(baseAtom).find((b) => b === id));
// //   ?const incAtom = atom(null, (get, set) => set(baseAtom, (c) => c + 1));
// //   return [valueAtom, incAtom];
// // };

// // const Component = () => {
// //   const [itemAtom] = useAtom(getItemAtom("haha"));
// //   // const [data, statusAtom] = useAtom(userAtom);
// //   // const a = statusAtom();
// // };

// /**
//  * 예시
//  * 
//  * 
// const priceAtom = atom(10)
// const messageAtom = atom('hello')
// const productAtom = atom({ id: 12, name: 'good stuff' })

// const readOnlyAtom = atom((get) => get(priceAtom) * 2)
// const writeOnlyAtom = atom(
//   null, // it's a convention to pass `null` for the first argument
//   (get, set, update) => {
//     // `update` is any single value we receive for updating this atom
//     set(priceAtom, get(priceAtom) - update.discount)
//   }
// )
// const readWriteAtom = atom(
//   (get) => get(priceAtom) * 2,
//   (get, set, newPrice) => {
//     set(priceAtom, newPrice / 2)
//     // you can set as many atoms as you want at the same time
//   }
// )
//  */
