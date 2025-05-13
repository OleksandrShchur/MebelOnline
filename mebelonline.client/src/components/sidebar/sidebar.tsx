import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Grow from '@mui/material/Grow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, { useEffect, useRef, useState } from 'react';

const menuData = [
    {
        label: 'Living Room',
        children: [
            {
                label: 'Sofas',
                children: ['Leather Sofas', 'Fabric Sofas']
            },
            {
                label: 'Tables',
                children: ['Coffee Tables', 'Side Tables']
            }
        ]
    },
    {
        label: 'Bedroom',
        children: [
            {
                label: 'Beds',
                children: ['King Size', 'Queen Size']
            },
            {
                label: 'Wardrobes',
                children: ['Sliding Door', 'Hinged Door']
            }
        ]
    },
    {
        label: 'Bedroom example',
        children: [
            {
                label: 'Beds example'
            },
            {
                label: 'Wardrobes',
                children: ['Sliding Door', 'Hinged Door']
            }
        ]
    }
];

const MultiLevelSidebar = () => {
    const [hoveredMain, setHoveredMain] = useState<number | null>(null);
    const [hoveredSub, setHoveredSub] = useState<number | null>(null);
    const sidebarRef = useRef<HTMLDivElement | null>(null);

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

    return (
        <Box ref={sidebarRef}>
            {/* Main Sidebar */}
            <Drawer variant="permanent" anchor="left" sx={{ width: 200, '& .MuiDrawer-paper': { width: 200, paddingTop: 8 } }}>
                <List>
                    {menuData.map((item, index) => (
                        <ListItem
                            key={index}
                            onMouseEnter={() => {
                                setHoveredMain(index);
                                setHoveredSub(null); // Reset third column when first column item is changed
                            }}
                            sx={{ cursor: 'pointer' }}
                        >
                            <ListItemText primary={item?.label} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Submenu */}
            {hoveredMain !== null && (
                <Grow in={true} timeout={300}>
                    <Box sx={{
                        position: 'absolute', left: 205, top: 0, width: 200, height: '100%',
                        bgcolor: '#f0f0f0', boxShadow: 30, color: 'black', paddingTop: 8
                    }}>
                        <List>
                            {menuData[hoveredMain]?.children.map((subItem, subIndex) => (
                                <ListItem
                                    key={subIndex}
                                    onMouseEnter={() => setHoveredSub(subIndex)}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <ListItemText primary={subItem.label} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grow>
            )}

            {/* Third Level Menu */}
            {hoveredMain !== null &&
                hoveredSub !== null &&
                menuData[hoveredMain]?.children &&
                menuData[hoveredMain]?.children[hoveredSub]?.children &&
                menuData[hoveredMain]?.children[hoveredSub]?.children.length > 0 && (
                    <Grow in={true} timeout={300}>
                        <Box sx={{
                            position: 'absolute', left: 409, top: 0, width: 200, height: '100%',
                            bgcolor: '#e0e0e0', boxShadow: 30, color: 'black', paddingTop: 8
                        }}>
                            <List>
                                {menuData[hoveredMain].children[hoveredSub].children!.map((item, index) => (
                                    <ListItem key={index} sx={{ cursor: 'pointer' }}>
                                        <ListItemText primary={item} />
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
