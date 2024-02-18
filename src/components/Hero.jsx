import { useMantineTheme } from '@mantine/core';
import classes from '../assets/styles/Hero.module.css';

export default function Hero({children, img}){
    const theme = useMantineTheme();

    return(
    <div className={classes.background} style={{backgroundImage: "url('"+img+"')"}}>
        <div className={classes.overlay}>
            {children}
        </div>
    </div>)
}