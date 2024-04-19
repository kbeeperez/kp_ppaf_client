import { Button, Container, Divider, Grid, GridCol, Paper, Text, Title, ScrollArea } from "@mantine/core"
import Hero from "./Hero"
import DocumentStatsCard from "./DocumentStatsCard"
import { useEffect, useState } from "react"
import axios from "axios"
import { useToggle } from "@mantine/hooks"
import { IconMoodSmile } from "@tabler/icons-react"
import { Link } from "react-router-dom"


import BackgroundSlideshow from 'react-background-slideshow'
import AboutUs from "./AboutUs"
import Footer from "./Footer"
import '../assets/styles/Landing.css';

export default function Landing() {
    const gallery = Object.values(import.meta.glob('./images/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, as: 'url' }))


    if (localStorage.getItem("token")) {
        let [recentDocuments, setRecentDocuments] = useState([])

        let [toggleState, toggle] = useToggle();

        useEffect(()=>{
            axios.get("/document/", ).then((res)=>{
                setRecentDocuments(res.data.slice(-3))
            })
        }, [toggleState])

        return (
        <Container size="lg" p="md">
            <Title order={1} pt="lg" c="dark">Overview</Title>
            <Divider/>
            <Title order={2} py="md" c="dimmed">Recent Documents</Title>
            <Grid>
            {recentDocuments.length >= 1 ? recentDocuments.map((item) => { return <GridCol span={{ base: 12, xs: 4 }}><DocumentStatsCard data={item} refreshHandler={toggle}/></GridCol> }) : (<GridCol span={{ base: 12, xs: 12 }}><Paper withBorder p="sm"><Text fz="xl" c="dimmed">Nothing to show... yet. <IconMoodSmile style={{verticalAlign: "bottom"}}/></Text></Paper></GridCol>)}
            </Grid>
        </Container>)
    } else {
        return ( 
            <div className="main-con">
                <ScrollArea h={780}>

                <div>
                    {/*TO-DO:
                    - more pcitures?
                    - add overlay for text
                    - either have diffrent text on each image or sliding/changing text 
                    */}

                     <BackgroundSlideshow images={gallery} duration={2}/>
                    
                </div>
                </ScrollArea>

                <div>
                    <AboutUs/>
                </div>

                <div>
                    <Footer/>
                </div>
            </div>

        )
    }
}