import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";


import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton'
import { removeReview } from "../../features/reviews/reviewSlice";
import { ReviewId } from "../../features/reviews/reviewSlice";

const RemoveReviewButton: React.FC<ReviewId> = ({reviewId}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveReview = async () => {
    dispatch(removeReview({reviewId}));
   // window.location.reload();
  };


  return  <IconButton aria-label="delete" size="large" onClick={handleRemoveReview}>
  <DeleteIcon fontSize="inherit" />
</IconButton>;
};

export default RemoveReviewButton;