import { Button, Container, Divider, Grid, GridCol, Paper, Text, Title } from "@mantine/core"
import Hero from "./Hero"
import DocumentStatsCard from "./DocumentStatsCard"
import { useEffect, useState } from "react"
import axios from "axios"
import { useToggle } from "@mantine/hooks"
import { IconMoodSmile } from "@tabler/icons-react"
import { Link } from "react-router-dom"

export default function Landing() {
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
            <><Hero>
                <Container size="lg">
                    <h1>Intelligent Privacy Policy Comprehension and Analysis</h1>
                </Container>
            </Hero>
            <Container size="lg">
                <p>Empowering intelligent privacy policy understanding and documentation...</p>
                <Button component={Link} to="/auth">Get Started</Button>
            </Container>
            </>
        )
    }
}