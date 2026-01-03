"use client";

import notificationsRepository from "@/app/repository/notifications";
import { useQuery } from "@tanstack/react-query";

type TProps = {
  enabled?: boolean;
};

export default function useGetNotificationsCount({
  enabled = true,
}: TProps = {}) {
  return useQuery({
    queryKey: ["notificationCount"],
    queryFn: () => notificationsRepository.getNotificationsCount(),
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
    enabled,
    refetchInterval: 300000,
    refetchIntervalInBackground: true,
  });
}
