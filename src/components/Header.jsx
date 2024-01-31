import { useState } from 'react';
import { Container, Group, Burger, useMantineTheme, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../assets/styles/Header.module.css';
import { Link } from 'react-router-dom';
import { Code } from '@mantine/core';
import {
    IconBellRinging,
    IconFingerprint,
    IconKey,
    IconSettings,
    Icon2fa,
    IconDatabaseImport,
    IconReceipt2,
    IconSwitchHorizontal,
    IconLogout,
} from '@tabler/icons-react';
import navclasses from '../assets/styles/Navbar.module.css';

const data = [
    { link: '', label: 'Notifications', icon: IconBellRinging },
    { link: '', label: 'Billing', icon: IconReceipt2 },
    { link: '', label: 'Security', icon: IconFingerprint },
    { link: '', label: 'SSH Keys', icon: IconKey },
    { link: '', label: 'Databases', icon: IconDatabaseImport },
    { link: '', label: 'Authentication', icon: Icon2fa },
    { link: '', label: 'Other Settings', icon: IconSettings },
];

export default function Header({ signedIn }) {
    const theme = useMantineTheme();

    const [active, setActive] = useState('Billing');

    const links = data.map((item) => (
        <a
            className={navclasses.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={navclasses.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>));

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
                        <a href="#" className={navclasses.link} onClick={(event) => event.preventDefault()}>
                            <IconSwitchHorizontal className={navclasses.linkIcon} stroke={1.5} />
                            <span>Change account</span>
                        </a>

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