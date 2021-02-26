import { userConstants } from '../_constants';

type UserState = {
  items: Array<any>;
  isLoggedIn: boolean;
  loading: boolean;
  error: string;
};

export function user(
  state: UserState = {
    items: [],
    isLoggedIn: false,
    loading: false,
    error: '',
  },
  action: any
) {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
      return {
        items: action.user.data,
        isLoggedIn: true,
        loading: false,
        error: null,
      };
    case userConstants.LOGIN_REQUEST:
      return {
        items: [],
        isLoggedIn: false,
        loading: true,
        error: null,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        items: [],
        isLoggedIn: false,
        loading: false,
        error: 'hata',
      };
    case userConstants.LOGOUT:
      return {
        items: [],
        isLoggedIn: false,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
