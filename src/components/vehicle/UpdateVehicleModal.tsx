import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import { UpdateVehicle } from "../../features/vehicles/vehicleSlice";
import { updateVehicle } from "../../features/vehicles/vehicleSlice";

const UpdateVehicleInfo: React.FC<UpdateVehicle> = ({ vehicleId }) => {
  const [vehicleName, setVehicleName] = useState<string>("");
  const [vehicleDescription, setVehicleDescription] = useState<string>("");
  const [vehiclePrice, setVehiclePrice] = useState<number>(0);
  const [vehicleImageURL, setVehicleImageURL] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateVehicle({
        vehicleId,
        name: vehicleName,
        description: vehicleDescription,
        price: vehiclePrice,
        imageURL: vehicleImageURL,
      })
    );
    window.location.reload();
  };
return (
    <div className="updateContainer">
      <h2>Update vehicle</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={vehicleDescription}
            onChange={(e) => setVehicleDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            value={vehiclePrice}
            onChange={(e) => setVehiclePrice(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            value={vehicleImageURL}
            onChange={(e) => setVehicleImageURL(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateVehicleInfo;