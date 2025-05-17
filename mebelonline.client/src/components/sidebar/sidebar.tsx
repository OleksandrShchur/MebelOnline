import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
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
                            <ListItemText primary={item?.name} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Second Drawer */}
            {hoveredMain !== null && (
                <Drawer 
                    PaperProps={{ sx: { left: 201 } }}
                    variant="permanent"
                    anchor="left"
                    sx={{ width: 200, left: 200, '& .MuiDrawer-paper': { width: 200, paddingTop: 8, marginLeft: 0 } }}
                >
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
                </Drawer>
            )}

            {/* Third Drawer */}
            {hoveredMain !== null && hoveredSub !== null && categories[hoveredMain]?.childrenCategories[hoveredSub]?.childrenCategories && (
                <Drawer 
                    PaperProps={{ sx: { left: 402 } }}
                    variant="permanent"
                    anchor="left"
                    sx={{ width: 200, left: 400, '& .MuiDrawer-paper': { width: 200, paddingTop: 8, marginLeft: 0 } }}
                >
                    <List>
                        {categories[hoveredMain].childrenCategories[hoveredSub].childrenCategories!.map((item, index) => (
                            <ListItem key={index} sx={{ cursor: 'pointer' }}>
                                <ListItemText primary={item.name} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            )}
        </Box>
    );
};

export default MultiLevelSidebar;
