import React from "react";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { addReview } from "../../features/reviews/reviewSlice";
import { AddReviewForm } from "../../features/reviews/reviewSlice";
import { VehicleId } from "../../features/vehicles/vehicleSlice";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";

const AddReview = ({ vehicleId }: { vehicleId: number | undefined }) => {
  const navigate = useNavigate();  
  const dispatch = useDispatch<AppDispatch>();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AddReviewForm>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      description: ""
    },
  });

  const onSubmit = async (data: AddReviewForm) => {
    await dispatch(addReview({...data, vehicleId}));
    window.location.reload();
    reset();
  };
return (
    <div className="reviewContainer">
      <div>
          <h4 className="addreview">Add Your Review</h4>
        <div>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                type="text"
                id="text"
                label="Review Title"
                {...register("title", { required: true })}
                error={Boolean(errors.title)}
                helperText={errors.title && "*Review title is required"}
              />
              <TextField
                margin="normal"
                fullWidth
                type="text"
                id="text"
                label="Review Description"
                InputProps={{ sx: { height: 120 } }}
                {...register("description", { required: true })}
                error={Boolean(errors.description)}
                helperText={errors.description && "*Description of the review  is required"}
              />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2}}
              >
                Add Review
              </Button>
            </Box>
        </div>
      </div>
    </div>
  );
};

export default AddReview;