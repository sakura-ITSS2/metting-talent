import React from "react";
import { useHistory } from "react-router-dom";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent
} from "react-pro-sidebar";

import {
    // FaTachometerAlt,
    FaGem,
    // FaList,
    FaGithub,
    // FaRegLaughWink,
    // FaHeart,
    // FaEdit
} from "react-icons/fa";


import {RiLogoutBoxLine} from 'react-icons/ri'

import {CgProfile} from "react-icons/cg"

const Sidebar = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
    const history = useHistory();
    // console.log(history, 'history');

    const handleLogout = async () => {
        await localStorage.clear();
        history.push('/');
    }

    return (
        <ProSidebar
            image={false}
            rtl={rtl}
            collapsed={collapsed}
            toggled={toggled}
            breakPoint="md"
            onToggle={handleToggleSidebar}
            style={{width: '200px', minWidth: '100px'}}
        >
            <SidebarHeader>
                <div
                    style={{
                        padding: "20px",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        fontSize: 20,
                        letterSpacing: "1px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: 'center'
                    }}
                >
                    さくらチーム
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem
                        icon={<CgProfile />}
                        style={{
                            padding: "20px",
                            fontWeight: "bold",
                            fontSize: 18,
                            letterSpacing: "1px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}
                        onClick={() => history.push('/talent')}
                        className={history.location.pathname === '/talent' ? 'isActive' : ''}
                    >
                        情報
                    </MenuItem>
                </Menu>
                <Menu />

                <Menu iconShape="circle">
                    <MenuItem
                        icon={<FaGem />}
                        style={{
                            padding: "20px",
                            fontWeight: "bold",
                            fontSize: 18,
                            letterSpacing: "1px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                        onClick={() => history.push('/talent/posts')}
                        className={history.location.pathname.includes('/talent/posts') ? 'isActive' : ''}
                    >
                        投稿
                    </MenuItem>
                </Menu>
            </SidebarContent>

            <SidebarFooter style={{ textAlign: 'center' }}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                        cursor: 'pointer'
                    }}
                >
                    <a
                        onClick={handleLogout}
                        target="_blank"
                        className="sidebar-btn"
                        rel="noopener noreferrer"
                        style={{
                            textDecoration: 'none',
                            padding: '5px',
                            border: '1px solid',
                        }}
                    >
                        <RiLogoutBoxLine />
                        <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', marginLeft: '4px' }}>
                            ログアウト
                        </span>
                    </a>
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
};

export default Sidebar;
