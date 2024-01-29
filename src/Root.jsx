import { useState } from 'react'
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure, useForceUpdate } from '@mantine/hooks';
import { Outlet, useOutletContext } from "react-router-dom";
import Landing from './components/Landing';
import Header from './components/Header';

export default function Root() {
  let forceRefresh = useForceUpdate()
  const signedIn=localStorage.getItem("token")

  return (
    <>
      <Header signedIn={signedIn}/>
      <Outlet context={forceRefresh}/>
    </>
  )
}