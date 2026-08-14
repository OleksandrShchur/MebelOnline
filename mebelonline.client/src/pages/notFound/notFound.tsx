import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';

interface INotFoundProps {
  title?: string;
  description?: string;
}

const NotFound: React.FC<INotFoundProps> = ({
  title = 'Сторінку не знайдено',
  description = 'Перевірте адресу або поверніться до каталогу меблів.',
}) => {
  useDocumentTitle(title);

  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {description}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button component={RouterLink} to="/" variant="outlined">
          На головну
        </Button>
        <Button component={RouterLink} to="/catalog" variant="contained">
          До каталогу
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
