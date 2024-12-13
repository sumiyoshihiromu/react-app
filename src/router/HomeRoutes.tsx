import { Home } from '../components/pages/Home';
import { Page404 } from '../components/pages/Page404';
import { Setting } from '../components/pages/Setting';
import { Slot } from '../components/pages/Slot';
import { UserManagement } from '../components/pages/UserManagement';
import { Weather } from '../components/pages/Weather';

export const homeRoutes = [
  {
    path: '/',
    exact: true,
    children: <Home />,
  },
  {
    path: '/user_management',
    exact: false,
    children: <UserManagement />,
  },
  {
    path: '/setting',
    exact: false,
    children: <Setting />,
  },
  {
    path: '/slot',
    exact: false,
    children: <Slot />,
  },
  {
    path: '/weather',
    exact: false,
    children: <Weather />,
  },
  {
    path: '*',
    exact: false,
    children: <Page404 />,
  },
];
