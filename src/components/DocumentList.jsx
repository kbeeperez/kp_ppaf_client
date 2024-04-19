import { Button, Container, Divider, Grid, GridCol, Input, Paper, Text, TextInput, Title, rem } from "@mantine/core"
import axios from "axios"
import { useEffect, useState } from "react"
import DocumentStatsCard from "./DocumentStatsCard"
import { Form } from "react-router-dom"
import { useToggle } from "@mantine/hooks"
import { IconMoodSad } from "@tabler/icons-react"
import AnalysesCard from "./AnalysesCard"

export default function DocumentList() {
    if (localStorage.getItem("token")) {
        let [documents, setDocuments] = useState([])
        let [analyses, setAnalyses] = useState([])
        let [user, setUser] = useState(undefined)

        let [toggleState, toggle] = useToggle();

        let [title, setTitle] = useState("")
        let [url, setUrl] = useState("")

        useEffect(() => {
            axios.get("/document/",).then((res) => {
                setDocuments(res.data)
            })

            axios.get("/analysis/").then((res) => {
                setAnalyses(res.data)
            })

            axios.get("/user/me").then((res)=>{
                setUser(res.data)
            })
        }, [toggleState])

        const submit = (e) =>{
            axios.post("/document/", {
                title: title,
                url: url
            }).then((res)=>{
                toggle()
            })
        }

        return (
            <Container size="lg" p="md">
                <Title order={1} pt="lg" c="dark">Documents</Title>
                <Divider/>
                <Title order={2} py="md" c="dimmed">New Document</Title>
                <Container size={"lg"}>
                    <Form size={"lg"} onSubmit={submit}>
                    <Container size={"lg"} mb="sm">
                    <TextInput
                    style={{display: "inline", width: rem(5)}}
                    type="text"
                    label="Document Name"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder="Example Privacy Policy"/>
                    </Container>
                    <Container size={"lg"}>
                    <TextInput
                    type="text"
                    value={url}
                    label="Access URL"
                    onChange={(e)=>setUrl(e.target.value)}
                    placeholder="https://privacy.policies.matter"
                    rightSection={<Button type="submit">Analyze</Button>}
                    rightSectionWidth={90}
                    />
                    </Container>
                    </Form>
                </Container>
                <Title order={2} py="md" c="black">{user?.name}'s Documents</Title>
                <Grid mb={"lg"}>
                    {documents.length >= 1 ? documents.map((item) => { return <GridCol span={{ base: 12, xs: 4 }}><DocumentStatsCard data={item} refreshHandler={toggle}/></GridCol> }) : (<GridCol span={{ base: 12, xs: 12 }}><Paper withBorder p="sm"><Text fz="xl" c="dimmed">It's lonely in here... <IconMoodSad style={{verticalAlign: "bottom"}}/></Text><Text fz="md" c="dimmed">Add a new document to get started</Text></Paper></GridCol>)}
                </Grid>
                <Divider/>
                <Title order={2} py="md" c="black">{user?.name}'s Analyses</Title>
                <Grid>
                    {analyses.length >= 1 ? analyses.map((item) => { return <GridCol span={{ base: 12, xs: 4 }}><AnalysesCard data={item} refreshHandler={toggle}/></GridCol> }) : (<GridCol span={{ base: 12, xs: 12 }}><Paper withBorder p="sm"><Text fz="xl" c="dimmed">It's lonely in here... <IconMoodSad style={{verticalAlign: "bottom"}}/></Text><Text fz="md" c="dimmed">Create a new analysis to get started!</Text></Paper></GridCol>)}
                </Grid>

            </Container>)
    }
}