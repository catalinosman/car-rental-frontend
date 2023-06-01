import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../types';
import axios from 'axios'; 

interface CategoryState {
    category: Category[];
    loading: boolean;
    error: string | null; 
};

const initialState: CategoryState = {
    category: [],
    loading: false,
    error: null,
};


export const getAllCategories = createAsyncThunk(
    "all/categories",
    async () => {
        try {
            const url = `https://localhost:7054/api/Category/all`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {

        }
    }
)

const categorySlice = createSlice ({
    name: 'category',
    initialState,
    reducers: {

    },
    extraReducers :(builder) => {
        builder.addCase(getAllCategories.pending, (state) => {
            state.loading = true ;
        });
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.category = action.payload;
        });
        builder.addCase(getAllCategories.rejected,(state) => {
            state.loading = false;
        });
    }
});


export default categorySlice.reducer;
// https://localhost:7054/api/Category/all