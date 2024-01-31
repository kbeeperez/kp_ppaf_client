import { useState } from 'react'
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure, useForceUpdate } from '@mantine/hooks';
import { Outlet, useOutletContext } from "react-router-dom";
import Landing from './components/Landing';
import Header from './components/Header';
import axios from 'axios';

export default function Root() {
  let forceRefresh = useForceUpdate()
  const signedIn=localStorage.getItem("token")

  if (signedIn) {
    axios.defaults.headers.common = {'Authorization': `Bearer ${signedIn}`}
  } else {
    axios.defaults.headers.common = {}
  }

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