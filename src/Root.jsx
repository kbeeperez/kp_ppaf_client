import { useState } from 'react'
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from "react-router-dom";

export default function Root() {
  const [opened, { toggle }] = useDisclosure();
  const signedIn=localStorage.getItem("token")

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <div className='logo'><h1>PPAF @ LSU</h1></div>
      </AppShell.Header>

      {signedIn && (
      <AppShell.Navbar></AppShell.Navbar>
      )}

      <AppShell.Main><Outlet/></AppShell.Main>
    </AppShell>
  );
}