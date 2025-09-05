import React, { useState } from "react";
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
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { FilterRangeModel } from "../../models/filterRangeModel";

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

    const visibleBrands = showAllBrands
        ? brandItems
        : brandItems.slice(0, 5);

    const visibleMaterials = showAllMaterials
        ? materialItems
        : materialItems.slice(0, 5);

    return (
        <Box
            sx={{
                width: '20%',
                padding: 2,
                marginTop: 2,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.15)",
                borderRadius: 2,
                transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
            }}
        >
            {/* Price Filter */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Ціна:
                </Typography>
                <Slider
                    value={priceRange.value}
                    onChange={onRangeChange}
                    min={priceRange.min}
                    max={priceRange.max}
                    valueLabelDisplay="auto"
                />
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                    <TextField
                        id="price-min-input"
                        label="Від"
                        variant="outlined"
                        value={priceMinInput}
                        onChange={onPriceMinInputChange}
                        onKeyDown={(e) => e.key === "Enter" && onPriceMinSubmit()}
                        onBlur={onPriceMinSubmit}
                        inputProps={{ min: priceRange.min }}
                        type="number"
                        sx={{
                            "& .MuiInputBase-root": {
                                height: "40px",
                            },
                            "& .MuiInputBase-input": {
                                padding: "8px 14px",
                            },
                        }}
                    />
                    <TextField
                        id="price-max-input"
                        label="До"
                        variant="outlined"
                        value={priceMaxInput}
                        onChange={onPriceMaxInputChange}
                        onKeyDown={(e) => e.key === "Enter" && onPriceMaxSubmit()}
                        onBlur={onPriceMaxSubmit}
                        inputProps={{ max: priceRange.max }}
                        type="number"
                        sx={{
                            "& .MuiInputBase-root": {
                                height: "40px",
                            },
                            "& .MuiInputBase-input": {
                                padding: "8px 14px",
                            },
                        }}
                    />
                </Box>
            </Box>

            {/* Brand Filter */}
            <Accordion defaultExpanded sx={{ mb: 3 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">
                        Виробник:
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            maxHeight: "350px",
                            overflowY: "auto",
                            mb: 1,
                        }}
                    >
                        {visibleBrands.map((item) => (
                            <FormControlLabel
                                key={item}
                                control={
                                    <Checkbox
                                        checked={selectedBrands.includes(item)}
                                        onChange={() => onBrandToggle(item)}
                                    />
                                }
                                label={item}
                            />
                        ))}
                    </Box>
                    {showAllBrands && (
                        <Button
                            variant="outlined"
                            onClick={() => setShowAllBrands(false)}
                        >
                            Сховати
                        </Button>
                    )}
                    {!showAllBrands && brandItems.length > 5 && (
                        <Button
                            variant="outlined"
                            onClick={() => setShowAllBrands(true)}
                        >
                            Показати всі
                        </Button>
                    )}
                </AccordionDetails>
            </Accordion>

            {/* Material Filter */}
            <Accordion defaultExpanded sx={{ mb: 3 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">
                        Матеріал:
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            maxHeight: "350px",
                            overflowY: "auto",
                            mb: 1,
                        }}
                    >
                        {visibleMaterials.map((item) => (
                            <FormControlLabel
                                key={item}
                                control={
                                    <Checkbox
                                        checked={selectedMaterials.includes(item)}
                                        onChange={() => onMaterialToggle(item)}
                                    />
                                }
                                label={item}
                            />
                        ))}
                    </Box>
                    {showAllMaterials && (
                        <Button
                            variant="outlined"
                            onClick={() => setShowAllMaterials(false)}
                        >
                            Сховати
                        </Button>
                    )}
                    {!showAllMaterials && materialItems.length > 5 && (
                        <Button
                            variant="outlined"
                            onClick={() => setShowAllMaterials(true)}
                        >
                            Показати всі
                        </Button>
                    )}
                </AccordionDetails>
            </Accordion>

            <Button
                variant="contained"
                color="primary"
                onClick={onApply}
                sx={{ mt: 2 }}
            >
                Застосувати
            </Button>
        </Box>
    );
};

export default SearchSidebar;
