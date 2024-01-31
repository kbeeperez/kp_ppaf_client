import { Button, Container, Grid } from "@mantine/core"
import Hero from "./Hero"
import DocumentStatsCard from "./DocumentStatsCard"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Landing() {
    if (localStorage.getItem("token")) {
        let [recentDocuments, setRecentDocuments] = useState([])

        useEffect(()=>{
            axios.get("/document/", ).then((res)=>{
                setRecentDocuments(res.data)
            })
        }, [])

        return (
        <Container size="lg">
            <h1>Recent Documents</h1>
            <Grid>
                {recentDocuments.map((item)=>{return <Grid.Col span={{ base: 12, xs: 4 }}><DocumentStatsCard data={item}/></Grid.Col>})}
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
                <Button>Get Started</Button>
            </Container>
            </>
        )
    }
}