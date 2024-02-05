import { useState } from 'react';
import { Container, Group, Burger, useMantineTheme, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../assets/styles/Header.module.css';
import { Link } from 'react-router-dom';
import { Code } from '@mantine/core';
import {
    IconLogout,
    IconSphere,
    IconFileText,
    IconSearch,
} from '@tabler/icons-react';
import navclasses from '../assets/styles/Navbar.module.css';

const data = [
    { link: '/', label: 'Overview', icon: IconSphere},
    { link: '/documents', label: 'Documents', icon: IconFileText },
    { link: '/analyses', label: 'Analyses', icon: IconSearch }
];

export default function Header({ signedIn }) {
    const theme = useMantineTheme();
    const [active, setActive] = useState('Overview');

    const links = data.map((item) => (
        <Link
            className={navclasses.link}
            data-active={item.label === active || undefined}
            to={item.link}
            key={item.label}
        >
            <item.icon className={navclasses.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>));

    return (
        <>
            {!!signedIn && (
                <nav className={navclasses.navbar}>
                    <div className={navclasses.navbarMain}>
                        <Group className={navclasses.header} justify="space-between">
                            <div className='logo'><h1>PPAF @ LSU</h1></div>
                            <Code fw={700}>v3.1.2</Code>
                        </Group>
                        {links}
                    </div>

                    <div className={navclasses.footer}>
                        <Link to="/auth/out" className={navclasses.link}>
                            <IconLogout className={navclasses.linkIcon} stroke={1.5} />
                            <span>Logout</span>
                        </Link>
                    </div>
                </nav>
            )}
            {!!!signedIn && (
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
                </header>)}
        </>
    );
}