import { createBrowserRouter } from 'react-router';
import AppLayout from './layouts/AppLayout'
import HomePage from './pages/Homepage';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: AppLayout, 
        children: [
            {
                index: true,
                Component: HomePage, 
            }
        ]
    },
])