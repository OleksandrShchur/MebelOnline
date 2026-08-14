import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SORT_BY, type SortByValue } from '../../constants/pagination';

interface ISortSelectProps {
  value: SortByValue;
  onChange: (value: SortByValue) => void;
}

const SortSelect: React.FC<ISortSelectProps> = ({ value, onChange }) => {
  return (
    <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 220 } }}>
      <InputLabel id="sort-by-label">Сортування</InputLabel>
      <Select
        labelId="sort-by-label"
        id="sort-by"
        label="Сортування"
        value={value}
        onChange={(event) => onChange(event.target.value as SortByValue)}
      >
        <MenuItem value={SORT_BY.Ascending}>Ціна: зростання</MenuItem>
        <MenuItem value={SORT_BY.Descending}>Ціна: спадання</MenuItem>
        <MenuItem value={SORT_BY.Name}>Назва</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelect;
