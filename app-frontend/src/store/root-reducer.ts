import { type Action, combineReducers } from "redux";

// import slices
import userSliceReducer from "./features/user-slice";
import bannersSliceReducer from "./features/banner-slice";
import packagesSliceReducer from "./features/packages-slice";
import clientsSliceReducer from "./features/clients-slice";
import worksSliceReducer from "./features/works-slice";
import testimonialsSliceReducer from "./features/testimonial-slice";
import expertsSliceReducer from "./features/experts-slice";
import productsSliceReducer from "./features/products-slice";
import vlogsSliceReducer from "./features/vlogs-slice";
import aboutSliceReducer from "./features/about-slice";
import pagesBannerSliceReducer from "./features/pages-banner-slice";
import seoSliceReducer from "./features/seo-slice";
import contactSliceReducer from "./features/contact-slice";

export const LOGOUT = "LOGOUT";

const appReducer = combineReducers({
   user: userSliceReducer,
   banners: bannersSliceReducer,
   packages: packagesSliceReducer,
   clients: clientsSliceReducer,
   works: worksSliceReducer,
   testimonials: testimonialsSliceReducer,
   experts: expertsSliceReducer,
   products: productsSliceReducer,
   vlogs: vlogsSliceReducer,
   about: aboutSliceReducer,
   pagesBanner: pagesBannerSliceReducer,
   seoTags: seoSliceReducer,
   contact: contactSliceReducer,
});

const rootReducer = (
   state: ReturnType<typeof appReducer> | undefined,
   action: Action
) => {
   if (action.type === LOGOUT) {
      state = undefined; // resets entire state
   }
   return appReducer(state, action);
};

export default rootReducer;
