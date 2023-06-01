import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Vehicle } from '../../types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

interface VehicleState {
    vehicle: Vehicle[];
    loading: boolean;
    error: string | null;
}

const initialState: VehicleState = {
    vehicle: [],
    loading: false,
    error: null,
};

export interface FilterParams {
    orderBy: string,
    name: string,
    categoryId: string
};

export interface VehicleId{
    vehicleId: number | undefined
}

export interface CreateVehicleForm {
    categoryId: number,
    name: string,
    description: string,
    price: number,
    imageURL: string,
  }

  export interface UpdateVehicle {
    vehicleId: number | undefined,
    name: string | undefined,
    description: string | undefined ,
    price: number | undefined,
    imageURL: string | undefined,
  }


export const getAllVehicles = createAsyncThunk(
    "all/vehicles",
    async ({orderBy, name, categoryId}: FilterParams) => {
        try {
            const url = `https://localhost:7054/api/Vehicle/all?categoryId=${categoryId}&orderBy=${orderBy}&name=${name}` ;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {

        }
    }
);

export const getVehicle = createAsyncThunk(
    "get/vehicle",
    async({id, name, description, price, imageURL}: Vehicle) => {
        try {
            const url = `https://localhost:7054/api/Vehicle/${id}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            
        }
    }
)
  

export const createVehicle = createAsyncThunk(
    "vehicle/create",
    async ({ categoryId, name, description, price, imageURL }: CreateVehicleForm) => {
      const token:any = localStorage.getItem('token');
      const authHeader = 'Bearer ' + token;
      const response = await axios.post(`https://localhost:7054/api/Vehicle?categoryId=${categoryId}`,
        {
          name,
          description,
          price,
          imageURL,
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


  export const removeVehicle = createAsyncThunk(
    "vehicle/remove",
    async ({ vehicleId }: VehicleId) => {
      const token:any = localStorage.getItem('token');
      const authHeader = 'Bearer ' + token;
        const response = await axios.delete(`https://localhost:7054/api/Vehicle/${vehicleId}`, {
          headers: { Authorization: authHeader }
        });
        return response.data;
    }
  )


  export const updateVehicle = createAsyncThunk(
    'vehicle/update',
    async ({vehicleId, name, description, price, imageURL}: UpdateVehicle) => {
      const token:any = localStorage.getItem('token');
      const authHeader = 'Bearer ' + token;
      const response = await axios.put(`https://localhost:7054/api/Vehicle/${vehicleId}`, {
        vehicleId,
        name, 
        description, 
        price, 
        imageURL
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

const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
    },
    extraReducers :(builder) => {
        builder.addCase(getAllVehicles.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllVehicles.fulfilled, (state, action) => {
            state.loading = false;
            state.vehicle = action.payload;
        });
        builder.addCase(getAllVehicles.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(getVehicle.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getVehicle.fulfilled, (state, action) => {
            state.loading = false;
            state.vehicle.find((v: Vehicle )=> v.id);
        });
        builder.addCase(getVehicle.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(createVehicle.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(createVehicle.fulfilled, (state, action) => {
          state.loading = false;
          state.vehicle = action.payload;
        });
        builder.addCase(createVehicle.rejected, (state) => {
          state.loading = false;
        });


          builder.addCase(removeVehicle.pending, (state) => {
        state.loading = true;
      })
          builder.addCase(removeVehicle.fulfilled, (state, action) => {
        state.loading = false;
        const vehicleId = action.meta.arg.vehicleId;
        state.vehicle = state.vehicle.filter(
          (vehicle) => vehicle.id !== vehicleId
        );
      })
          builder.addCase(removeVehicle.rejected, (state, action) => {
        state.loading = false;
      });


      builder.addCase(updateVehicle.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(updateVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicle = action.payload;
      });
      builder.addCase(updateVehicle.rejected, (state) => {
        state.loading = false;
      });
    }
});




export default vehicleSlice.reducer; 