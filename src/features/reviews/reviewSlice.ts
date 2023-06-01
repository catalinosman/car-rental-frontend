import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Review } from '../../types';
import axios from 'axios';
import { VehicleId } from "../vehicles/vehicleSlice";
import jwt_decode from "jwt-decode";

interface ReviewState {
    review: Review[];
    loading: boolean;
    error: string | null;
};

const initialState: ReviewState = {
    review: [],
    loading: false,
    error: null
};

export interface AddReviewForm {
    vehicleId: any,
    title: string,
    description: string
  }

export interface ReviewId {
  reviewId : number
}

export const getReviewsByVehicle = createAsyncThunk(
    "reviews",
    async ({vehicleId}: VehicleId) => {
        try {
            const url = `https://localhost:7054/api/Review?vehicleId=${vehicleId}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {

        }
    }
)



export const addReview = createAsyncThunk(
    "review/add",
    async ({ vehicleId, title, description}: AddReviewForm) => {
      const token:any = localStorage.getItem('token');
      const authHeader = 'Bearer ' + token;
      const decodedToken: any = jwt_decode(token);
      const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      const response = await axios.post(`https://localhost:7054/api/Review/${userId}/${vehicleId}`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
          }
        }
      );
      return response.data;
    }
  );


  export const removeReview = createAsyncThunk(
    "remove/review",
    async ({reviewId}: ReviewId) => {
      const token:any = localStorage.getItem('token');
      const authHeader = 'Bearer ' + token;
       const response = await axios.delete(`https://localhost:7054/api/Review/${reviewId}`, {
        headers: { Authorization: authHeader }
       });
       return response.data;
    }
  )


const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers : {
    },
    extraReducers :(builder) => {
        builder.addCase(getReviewsByVehicle.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getReviewsByVehicle.fulfilled, (state, action) => {
            state.loading = false;
           state.review = action.payload;
        });
        builder.addCase(getReviewsByVehicle.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(addReview.pending, (state) => {
            state.loading = true;
          });
          builder.addCase(addReview.fulfilled, (state, action) => {
            state.loading = false;
            state.review = action.payload;
          });
          builder.addCase(addReview.rejected, (state) => {
            state.loading = false;
          });

          builder.addCase(removeReview.pending, (state) => {
            state.loading = true;
          })
          builder.addCase(removeReview.fulfilled, (state, action) => {
            state.loading = false;
            const reviewId = action.meta.arg.reviewId;
            state.review = state.review.filter((review) => review.id !== reviewId);
          });
          builder.addCase(removeReview.rejected, (state, action) => {
            state.loading = false;
          });
    }
});

export default reviewSlice.reducer;