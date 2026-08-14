import { Box, Stack, Typography } from '@mui/material';
import type { ProductOptionModel } from '../../models/productOptionModel';

interface IProductOptionsProps {
  title: string;
  selected: string;
  options: ProductOptionModel[];
  handleChange: (option: string) => void;
}

const ProductOptions: React.FC<IProductOptionsProps> = (props: IProductOptionsProps) => {
  const { title, options, selected, handleChange } = props;

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Typography variant="body2" color="text.secondary" mb={1}>
          {title}
        </Typography>
        <Typography variant="body2" mb={1}>
          {`: ${selected}`}
        </Typography>
      </Box>
      <Stack spacing={1} direction="row" flexWrap="wrap" useFlexGap>
        {options?.map((item) => {
          const isSelected = item.colorName === selected;
          return (
            <Box
              key={`${item.colorName}-${item.imageUrl}`}
              component="button"
              type="button"
              aria-pressed={isSelected}
              aria-label={`${title}: ${item.colorName}`}
              onClick={() => handleChange(item.colorName)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleChange(item.colorName);
                }
              }}
              sx={{
                position: 'relative',
                display: 'flex',
                border: isSelected ? '2px solid #1976d2' : '1px solid transparent',
                borderRadius: '12%',
                padding: '2px',
                boxShadow: isSelected ? '0 0 4px rgba(25, 118, 210, 0.6)' : 'none',
                transition: 'border 0.4s, box-shadow 0.4s',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'transparent',
                cursor: 'pointer',
                minWidth: 52,
                minHeight: 52,
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.colorName}
                loading="lazy"
                style={{ width: '48px', height: '48px', borderRadius: '10%' }}
              />
            </Box>
          );
        })}
      </Stack>
    </>
  );
};

export default ProductOptions;
