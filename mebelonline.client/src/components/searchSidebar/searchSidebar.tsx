import React, { useState } from 'react';
import {
  Box,
  Slider,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { FilterRangeModel } from '../../models/filterRangeModel';

interface ISearchSidebarProps {
  priceRange: FilterRangeModel;
  onRangeChange: (event: Event, newValue: number | number[]) => void;
  priceMinInput: string;
  onPriceMinInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPriceMinSubmit: () => void;
  priceMaxInput: string;
  onPriceMaxInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPriceMaxSubmit: () => void;
  brandItems: string[];
  selectedBrands: string[];
  onBrandToggle: (item: string) => void;
  materialItems: string[];
  selectedMaterials: string[];
  onMaterialToggle: (item: string) => void;
  onApply: () => void;
}

const SearchSidebar: React.FC<ISearchSidebarProps> = ({
  priceRange,
  onRangeChange,
  priceMinInput,
  onPriceMinInputChange,
  onPriceMinSubmit,
  priceMaxInput,
  onPriceMaxInputChange,
  onPriceMaxSubmit,
  brandItems,
  selectedBrands,
  onBrandToggle,
  materialItems,
  selectedMaterials,
  onMaterialToggle,
  onApply,
}) => {
  const [showAllBrands, setShowAllBrands] = useState<boolean>(false);
  const [showAllMaterials, setShowAllMaterials] = useState<boolean>(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [filtersOpen, setFiltersOpen] = useState(isDesktop);

  const visibleBrands = showAllBrands ? brandItems : brandItems.slice(0, 5);
  const visibleMaterials = showAllMaterials ? materialItems : materialItems.slice(0, 5);

  const filters = (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Ціна:
        </Typography>
        <Slider
          value={priceRange.value}
          onChange={onRangeChange}
          min={priceRange.min}
          max={priceRange.max || 0}
          valueLabelDisplay="auto"
          disabled={priceRange.min === priceRange.max}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, gap: 1 }}>
          <TextField
            id="price-min-input"
            label="Від"
            variant="outlined"
            value={priceMinInput}
            onChange={onPriceMinInputChange}
            onKeyDown={(event) => event.key === 'Enter' && onPriceMinSubmit()}
            onBlur={onPriceMinSubmit}
            slotProps={{ htmlInput: { min: priceRange.min } }}
            type="number"
            sx={{
              '& .MuiInputBase-root': { height: '44px' },
              '& .MuiInputBase-input': { padding: '8px 14px' },
            }}
          />
          <TextField
            id="price-max-input"
            label="До"
            variant="outlined"
            value={priceMaxInput}
            onChange={onPriceMaxInputChange}
            onKeyDown={(event) => event.key === 'Enter' && onPriceMaxSubmit()}
            onBlur={onPriceMaxSubmit}
            slotProps={{ htmlInput: { max: priceRange.max } }}
            type="number"
            sx={{
              '& .MuiInputBase-root': { height: '44px' },
              '& .MuiInputBase-input': { padding: '8px 14px' },
            }}
          />
        </Box>
      </Box>

      {visibleBrands?.length > 0 && (
        <Accordion defaultExpanded sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Виробник:</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '350px',
                overflowY: 'auto',
                mb: 1,
              }}
            >
              {visibleBrands.map((item) => (
                <FormControlLabel
                  key={item}
                  control={<Checkbox checked={selectedBrands.includes(item)} onChange={() => onBrandToggle(item)} />}
                  label={item}
                  sx={{ '& .MuiFormControlLabel-label': { wordBreak: 'break-word' } }}
                />
              ))}
            </Box>
            {showAllBrands && (
              <Button variant="outlined" onClick={() => setShowAllBrands(false)}>
                Сховати
              </Button>
            )}
            {!showAllBrands && brandItems.length > 5 && (
              <Button variant="outlined" onClick={() => setShowAllBrands(true)}>
                Показати всі
              </Button>
            )}
          </AccordionDetails>
        </Accordion>
      )}

      {visibleMaterials?.length > 0 && (
        <Accordion defaultExpanded sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Матеріал:</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '350px',
                overflowY: 'auto',
                mb: 1,
              }}
            >
              {visibleMaterials.map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox checked={selectedMaterials.includes(item)} onChange={() => onMaterialToggle(item)} />
                  }
                  label={item}
                  sx={{ '& .MuiFormControlLabel-label': { wordBreak: 'break-word' } }}
                />
              ))}
            </Box>
            {showAllMaterials && (
              <Button variant="outlined" onClick={() => setShowAllMaterials(false)}>
                Сховати
              </Button>
            )}
            {!showAllMaterials && materialItems.length > 5 && (
              <Button variant="outlined" onClick={() => setShowAllMaterials(true)}>
                Показати всі
              </Button>
            )}
          </AccordionDetails>
        </Accordion>
      )}

      <Button variant="contained" color="primary" onClick={onApply} sx={{ mt: 1, width: '100%' }}>
        Застосувати
      </Button>
    </>
  );

  return (
    <Box
      component="aside"
      aria-label="Фільтри"
      sx={{
        width: { xs: '100%', md: 280 },
        flexShrink: 0,
        p: 2,
        boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.15)',
        borderRadius: 2,
        minWidth: 0,
      }}
    >
      {!isDesktop ? (
        <Accordion expanded={filtersOpen} onChange={() => setFiltersOpen((open) => !open)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight={600}>
              Фільтри
            </Typography>
          </AccordionSummary>
          <AccordionDetails>{filters}</AccordionDetails>
        </Accordion>
      ) : (
        filters
      )}
    </Box>
  );
};

export default SearchSidebar;
