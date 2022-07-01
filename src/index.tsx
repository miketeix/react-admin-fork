/* eslint react/jsx-key: off */
import * as React from 'react';
import { Admin, Resource, CustomRoutes } from 'react-admin'; // eslint-disable-line import/no-unresolved
import { render } from 'react-dom';
import { Route } from 'react-router-dom';

import authProvider from './authProvider';
import ActiveOrders from './orders/active';
import CustomRouteNoLayout from './customRouteNoLayout';
import dataProvider from './dataProvider';
import i18nProvider from './i18nProvider';
import Layout from './Layout';
import posts from './posts';
import pastOrders from './orders/past';
import users from './users';

render(
    <React.StrictMode>
        <Admin
            authProvider={authProvider}
            dataProvider={dataProvider}
            i18nProvider={i18nProvider}
            title="Example Admin"
            layout={Layout}
        >
            <CustomRoutes>
                <Route
                    path="/orders/active"
                    element={<ActiveOrders title="Active Orders" />}
                />
            </CustomRoutes>
            <Resource name="orders/past" title="Past Orders" {...pastOrders} />
            <Resource name="posts" {...posts} />
            
            {permissions => (
                <>
                    {permissions && <Resource name="users" {...users} />}
                    
                </>
            )}
            
        </Admin>
    </React.StrictMode>,
    document.getElementById('root')
);
