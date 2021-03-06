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
import './sidebar.scss';

import {
    // FaTachometerAlt,
    FaGem,
    // FaList,
    // FaGithub,
    // FaRegLaughWink,
    // FaHeart,
    // FaEdit
} from "react-icons/fa";
import {AiFillCalendar} from "react-icons/ai"
import {RiLogoutBoxLine} from 'react-icons/ri'
import {CgProfile} from "react-icons/cg"

const Sidebar = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
    const history = useHistory();

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
            style={{width: '245px', minWidth: '200px', color: '#fff'}}
        >
            <SidebarHeader>
                <div
                    style={{
                        padding: "20px",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        fontSize: 20,
                        letterSpacing: "2px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: 'center'
                    }}
                >
                    Top Talent
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem
                        // icon={<CgProfile />}
                        style={{
                            padding: "20px",
                            fontSize: 20,
                            // letterSpacing: "1px",
                            // overflow: "hidden",
                            // textOverflow: "ellipsis",
                            // whiteSpace: "nowrap"
                        }}
                        onClick={() => history.push('/talent')}
                        className={history.location.pathname === '/talent' ? 'isActive' : ''}
                    >
                        <CgProfile style={{fontSize: '23px'}} /> ??????
                    </MenuItem>
                </Menu>
                <Menu />

                <Menu iconShape="circle">
                    <MenuItem
                        style={{
                            padding: "20px 15px 20px 10px",
                            fontSize: 20,
                            letterSpacing: "1px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                        onClick={() => history.push('/talent/posts')}
                        className={history.location.pathname.includes('/talent/posts') ? 'isActive' : ''}
                    >
                        <FaGem style={{fontSize: '20px'}} /> ????????????
                    </MenuItem>
                </Menu>

                <Menu iconShape="circle">
                    <MenuItem
                        style={{
                            padding: "20px 15px 20px 10px",
                            fontSize: 20,
                            // letterSpacing: "1px",
                            // overflow: "hidden",
                            // textOverflow: "ellipsis",
                            // whiteSpace: "nowrap",
                        }}
                        onClick={() => history.push('/talent/list-meeting')}
                        className={history.location.pathname.includes('/talent/list-meeting') ? 'isActive' : ''}
                    >
                        <AiFillCalendar style={{fontSize: '16px'}} /> ?????????????????????
                    </MenuItem>
                </Menu>
            </SidebarContent>

            <SidebarFooter style={{ textAlign: 'center' }}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                        cursor: 'pointer',
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
                            color:'#fff',
                        }}
                    >
                        <RiLogoutBoxLine />
                        <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', marginLeft: '4px', color:'#fff' }}>
                            ???????????????
                        </span>
                    </a>
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
};

export default Sidebar;
