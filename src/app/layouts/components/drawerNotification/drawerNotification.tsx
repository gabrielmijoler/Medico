import { UserCompanyNotification } from "@/app/repository/notifications/types";
import { formatDocument } from "@/app/utils/formatters";
import { Status, statusStyles } from "@/app/utils/statusNotification";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";

import useGetNotifications from "./hooks/useGetNotifications";

type DrawerNotificationProps = {
  open: boolean;
  onClose: () => void;
};

export default function DrawerNotification({
  open,
  onClose,
}: DrawerNotificationProps) {
  const {
    data: notifications,
    isFetching,
    isLoading,
  } = useGetNotifications({ enabled: open });

  return (
    <Drawer anchor="right" onClose={onClose} open={open}>
      <Box role="presentation" sx={{ width: 350, padding: 2 }}>
        <Box alignItems="center" display="flex" justifyContent="space-between">
          <Typography variant="h6">Alertas</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mt: 2 }} />

        <Box display="flex text-bold" flexDirection="column" gap={2} mt={2}>
          {isLoading || isFetching
            ? Array.from({ length: 3 }).map((_, i) => (
                <Paper elevation={0} key={i} sx={{ borderRadius: 2, p: 2 }}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Skeleton data-testid="skeleton" height={20} width="40%" />
                    <Skeleton data-testid="skeleton" height={20} width="30%" />
                  </Box>
                  <Skeleton data-testid="skeleton" height={20} width="80%" />
                  <Skeleton
                    data-testid="skeleton"
                    height={20}
                    sx={{ mt: 1 }}
                    width="60%"
                  />
                  <Skeleton
                    data-testid="skeleton"
                    height={32}
                    sx={{ mt: 1 }}
                    width="40%"
                  />
                </Paper>
              ))
            : notifications?.map(
                (n: UserCompanyNotification, index: number) => {
                  const dateObj = new Date(n.createdAt);
                  const dateStr = dateObj.toLocaleDateString();
                  const timeStr = dateObj.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <Paper
                      elevation={0}
                      key={index}
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: 2,
                        p: 2,
                        mt: 2,
                      }}
                    >
                      <Box
                        color="text.secondary"
                        display="flex"
                        fontSize={14}
                        justifyContent="space-between"
                      >
                        <Typography variant="body2">{dateStr}</Typography>
                        <Typography variant="body2">{timeStr}</Typography>
                      </Box>

                      <Box mt={1}>
                        <Typography variant="body2">
                          <strong>CNPJ:</strong>{" "}
                          {formatDocument(n.company?.cnpj)}
                        </Typography>
                        <Typography mt={1} variant="body2">
                          <strong>Nome:</strong> {n.company?.name}
                        </Typography>
                        <Chip
                          label={n.status}
                          size="small"
                          sx={{
                            fontWeight: "bold",
                            color: statusStyles[n.status as Status]?.color,
                            backgroundColor:
                              statusStyles[n.status as Status]?.backgroundColor,
                          }}
                        />
                      </Box>
                    </Paper>
                  );
                },
              )}
        </Box>
      </Box>
    </Drawer>
  );
}
