import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

export const UserPage = () => {
  const router = useRouter();
  const username = router.query.username;

  const {data, error} = useSWR(username ? `/user/${username}`: null);
  return <div>UserPage</div>;
};
