import React from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router';
// @ts-ignore
import Hammer from 'rc-hammerjs';
import Header from '../Header';
import Helper from '../Helper';
import Sidebar from '../Sidebar';
import { openSidebar, closeSidebar, toggleSidebar } from 'store/actions/navigationActions';
import s from './Layout.module.scss';
import BreadcrumbHistory from '../BreadcrumbHistory';

import UsersFormPage from 'pages/CRUD/Users/form/UsersFormPage';
import UsersTablePage from 'pages/CRUD/Users/table/UsersTablePage';
import UsersViewPage from 'pages/CRUD/Users/page/UsersViewPage';

import MedicationsFormPage from 'pages/CRUD/Medications/form/MedicationsFormPage';
import MedicationsTablePage from 'pages/CRUD/Medications/table/MedicationsTablePage';
import MedicationsViewPage from 'pages/CRUD/Medications/page/MedicationsViewPage';

import Medication_fillsFormPage from 'pages/CRUD/Medication_fills/form/Medication_fillsFormPage';
import Medication_fillsTablePage from 'pages/CRUD/Medication_fills/table/Medication_fillsTablePage';
import Medication_fillsViewPage from 'pages/CRUD/Medication_fills/page/Medication_fillsViewPage';

import ChangePasswordFormPage from 'pages/CRUD/ChangePassword/ChangePasswordFormPage';
import Dashboard from '../../pages/dashboard';
import { SidebarTypes } from 'store/reducers/layoutReducer';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Layout = () => {
  const sidebarOpened = useTypedSelector((store) => store.navigation.sidebarOpened);
  const sidebarStatic = useTypedSelector((store) => store.navigation.sidebarStatic);
  const dashboardTheme = useTypedSelector((store) => store.layout.dashboardTheme);
  const sidebarType = useTypedSelector((store) => store.layout.sidebarType);

  const dispatch = useDispatch();
  const location = useLocation();

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768 && sidebarStatic) {
        dispatch(toggleSidebar(false));
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch, sidebarStatic]);

  const handleSwipe = (e: any) => {
    if ('ontouchstart' in window) {
      if (e.direction === 4) {
        dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && sidebarOpened) {
        dispatch(closeSidebar());
        return;
      }
    }
  };

  return (
    <div
      className={[
        s.root,
        sidebarStatic ? `${s.sidebarStatic}` : '',
        !sidebarOpened ? s.sidebarClose : '',
        'sing-dashboard',
        `dashboard-${sidebarType === SidebarTypes.TRANSPARENT ? 'light' : dashboardTheme}`,
      ].join(' ')}
    >
      <Sidebar />
      <div className={s.wrap}>
        <Header openUsersList={false} />
        <Helper />
        <Hammer onSwipe={handleSwipe}>
          <main className={s.content}>
            <BreadcrumbHistory url={location.pathname} />
            <Switch>
              <Route path={'/app/dashboard'} exact component={Dashboard} />
              <Route path={'/app/profile'} exact component={UsersFormPage} />
              <Route path={'/app/password'} exact component={ChangePasswordFormPage} />

              <Route path={'/admin/users'} exact component={UsersTablePage} />
              <Route path={'/admin/users/new'} exact component={UsersFormPage} />
              <Route path={'/admin/users/:id/edit'} exact component={UsersFormPage} />
              <Route path={'/admin/users/:id'} exact component={UsersViewPage} />

              <Route path={'/admin/medications'} exact component={MedicationsTablePage} />
              <Route path={'/admin/medications/new'} exact component={MedicationsFormPage} />
              <Route path={'/admin/medications/:id/edit'} exact component={MedicationsFormPage} />
              <Route path={'/admin/medications/:id'} exact component={MedicationsViewPage} />

              <Route path={'/admin/medication_fills'} exact component={Medication_fillsTablePage} />
              <Route
                path={'/admin/medication_fills/new'}
                exact
                component={Medication_fillsFormPage}
              />
              <Route
                path={'/admin/medication_fills/:id/edit'}
                exact
                component={Medication_fillsFormPage}
              />
              <Route
                path={'/admin/medication_fills/:id'}
                exact
                component={Medication_fillsViewPage}
              />
            </Switch>
            <footer className={s.contentFooter}>
              MedicationTracker - Made by
              <a href="https://flatlogic.com" rel="nofollow noopener noreferrer" target="_blank">
                Flatlogic
              </a>
            </footer>
          </main>
        </Hammer>
      </div>
    </div>
  );
};

export default Layout;
