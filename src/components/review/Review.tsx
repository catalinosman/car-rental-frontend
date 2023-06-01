import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getReviewsByVehicle } from '../../features/reviews/reviewSlice';
import { Review } from "../../types";
import { Link, useParams } from 'react-router-dom';
import RemoveReviewButton from './RemoveReviewButton';
import jwt_decode from 'jwt-decode'

const Reviews = () => {
    const reviews = useSelector(
        (state: RootState) => state.review.review as Review[]
    );

    const token:any = localStorage.getItem?.('token');
    let userRole:any = null;
  if (token) {
    const decodedToken: any = jwt_decode(token);
    console.log(decodedToken);
    userRole = decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

    return (
        <>
          {reviews.map((r: Review) => (
            <div key={r.id}>
              <h3>Title: {r.title}</h3>
              <p>{r.description}</p>
              {(userRole === "Admin") ? (<RemoveReviewButton reviewId={r.id}  />) : null}
              <hr></hr>
            </div>
          ))}
        </>
      );
}

export default Reviews;