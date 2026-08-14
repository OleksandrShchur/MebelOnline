import type { ReactNode } from 'react';
import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';

interface IStatusStateProps {
  loading?: boolean;
  loadingLabel?: string;
  error?: string | null;
  onRetry?: () => void;
  empty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
}

const StatusState: React.FC<IStatusStateProps> = ({
  loading = false,
  loadingLabel = 'Завантаження...',
  error,
  onRetry,
  empty = false,
  emptyTitle = 'Нічого не знайдено',
  emptyDescription,
  emptyAction,
}) => {
  if (loading) {
    return (
      <Box
        role="status"
        aria-live="polite"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          py: 8,
          width: '100%',
        }}
      >
        <CircularProgress aria-label={loadingLabel} />
        <Typography color="text.secondary">{loadingLabel}</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        sx={{ my: 2, width: '100%' }}
        action={
          onRetry ? (
            <Button color="inherit" size="small" onClick={onRetry}>
              Спробувати ще раз
            </Button>
          ) : undefined
        }
      >
        {error}
      </Alert>
    );
  }

  if (empty) {
    return (
      <Box
        role="status"
        sx={{
          py: 6,
          px: 2,
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Typography variant="h6" gutterBottom>
          {emptyTitle}
        </Typography>
        {emptyDescription && (
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {emptyDescription}
          </Typography>
        )}
        {emptyAction}
      </Box>
    );
  }

  return null;
};

export default StatusState;
