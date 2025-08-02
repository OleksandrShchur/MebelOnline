import React, { useState } from "react";
import {
    Box,
    Slider,
    Typography,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
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

    const [brandItems, setBrandItems] = useState([
        "Виробник 1",
        "Виробник 2",
        "Виробник 3",
        "Виробник 4",
        "Виробник 5",
        "Виробник 6",
        "Виробник 7",
        "Виробник 8",
        "Виробник 9",
        "Виробник 10",
        "Виробник 11",
        "Виробник 12",
        "Виробник 13",
        "Виробник 14",
        "Виробник 15",
        "Виробник 16",
    ]);
    const [showAllBrands, setShowAllBrands] = useState<boolean>(false);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    const [materialItems, setMaterialItems] = useState([
        "Матеріал 1",
        "Матеріал 2",
        "Матеріал 3",
        "Матеріал 4",
        "Матеріал 5",
        "Матеріал 6",
        "Матеріал 7",
        "Матеріал 8",
        "Матеріал 9",
        "Матеріал 10",
        "Матеріал 11",
        "Матеріал 12",
        "Матеріал 13",
        "Матеріал 14",
        "Матеріал 15",
        "Матеріал 16",
    ]);
    const [showAllMaterials, setShowAllMaterials] = useState<boolean>(false);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

    // Temporary states for TextField inputs
    const [priceMinInput, setPriceMinInput] = useState<string>(priceRange.value[0].toString());
    const [priceMaxInput, setPriceMaxInput] = useState<string>(priceRange.value[1].toString());

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
        setSelectedBrands((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item]
        );
    };

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
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Виробник:
                </Typography>
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
                {!showAllBrands && brandItems.length > 5 && (
                    <Button
                        variant="outlined"
                        onClick={() => setShowAllBrands(true)}
                    >
                        Показати всі
                    </Button>
                )}
            </Box>

            {/* Material Filter */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Матеріал:
                </Typography>
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
                {!showAllMaterials && materialItems.length > 5 && (
                    <Button
                        variant="outlined"
                        onClick={() => setShowAllMaterials(true)}
                    >
                        Показати всі
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default SearchSidebar;
