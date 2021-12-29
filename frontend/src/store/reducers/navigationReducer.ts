import { NavigationAction, NavigationActionTypes, NavigationState } from 'types/redux/navigation';

const initialState: NavigationState = {
  sidebarOpened: false,
  sidebarStatic: !!JSON.parse(<string>localStorage.getItem('staticSidebar')),
  activeItem: JSON.parse(<string>localStorage.getItem('staticSidebar'))
    ? window.location.pathname
    : null,
};

export default function runtime(state = initialState, action: NavigationAction): NavigationState {
  switch (action.type) {
    case NavigationActionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarStatic: action.payload,
      };
    case NavigationActionTypes.OPEN_SIDEBAR:
      return Object.assign({}, state, {
        sidebarOpened: true,
      });
    case NavigationActionTypes.CLOSE_SIDEBAR:
      return Object.assign({}, state, {
        sidebarOpened: false,
      });
    case NavigationActionTypes.CHANGE_ACTIVE_SIDEBAR_ITEM:
      return {
        ...state,
        activeItem: action.payload,
      };
    default:
      return state;
  }
}
