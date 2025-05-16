import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Grow from '@mui/material/Grow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import type { CategorySidebarModel } from '../../models/categorySidebarModel';

interface IMultiLevelSidebarProps {
    categories: CategorySidebarModel[];
}

const MultiLevelSidebar: React.FC<IMultiLevelSidebarProps> = ({ categories = [] }) => {
    const [hoveredMain, setHoveredMain] = useState<number | null>(null);
    const [hoveredSub, setHoveredSub] = useState<number | null>(null);
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    // Access the theme to use for responsive breakpoints
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));  // Check if the screen is medium or larger (desktop)

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

            if (sidebarRef.current && sidebarRef.current.contains(target)) {
                // Check if the click is outside of any ListItemText
                const boxElements = sidebarRef.current.querySelectorAll('.MuiBox-root');
                const clickedOnBox = Array.from(boxElements).some(el => el.contains(target));

                if (!clickedOnBox) {
                    setHoveredMain(null);
                    setHoveredSub(null);
                }
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
            <Drawer variant="permanent" anchor="left" sx={{ width: 200, '& .MuiDrawer-paper': { width: 200, paddingTop: 8 } }}>
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
                            <ListItemText primary={item?.name} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {hoveredMain !== null && (
                <Grow in={true} timeout={300}>
                    <Box sx={{
                        position: 'absolute', left: 201, top: 0, width: 200, height: 'calc(100vh - 64px)',
                        bgcolor: '#f0f0f0', boxShadow: 30, color: 'black', paddingTop: 8
                    }}>
                        <List>
                            {categories[hoveredMain]?.childrenCategories.map((subItem, subIndex) => (
                                <ListItem
                                    key={subIndex}
                                    onMouseEnter={() => setHoveredSub(subIndex)}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <ListItemText primary={subItem.name} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grow>
            )}

            {hoveredMain !== null &&
                hoveredSub !== null &&
                categories[hoveredMain]?.childrenCategories &&
                categories[hoveredMain]?.childrenCategories[hoveredSub]?.childrenCategories &&
                categories[hoveredMain]?.childrenCategories[hoveredSub]?.childrenCategories.length > 0 && (
                    <Grow in={true} timeout={300}>
                        <Box sx={{
                            position: 'absolute', left: 402, top: 0, width: 200, height: 'calc(100vh - 64px)',
                            bgcolor: '#e0e0e0', boxShadow: 30, color: 'black', paddingTop: 8
                        }}>
                            <List>
                                {categories[hoveredMain].childrenCategories[hoveredSub].childrenCategories!.map((item, index) => (
                                    <ListItem key={index} sx={{ cursor: 'pointer' }}>
                                        <ListItemText primary={item.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grow>
                )}
        </Box>
    );
};

export default MultiLevelSidebar;
