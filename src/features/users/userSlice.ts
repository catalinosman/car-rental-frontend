import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import axios from 'axios';
import jwt_decode from 'jwt-decode';


export interface UserProfile {
    firstName: string,
    lastName: string,
    email: string,
  }

export interface UserState {
    userProfile: UserProfile;
    token: any | null;
    loading: boolean;
    error: string | null;
  }

const initialState: UserState = {
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
    userProfile: {firstName:"", lastName:"", email: ""},
  };

export interface RegisterUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export interface LoginUser {
    email: string;
    password: string;
    token: any;
};



export const registerUser = createAsyncThunk(
    'user/register',
    async (registerUserData: RegisterUser) => {
      const response = await axios.post('https://localhost:7054/api/Authentication/register', registerUserData, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain',
        },
      });
      return response.data;
    },
  );


  export const loginUser = createAsyncThunk(
    'user/login',
    async (loginUserData: LoginUser) => {
      const response = await axios.post('https://localhost:7054/api/Authentication/login', loginUserData, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain',
        },
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      return token;
    }
  );

  export const getUserProfile = createAsyncThunk(
    'user/getUserProfile',
    async (_, { rejectWithValue }) => {
        const token:any = localStorage.getItem('token');
        const authHeader = 'Bearer ' + token;
        const decodedToken: any = jwt_decode(token);
        const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        const response = await axios.get(`https://localhost:7054/api/User/${userId}`, {
        headers: { Authorization: authHeader }
        });
        return response.data;
    }
  );


  export const updateUserProfile = createAsyncThunk(
    'user/updateUserProfile',
    async ({firstName, lastName, email}: UserProfile) => {
      const token:any = localStorage.getItem('token');
      const authHeader = 'Bearer ' + token;
      const decodedToken: any = jwt_decode(token);
      const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      const response = await axios.put( `https://localhost:7054/api/User/${userId}` , {
        firstName,
        lastName,
        email,
      }, 
      {
        headers: { 
          Authorization: authHeader,
          'Content-Type': 'application/json', 
        }
      });
      return response.data;
    }
  )


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser(state: UserState) {
            state.token = null;
            localStorage.removeItem('token');
          },
    },
    extraReducers :(builder) => {
        builder.addCase(registerUser.pending, (state: UserState) => {
            state.loading = true;
          });
      
          builder.addCase(registerUser.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
          });
      
          builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to register user';
          });

          builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
          });
      
          builder.addCase(loginUser.fulfilled, (state: UserState, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.loading = false;
            state.error = null;
            localStorage.setItem('token', action.payload);
          });
      
          builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to log in user';
          });

          builder.addCase(getUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
          });
          builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.userProfile = action.payload;
          });
          builder.addCase(getUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Unknown error';
          });

          builder.addCase(updateUserProfile.pending, (state) => {
            state.loading = true;
          });
          builder.addCase(updateUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.userProfile = action.payload;
          });
          builder.addCase(updateUserProfile.rejected, (state) => {
            state.loading = false;
          });
    }
});

export const {logoutUser} = userSlice.actions;
export default userSlice.reducer;