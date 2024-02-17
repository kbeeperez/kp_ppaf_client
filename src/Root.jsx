import { useState } from 'react'
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure, useForceUpdate } from '@mantine/hooks';
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import Landing from './components/Landing';
import Header from './components/Header';
import axios from 'axios';

export default function Root() {
  let forceRefresh = useForceUpdate()
  let navigate = useNavigate()
  const signedIn=localStorage.getItem("token")

  if (signedIn) {
    axios.defaults.headers.common = {'Authorization': `Bearer ${signedIn}`}
  } else {
    axios.defaults.headers.common = {}
  }

  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    if(error.response.status == 401){
      localStorage.removeItem("token")
      navigate("/")
      forceRefresh()
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  return (
    <>
      {(!!signedIn &&
      <div className='flex'>
        <Header signedIn={signedIn}/>
        <Outlet context={forceRefresh}/>
      </div>)}
      {(!!!signedIn &&
      <div className='row'>
        <Header signedIn={signedIn}/>
        <Outlet context={forceRefresh}/>
      </div>)}
    </>
  )
}