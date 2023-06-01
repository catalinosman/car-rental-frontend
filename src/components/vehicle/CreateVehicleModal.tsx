import React from "react";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { createVehicle } from "../../features/vehicles/vehicleSlice"
import { CreateVehicleForm } from "../../features/vehicles/vehicleSlice";

const CreateVehicleModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateVehicleForm>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      categoryId: 0,
      name: "",
      description: "",
      price: 0,
      imageURL: "",
    },
  });

  const onSubmit = async (data: CreateVehicleForm) => {
    await dispatch(createVehicle(data));
    window.location.reload();
    reset();
  };
return (
    <div className="createContainer">
      <div>
        <div>
          <h2>Create Vehicle</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="categoryId">Category Id</label>
              <input
                type="categoryId"
                id="categoryId"
                {...register("categoryId", { required: true })}
              />
              {errors.price && <span>Price is required</span>}
            </div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                {...register("name", { required: true })}
              />
              {errors.name && <span>Name is required</span>}
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                {...register("description", { required: true })}
              />
              {errors.description && <span>Description is required</span>}
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                type="price"
                id="price"
                {...register("price", { required: true })}
              />
              {errors.price && <span>Price is required</span>}
            </div>
            <div>
              <label htmlFor="imageURL">Image</label>
              <input
                type="imageURL"
                id="imageURL"
                {...register("imageURL", { required: true })}
              />
              {errors.imageURL && <span>Image url is required</span>}
            </div>
            <button type="submit" className="createButton">Create Vehicle</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateVehicleModal;