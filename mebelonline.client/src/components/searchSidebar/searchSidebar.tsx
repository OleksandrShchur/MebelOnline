import React, { useEffect, useState } from "react";
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
import { useSearchParams } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import searchService from "../../services/searchService";

interface FilterRange {
    min: number;
    max: number;
    value: [number, number];
}

const SearchSidebar: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sidebarLoaded, setSidebarLoaded] = useState<boolean>(false);
    const [priceRange, setPriceRange] = useState<FilterRange>({
        min: 0,
        max: 0,
        value: [0, 0],
    });

    const [brandItems, setBrandItems] = useState<string[]>([]);
    const [showAllBrands, setShowAllBrands] = useState<boolean>(false);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    const [materialItems, setMaterialItems] = useState<string[]>([]);
    const [showAllMaterials, setShowAllMaterials] = useState<boolean>(false);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

    // Temporary states for TextField inputs
    const [priceMinInput, setPriceMinInput] = useState<string>(priceRange.value[0].toString());
    const [priceMaxInput, setPriceMaxInput] = useState<string>(priceRange.value[1].toString());

    useEffect(() => {
        loadFromSearchParams();
    }, []);

    const loadFromSearchParams = async () => {
        const urlMin = searchParams.get('MinPrice');
        const urlMax = searchParams.get('MaxPrice');
        const brands = searchParams.getAll('SelectedBrands');
        const materials = searchParams.getAll('SelectedMaterials');

        const params = new URLSearchParams();
        brands.forEach(brand => params.append('SelectedBrands', brand));
        materials.forEach(material => params.append('SelectedMaterials', material));

        let initMin = 0;
        let initMax = 0;
        let hasPrice = false;

        if (urlMin && urlMax) {
            const minNum = Number(urlMin);
            const maxNum = Number(urlMax);
            if (!isNaN(minNum) && !isNaN(maxNum)) {
                initMin = minNum;
                initMax = maxNum;
                params.append('MinPrice', initMin.toString());
                params.append('MaxPrice', initMax.toString());
                hasPrice = true;
            }
        } else {
            params.append('MinPrice', '0');
            params.append('MaxPrice', '0');
        }

        const data = await searchService.fetchSidebar(params);
        if (data) {
            const newMin = data.minPrice;
            const newMax = data.maxPrice;
            let newValue: [number, number] = hasPrice ? [initMin, initMax] : [newMin, newMax];

            // Clip the values
            if (newValue[0] < newMin) newValue[0] = newMin;
            if (newValue[1] > newMax) newValue[1] = newMax;

            // Ensure min <= max
            if (newValue[0] > newValue[1]) {
                newValue = [newMin, newMax];
            }

            setPriceRange({
                min: newMin,
                max: newMax,
                value: newValue,
            });
            setPriceMinInput(newValue[0].toString());
            setPriceMaxInput(newValue[1].toString());

            setBrandItems(data.brands);
            setMaterialItems(data.materials);

            setSelectedBrands(brands);
            setSelectedMaterials(materials);

            setSidebarLoaded(true);
        }
    };

    const fetchSidebar = async () => {
        const params = new URLSearchParams();
        selectedBrands.forEach(brand => params.append('SelectedBrands', brand));
        selectedMaterials.forEach(material => params.append('SelectedMaterials', material));
        params.append('MinPrice', priceRange.value[0].toString());
        params.append('MaxPrice', priceRange.value[1].toString());

        const data = await searchService.fetchSidebar(params);
        if (data) {
            const newMin = data.minPrice;
            const newMax = data.maxPrice;
            let newValue = [...priceRange.value];
            if (newValue[0] < newMin) newValue[0] = newMin;
            if (newValue[1] > newMax) newValue[1] = newMax;

            // Ensure min <= max
            if (newValue[0] > newValue[1]) {
                newValue = [newMin, newMax];
            }

            setPriceRange({
                min: newMin,
                max: newMax,
                value: newValue as [number, number],
            });
            setPriceMinInput(newValue[0].toString());
            setPriceMaxInput(newValue[1].toString());

            setBrandItems(data.brands);
            setMaterialItems(data.materials);
        }
    };

    // Generic handler for slider changes
    const handleRangeChange = (setter: React.Dispatch<React.SetStateAction<FilterRange>>) => (
        _event: Event,
        newValue: number | number[]
    ) => {
        setter((prev) => ({ ...prev, value: newValue as [number, number] }));
        if (setter === setPriceRange) {
            setPriceMinInput((newValue as [number, number])[0].toString());
            setPriceMaxInput((newValue as [number, number])[1].toString());
        }
    };

    // Handlers for price TextField inputs
    const handlePriceMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceMinInput(event.target.value);
    };

    const handlePriceMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceMaxInput(event.target.value);
    };

    const handlePriceMinSubmit = () => {
        const newMin = Number(priceMinInput);
        if (!isNaN(newMin)) {
            setPriceRange((prev) => ({
                ...prev,
                value: [Math.min(newMin, prev.value[1]), prev.value[1]],
            }));
        } else {
            setPriceMinInput(priceRange.value[0].toString());
        }
    };

    const handlePriceMaxSubmit = () => {
        const newMax = Number(priceMaxInput);
        if (!isNaN(newMax)) {
            setPriceRange((prev) => ({
                ...prev,
                value: [prev.value[0], Math.max(newMax, prev.value[0])],
            }));
        } else {
            setPriceMaxInput(priceRange.value[1].toString());
        }
    };

    const handleBrandToggle = (item: string) => {
        setSelectedBrands((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item]
        );
    };

    const visibleBrands = showAllBrands
        ? brandItems
        : brandItems.slice(0, 5);

    const handleMaterialToggle = (item: string) => {
        setSelectedMaterials((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item]
        );
    };

    const visibleMaterials = showAllMaterials
        ? materialItems
        : materialItems.slice(0, 5);

    const handleApply = () => {
        const newParams = new URLSearchParams();
        selectedBrands.forEach(brand => newParams.append('SelectedBrands', brand));
        selectedMaterials.forEach(material => newParams.append('SelectedMaterials', material));
        newParams.append('MinPrice', priceRange.value[0].toString());
        newParams.append('MaxPrice', priceRange.value[1].toString());

        setSearchParams(newParams);
        fetchSidebar();
    };

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
                    onChange={handleRangeChange(setPriceRange)}
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
                        onChange={handlePriceMinInputChange}
                        onKeyDown={(e) => e.key === "Enter" && handlePriceMinSubmit()}
                        onBlur={handlePriceMinSubmit}
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
                        onChange={handlePriceMaxInputChange}
                        onKeyDown={(e) => e.key === "Enter" && handlePriceMaxSubmit()}
                        onBlur={handlePriceMaxSubmit}
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
                                        onChange={() => handleBrandToggle(item)}
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
                                        onChange={() => handleMaterialToggle(item)}
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
                onClick={handleApply}
                sx={{ mt: 2 }}
            >
                Застосувати
            </Button>
        </Box>
    );
};

export default SearchSidebar;
