import { useState } from 'react';
import { Container, Group, Burger, useMantineTheme, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../assets/styles/Header.module.css';
import { Link } from 'react-router-dom';


export default function Header({ signedIn }) {
    const theme = useMantineTheme();

    return (
        <header className={classes.header}>
            <Container size="lg" className={classes.inner}>
                <Link to="/"><div className='logo'><h1>PPAF @ LSU</h1></div></Link>
                <Group visibleFrom="sm">
                    {signedIn && (<>
                        <Button variant="default" component={Link} to="/documents">Policies</Button>
                        <Button variant="primary" component={Link} to="/analyses">Analyses</Button></>)
                    }
                </Group>
                <Group visibleFrom="sm">
                    {!signedIn && (<>
                        <Button variant="default" component={Link} to="/auth">Log in</Button>
                        <Button variant="primary" component={Link} to="/auth/create">Create Account</Button></>)
                    }
                    {signedIn && (<>
                        <Button variant="default" component={Link} to="/auth/out">Log out</Button>
                    </>)
                    }
                </Group>
            </Container>
        </header>
    );
}