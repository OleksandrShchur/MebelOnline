import React, { useState } from "react";
import {
    Box,
    Checkbox,
    FormControlLabel,
    Slider,
    Typography,
    Button,
    TextField,
} from "@mui/material";

interface FilterRange {
    min: number;
    max: number;
    value: [number, number];
}

const SearchSidebar: React.FC = () => {
    const [priceRange, setPriceRange] = useState<FilterRange>({
        min: 0,
        max: 300,
        value: [0, 300],
    });
    const [heightRange, setHeightRange] = useState<FilterRange>({
        min: 0,
        max: 200,
        value: [0, 200],
    });
    const [widthRange, setWidthRange] = useState<FilterRange>({
        min: 0,
        max: 399,
        value: [0, 399],
    });

    // Temporary states for TextField inputs
    const [priceMinInput, setPriceMinInput] = useState<string>(priceRange.value[0].toString());
    const [priceMaxInput, setPriceMaxInput] = useState<string>(priceRange.value[1].toString());
    const [widthMinInput, setWidthMinInput] = useState<string>(widthRange.value[0].toString());
    const [widthMaxInput, setWidthMaxInput] = useState<string>(widthRange.value[1].toString());

    // Generic handler for slider changes
    const handleRangeChange = (setter: React.Dispatch<React.SetStateAction<FilterRange>>) => (
        _event: Event,
        newValue: number | number[]
    ) => {
        setter((prev) => ({ ...prev, value: newValue as [number, number] }));
        // Update input states when slider changes
        if (setter === setPriceRange) {
            setPriceMinInput((newValue as [number, number])[0].toString());
            setPriceMaxInput((newValue as [number, number])[1].toString());
        } else if (setter === setWidthRange) {
            setWidthMinInput((newValue as [number, number])[0].toString());
            setWidthMaxInput((newValue as [number, number])[1].toString());
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
            setPriceMinInput(priceRange.value[0].toString()); // Revert to current value if invalid
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
            setPriceMaxInput(priceRange.value[1].toString()); // Revert to current value if invalid
        }
    };

    // Handlers for width TextField inputs
    const handleWidthMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWidthMinInput(event.target.value);
    };

    const handleWidthMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWidthMaxInput(event.target.value);
    };

    const handleWidthMinSubmit = () => {
        const newMin = Number(widthMinInput);
        if (!isNaN(newMin)) {
            setWidthRange((prev) => ({
                ...prev,
                value: [Math.min(newMin, prev.value[1]), prev.value[1]],
            }));
        } else {
            setWidthMinInput(widthRange.value[0].toString()); // Revert to current value if invalid
        }
    };

    const handleWidthMaxSubmit = () => {
        const newMax = Number(widthMaxInput);
        if (!isNaN(newMax)) {
            setWidthRange((prev) => ({
                ...prev,
                value: [prev.value[0], Math.max(newMax, prev.value[0])],
            }));
        } else {
            setWidthMaxInput(widthRange.value[1].toString()); // Revert to current value if invalid
        }
    };

    const filters = [
        { label: "Новинка", value: "new" },
        { label: "Супер-ціна", value: "superPrice" },
        { label: "Топ", value: "top" },
    ];

    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const handleFilterChange = (value: string) => {
        setSelectedFilters((prev) =>
            prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
        );
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

            {/* Height Filter */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Акуля:
                </Typography>
                <Slider
                    value={heightRange.value}
                    onChange={handleRangeChange(setHeightRange)}
                    min={heightRange.min}
                    max={heightRange.max}
                    valueLabelDisplay="auto"
                    sx={{ color: "#fff" }}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                    <Button
                        variant="outlined"
                        sx={{ color: "#fff", borderColor: "#fff" }}
                        onClick={() => setHeightRange((prev) => ({ ...prev, value: [0, prev.value[1]] }))}
                    >
                        0
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ color: "#fff", borderColor: "#fff" }}
                        onClick={() => setHeightRange((prev) => ({ ...prev, value: [prev.value[0], 200] }))}
                    >
                        200
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#4caf50", "&:hover": { backgroundColor: "#45a049" } }}
                        onClick={() => console.log("Apply Height:", heightRange.value)}
                    >
                        OK
                    </Button>
                </Box>
            </Box>

            {/* Categorical Filters */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Фільтри:
                </Typography>
                {filters.map((filter) => (
                    <FormControlLabel
                        key={filter.value}
                        control={
                            <Checkbox
                                checked={selectedFilters.includes(filter.value)}
                                onChange={() => handleFilterChange(filter.value)}
                                sx={{ color: "#fff", "&.Mui-checked": { color: "#4caf50" } }}
                            />
                        }
                        label={filter.label}
                        sx={{ color: "#fff" }}
                    />
                ))}
            </Box>

            {/* Width Filter */}
            <Box>
                <Typography variant="subtitle1" gutterBottom>
                    Розмір - ширина:
                </Typography>
                <Slider
                    value={widthRange.value}
                    onChange={handleRangeChange(setWidthRange)}
                    min={widthRange.min}
                    max={widthRange.max}
                    valueLabelDisplay="auto"
                    sx={{ color: "#fff" }}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                    <TextField
                        id="width-min-input"
                        label="Від"
                        variant="outlined"
                        value={widthMinInput}
                        onChange={handleWidthMinInputChange}
                        onKeyDown={(e) => e.key === "Enter" && handleWidthMinSubmit()}
                        onBlur={handleWidthMinSubmit}
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
                        id="width-max-input"
                        label="До"
                        variant="outlined"
                        value={widthMaxInput}
                        onChange={handleWidthMaxInputChange}
                        onKeyDown={(e) => e.key === "Enter" && handleWidthMaxSubmit()}
                        onBlur={handleWidthMaxSubmit}
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
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#4caf50", "&:hover": { backgroundColor: "#45a049" } }}
                        onClick={() => console.log("Apply Width:", widthRange.value)}
                    >
                        OK
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default SearchSidebar;
