import { type Action, combineReducers } from "redux";

// import slices
import userSliceReducer from "./features/user-slice";
import bannersSliceReducer from "./features/banner-slice";
import packagesSliceReducer from "./features/packages-slice";
import clientsSliceReducer from "./features/clients-slice";
import worksSliceReducer from "./features/works-slice";

export const LOGOUT = 'LOGOUT';

const appReducer = combineReducers({
   user: userSliceReducer,
   banners: bannersSliceReducer,
   packages: packagesSliceReducer,
   clients: clientsSliceReducer,
   works: worksSliceReducer,
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: Action) => {
   if (action.type === LOGOUT) {
      state = undefined; // resets entire state
   }
   return appReducer(state, action);
};

export default rootReducer;
