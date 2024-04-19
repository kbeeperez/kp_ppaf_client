import { useEffect, useState } from 'react';
import { Container, Group, Burger, useMantineTheme, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../assets/styles/Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Code } from '@mantine/core';
import {
    IconLogout,
    IconSphere,
    IconFileText,
    IconSearch,
} from '@tabler/icons-react';
import navclasses from '../assets/styles/Navbar.module.css';
import "../assets/styles/Footer.css"
import PPAF from '../components/ppaf-logo.png';

const data = [
    { link: '/', label: 'Overview', icon: IconSphere},
    { link: '/documents', label: 'Documents', icon: IconFileText },
    { link: '/analyses', label: 'Analyses', icon: IconSearch }
];

export default function Header({ signedIn }) {
    const theme = useMantineTheme();
    const [active, setActive] = useState('Overview');
    const { pathname } = useLocation();

    useEffect(()=>{
        if (location.href.includes("document")){
            setActive("Documents")
        } else if (location.href.includes("analyses")){
            setActive("Analyses")
        } else {
            setActive("Overview")
        }
    }, [pathname])

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
        <> {/* home page side-navbar */}
            {!!signedIn && (
                <nav className={navclasses.navbar}>
                    <div className={navclasses.navbarMain}>
                        <Group className={navclasses.header} justify="space-between">
                            <Link to="/"><div><img src={PPAF} className={navclasses.logo2}/></div></Link>
                            <Code fw={700}>v3.1.2</Code>
                        </Group>
                        {links}
                    </div>
                    
                    {/* logout */}
                    <div className={navclasses.footer}>
                        <Link to="/auth/out" className={navclasses.link}>
                            <IconLogout className={navclasses.linkIcon} stroke={1.5} />
                            <span>Logout</span>
                        </Link>
                    </div>
                </nav>
            )} {/* landing page navbar */}
            {!!!signedIn && (
                <header className={classes.header}>
                    <Container fluid className={classes.inner}>
                        <Link to="/"><div><img src={PPAF} className={navclasses.logo}/></div></Link>
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