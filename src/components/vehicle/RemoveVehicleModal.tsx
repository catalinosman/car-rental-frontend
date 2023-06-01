import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import { removeVehicle } from "../../features/vehicles/vehicleSlice";
import { VehicleId } from "../../features/vehicles/vehicleSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton'

const RemoveVehicleButton: React.FC<VehicleId> = ({ vehicleId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveVehicle = async () => {
    dispatch(removeVehicle({ vehicleId }));
    window.location.reload();
  };


  return  <IconButton aria-label="delete" size="large" onClick={handleRemoveVehicle}>
  <DeleteIcon fontSize="inherit" />
</IconButton>;
};

export default RemoveVehicleButton;