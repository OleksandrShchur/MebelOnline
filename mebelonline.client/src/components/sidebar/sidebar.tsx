import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { useEffect, useRef, useState } from 'react';
import { ListItemButton, ListItemIcon, useMediaQuery, useTheme } from '@mui/material';
import type { CategoryModel } from '../../models/categoryModel';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface IMultiLevelSidebarProps {
    categories: CategoryModel[];
}

const MultiLevelSidebar: React.FC<IMultiLevelSidebarProps> = ({ categories = [] }) => {
    const [hoveredMain, setHoveredMain] = useState<number | null>(null);
    const [hoveredSub, setHoveredSub] = useState<number | null>(null);
    const [selectedMain, setSelectedMain] = useState<number | null>(null);
    const [selectedSub, setSelectedSub] = useState<number | null>(null);
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    useEffect(() => {
        const handleMouseLeave = (event: MouseEvent) => {
            const target = event.target as Node;
            if (sidebarRef.current && !sidebarRef.current.contains(target)) {
                setHoveredMain(null);
                setHoveredSub(null);
            }
        };

        document.addEventListener('mousemove', handleMouseLeave);
        return () => {
            document.removeEventListener('mousemove', handleMouseLeave);
        };
    }, []);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (sidebarRef.current && !sidebarRef.current.contains(target)) {
                setHoveredMain(null);
                setHoveredSub(null);
                setSelectedMain(null);
                setSelectedSub(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!isDesktop) {
        return null;
    }

    const activeMainIndex = selectedMain ?? hoveredMain;
    const activeSubIndex = selectedSub ?? hoveredSub;

    const hasSecondLevel = activeMainIndex !== null && (categories[activeMainIndex]?.childrenCategories?.length ?? 0) > 0;
    const showSecondLevel = hasSecondLevel;

    const hasThirdLevel = activeSubIndex !== null && (categories[activeMainIndex!]?.childrenCategories?.[activeSubIndex]?.childrenCategories?.length ?? 0) > 0;
    const showThirdLevel = showSecondLevel && hasThirdLevel;

    return (
        <Box ref={sidebarRef} sx={{ position: 'relative', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            {/* Main Level */}
            <Paper
                elevation={8}
                sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: 200,
                    height: '100%',
                    zIndex: 10,
                    overflowY: 'auto',
                    boxShadow: (theme) => theme.shadows[1], // put 0 to remove border
                }}
            >
                <List sx={{ pt: 8 }}>
                    {categories.map((item, index) => (
                        <ListItem
                            key={index}
                            onMouseEnter={() => {
                                setHoveredMain(index);
                                setHoveredSub(null);
                            }}
                            sx={{ cursor: 'pointer' }}
                        >
                            <ListItemButton
                                onClick={() => {
                                    setSelectedMain(selectedMain === index ? null : index);
                                    setSelectedSub(null);
                                }}
                            >
                                <ListItemText primary={item?.name} />
                                {(hoveredMain === index || selectedMain === index) && (item?.childrenCategories?.length ?? 0) > 0 && (
                                    <ListItemIcon sx={{ minWidth: 0 }}>
                                        <ChevronRightIcon />
                                    </ListItemIcon>
                                )}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* Second Level */}
            {showSecondLevel && (
                <Paper
                    elevation={8}
                    sx={{
                        position: 'absolute',
                        left: 200,
                        top: 0,
                        width: 200,
                        height: '100%',
                        zIndex: 10,
                        overflowY: 'auto',
                        boxShadow: (theme) => theme.shadows[4],
                    }}
                >
                    <List sx={{ pt: 8 }}>
                        {categories[activeMainIndex!]?.childrenCategories?.map((subItem, subIndex) => (
                            <ListItem
                                key={subIndex}
                                onMouseEnter={() => setHoveredSub(subIndex)}
                                sx={{ cursor: 'pointer' }}
                            >
                                <ListItemButton
                                    onClick={() => {
                                        setSelectedSub(selectedSub === subIndex ? null : subIndex);
                                    }}
                                >
                                    <ListItemText primary={subItem?.name} />
                                    {(hoveredSub === subIndex || selectedSub === subIndex) && (subItem?.childrenCategories?.length ?? 0) > 0 && (
                                        <ListItemIcon sx={{ minWidth: 0 }}>
                                            <ChevronRightIcon />
                                        </ListItemIcon>
                                    )}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}

            {/* Third Level*/ }
            {showThirdLevel && (
                <Paper
                    elevation={8}
                    sx={{
                        position: 'absolute',
                        left: 400,
                        top: 0,
                        width: 200,
                        height: '100%',
                        zIndex: 10,
                        overflowY: 'auto',
                        boxShadow: (theme) => theme.shadows[8],
                    }}
                >
                    <List sx={{ pt: 8 }}>
                        {categories[activeMainIndex!]?.childrenCategories?.[activeSubIndex!]?.childrenCategories?.map((item, index) => (
                            <ListItem key={index} sx={{ cursor: 'pointer' }}>
                                <ListItemButton>
                                    <ListItemText primary={item?.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </Box>
    );
};

export default MultiLevelSidebar;
