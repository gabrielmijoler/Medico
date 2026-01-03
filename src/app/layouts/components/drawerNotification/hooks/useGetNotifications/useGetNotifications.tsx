"use client";

import notificationsRepository from "@/app/repository/notifications";
import { useQuery } from "@tanstack/react-query";

type TProps = {
  enabled?: boolean;
};

export default function useGetNotifications({ enabled = true }: TProps = {}) {
  return useQuery({
    queryKey: ["notification"],
    queryFn: () => notificationsRepository.getNotifications(),
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
    enabled,
  });
}
