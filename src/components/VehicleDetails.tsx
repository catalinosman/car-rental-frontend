import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { Vehicle } from '../types';
import { Link, useParams } from 'react-router-dom';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import Review from './review/Review';
import AddReview from './review/AddReview';
import { VehicleId, getVehicle } from '../features/vehicles/vehicleSlice';
import jwt_decode from 'jwt-decode';

const VehicleDetails = () => {
  let { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const vehicle = useSelector((state: RootState) => 
      state.vehicle.vehicle.find((v: Vehicle) => v.id === Number(id))
  );

  
  useEffect(()=>{
    dispatch(getVehicle({
      name: vehicle?.name,
      id: vehicle?.id,
      description: vehicle?.description,
      price: vehicle?.price,
      imageURL: vehicle?.imageURL
    }))
  }, [dispatch])

  const token:any = localStorage.getItem?.('token');
    let userRole:any = null;
  if (token) {
    const decodedToken: any = jwt_decode(token);
    console.log(decodedToken);
    userRole = decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }
  
  return (
    <div >
      <span className="mainDiv">
      <img src={vehicle?.imageURL} className="vehicleImg" />
    <div className="details">
      <h2>{vehicle?.name}</h2>
      <p>{vehicle?.description}</p>
      <p>Price : {vehicle?.price} $</p>
    </div>   
      </span>
      <div>
      {token ? (
        <AddReview vehicleId={vehicle?.id}/>) : null}
      </div>
       <div className="reviews">
      <h3 className="revSection">Reviews section : </h3> 
       <Review />
      </div>
      <div className="backButtonContainer">
      </div>
    </div>
  );
};

export default VehicleDetails;


