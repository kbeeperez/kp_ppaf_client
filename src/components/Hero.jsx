import { useMantineTheme } from '@mantine/core';
import classes from '../assets/styles/Hero.module.css';

export default function Hero({children}){
    const theme = useMantineTheme();

    return(
    <div className={classes.background}>
        <div className={classes.overlay}>
            {children}
        </div>
    </div>)
}