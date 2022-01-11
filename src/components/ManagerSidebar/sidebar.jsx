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
    FaTachometerAlt,
    FaGem,
    FaList,
    // FaGithub,
    // FaRegLaughWink,
    // FaHeart,
    // FaEdit
} from "react-icons/fa";
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
            style={{width: '85%', minWidth: '200px', color: '#fff', zIndex: '50'}}
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
                            letterSpacing: "1px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}
                        onClick={() => history.push('/manager')}
                        className={history.location.pathname === '/manager' ? 'isActive' : ''}
                    >
                        <CgProfile style={{fontSize: '23px'}} /> 情報
                    </MenuItem>
                </Menu>

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
                        onClick={() => history.push('/manager/listPost')}
                        className={history.location.pathname.includes('/manager/listPost') || history.location.pathname.includes('/manager/listTalent/')  ? 'isActive' : ''}
                    >
                        <FaList style={{fontSize: '20px'}} /> 求人情報
                    </MenuItem>
                </Menu>

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
                        onClick={() => history.push('/manager/management')}
                        className={history.location.pathname.includes('/manager/management') ? 'isActive' : ''}
                    >
                        <FaTachometerAlt style={{fontSize: '20px'}} /> 求人管理
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
                            ログアウト
                        </span>
                    </a>
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
};

export default Sidebar;
