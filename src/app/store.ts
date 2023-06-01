import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import vehicleReducer from '../features/vehicles/vehicleSlice';
import categoryReducer from '../features/categories/categorySlice';
import reviewReducer from '../features/reviews/reviewSlice';
import userReducer from '../features/users/userSlice';

export const store = configureStore({
  reducer: {
    vehicle: vehicleReducer,
    category: categoryReducer,
    review: reviewReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;