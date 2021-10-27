import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import organizationReducer from './reducers/organization';
import applicationReducer from './reducers/application';
import offerReducer from './reducers/offer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    organization: organizationReducer,
    application: applicationReducer,
    offer: offerReducer,
  },
})
