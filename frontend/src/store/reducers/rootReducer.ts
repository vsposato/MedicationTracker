import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { store } from '../index';

import authReducer from 'store/reducers/authReducer';
import alertsReducer from 'store/reducers/alertsReducer';
import navigationReducer from 'store/reducers/navigationReducer';
import layoutReducer from 'store/reducers/layoutReducer';

import users from 'store/reducers/users/usersReducers';

import medications from 'store/reducers/medications/medicationsReducers';

import medication_fills from 'store/reducers/medication_fills/medication_fillsReducers';

export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    layout: layoutReducer,
    alerts: alertsReducer,
    auth: authReducer,
    navigation: navigationReducer,

    users,

    medications,

    medication_fills,
  });

export type RootState = ReturnType<typeof store.getState>;
