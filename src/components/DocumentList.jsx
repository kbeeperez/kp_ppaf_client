import { Container, Grid, GridCol } from "@mantine/core"
import axios from "axios"
import { useEffect, useState } from "react"
import DocumentStatsCard from "./DocumentStatsCard"

export default function DocumentList() {
    if (localStorage.getItem("token")) {
        let [documents, setDocuments] = useState([])

        useEffect(() => {
            axios.get("/document/",).then((res) => {
                setDocuments(res.data)
            })
        }, [])

        return (
            <Container size="lg">
                <h1>My Documents</h1>
                <Grid>
                    {documents.map((item) => { return <GridCol span={{ base: 12, xs: 4 }}><DocumentStatsCard data={item} /></GridCol> })}
                </Grid>
            </Container>)
    }
}