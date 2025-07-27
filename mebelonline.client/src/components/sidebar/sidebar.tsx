import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
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
        return null;  // Do not render the sidebar on small screens
    }

    return (
        <Box ref={sidebarRef} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            {/* Main Drawer */}
            <Drawer variant="permanent" anchor="left" sx={{ width: 200, '& .MuiDrawer-paper': { width: 200, paddingTop: 8, marginLeft: 0 } }}>
                <List>
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
                                {(hoveredMain === index || selectedMain === index) && (
                                    <ListItemIcon sx={{ minWidth: 0 }}>
                                        <ChevronRightIcon />
                                    </ListItemIcon>
                                )}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Second Drawer */}
            {(hoveredMain !== null || selectedMain !== null) && (
                <Drawer
                    PaperProps={{ sx: { left: 201 } }}
                    variant="permanent"
                    anchor="left"
                    sx={{ width: 200, left: 200, '& .MuiDrawer-paper': { width: 200, paddingTop: 8, marginLeft: 0 } }}
                >
                    <List>
                        {categories[selectedMain ?? hoveredMain ?? 0]?.childrenCategories.map((subItem, subIndex) => (
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
                                    {(hoveredSub === subIndex || selectedSub === subIndex) &&
                                        categories[selectedMain ?? hoveredMain ?? 0]?.childrenCategories[subIndex]?.childrenCategories && (
                                        <ListItemIcon sx={{ minWidth: 0 }}>
                                            <ChevronRightIcon />
                                        </ListItemIcon>
                                    )}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            )}

            {/* Third Drawer */}
            {(hoveredMain !== null || selectedMain !== null) &&
                (hoveredSub !== null || selectedSub !== null) &&
                categories[selectedMain ?? hoveredMain ?? 0]?.childrenCategories[selectedSub ?? hoveredSub ?? 0]?.childrenCategories && (
                <Drawer
                    PaperProps={{ sx: { left: 402 } }}
                    variant="permanent"
                    anchor="left"
                    sx={{ width: 200, left: 400, '& .MuiDrawer-paper': { width: 200, paddingTop: 8, marginLeft: 0 } }}
                >
                    <List>
                        {categories[selectedMain ?? hoveredMain ?? 0].childrenCategories[selectedSub ?? hoveredSub ?? 0].childrenCategories!.map((item, index) => (
                            <ListItem key={index} sx={{ cursor: 'pointer' }}>
                                <ListItemButton>
                                    <ListItemText primary={item?.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            )}
        </Box>
    );
};

export default MultiLevelSidebar;
