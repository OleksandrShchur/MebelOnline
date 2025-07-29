import React, { useState } from "react";
import {
    Box,
    Checkbox,
    FormControlLabel,
    Slider,
    Typography,
    Button,
} from "@mui/material";

interface FilterRange {
    min: number;
    max: number;
    value: [number, number];
}

const SearchSidebar: React.FC = () => {
    const [widthRange, setWidthRange] = useState<FilterRange>({
        min: 0,
        max: 300,
        value: [0, 300],
    });
    const [heightRange, setHeightRange] = useState<FilterRange>({
        min: 0,
        max: 200,
        value: [0, 200],
    });

    const handleRangeChange =
        (setter: React.Dispatch<React.SetStateAction<FilterRange>>) =>
            (event: Event, newValue: number | number[]) => {
                setter((prev) => ({ ...prev, value: newValue as [number, number] }));
            };

    const filters = [
        { label: "Новинка", value: "new" },
        { label: "Супер-ціна", value: "superPrice" },
        { label: "Топ", value: "top" },
    ];

    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const handleFilterChange = (value: string) => {
        setSelectedFilters((prev) =>
            prev.includes(value)
                ? prev.filter((f) => f !== value)
                : [...prev, value]
        );
    };

    return (
        <Box
            sx={{
                width: 250,
                backgroundColor: "#1a1a1a",
                color: "#fff",
                padding: 2,
                borderRight: "1px solid #333",
            }}
        >
            {/* Width Filter */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Ширина:
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
                    <Button
                        variant="outlined"
                        sx={{ color: "#fff", borderColor: "#fff" }}
                        onClick={() => setWidthRange((prev) => ({ ...prev, value: [0, 300] }))}
                    >
                        0
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ color: "#fff", borderColor: "#fff" }}
                        onClick={() => setWidthRange((prev) => ({ ...prev, value: [300, 300] }))}
                    >
                        300
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#4caf50", "&:hover": { backgroundColor: "#45a049" } }}
                        onClick={() => console.log("Apply Width:", widthRange.value)}
                    >
                        ok
                    </Button>
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
                        onClick={() => setHeightRange((prev) => ({ ...prev, value: [0, 200] }))}
                    >
                        0
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ color: "#fff", borderColor: "#fff" }}
                        onClick={() => setHeightRange((prev) => ({ ...prev, value: [200, 200] }))}
                    >
                        200
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#4caf50", "&:hover": { backgroundColor: "#45a049" } }}
                        onClick={() => console.log("Apply Height:", heightRange.value)}
                    >
                        ok
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

            {/* Additional Filter (e.g., Вибір - ширина) */}
            <Box>
                <Typography variant="subtitle1" gutterBottom>
                    Розмір - ширина:
                </Typography>
                <Slider
                    value={[0, 399]}
                    min={0}
                    max={399}
                    valueLabelDisplay="auto"
                    onChange={handleRangeChange(() => { })}
                    sx={{ color: "#fff" }}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                    <Button
                        variant="outlined"
                        sx={{ color: "#fff", borderColor: "#fff" }}
                        onClick={() => { }}
                    >
                        0
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ color: "#fff", borderColor: "#fff" }}
                        onClick={() => { }}
                    >
                        399
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#4caf50", "&:hover": { backgroundColor: "#45a049" } }}
                        onClick={() => console.log("Apply Width Range:", [0, 399])}
                    >
                        ok
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default SearchSidebar;
