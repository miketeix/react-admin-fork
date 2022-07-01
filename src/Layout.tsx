import * as React from 'react';
import { memo, createElement } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { MenuItemLink, useResourceDefinitions, useSidebarState } from 'react-admin';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import {
    AppBar,
    Layout,
    Logout,
    UserMenu,
} from 'react-admin';
import {
    CssBaseline,
} from '@mui/material';

const MyUserMenu = () => (
    <UserMenu>
        <Logout />
    </UserMenu>
);

const MyAppBar = memo(props => <AppBar {...props} userMenu={<MyUserMenu />} />);
const MySideMenu =  ({ onMenuClick }) => {
    const [open] = useSidebarState();
    const resources = useResourceDefinitions();
    
    return (
        <div>
            <MenuItemLink
                to="/orders/active"
                primaryText="ActiveOrders"
                leftIcon={<ScheduleSendIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
            />
            {Object.keys(resources).map(name => (
                <MenuItemLink
                    key={name}
                    to={`/${name}`}
                    primaryText={resources[name].options && resources[name].options.label || name}
                    leftIcon={name !== 'tags' && createElement(resources[name].icon)}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                />
            ))}
            
        </div>
    );
}


export default props => (
    <>
        <CssBaseline />
        <Layout {...props} appBar={MyAppBar} menu={MySideMenu} />
        <ReactQueryDevtools
            initialIsOpen={false}
            toggleButtonProps={{ style: { width: 20, height: 30 } }}
        />
    </>
);
