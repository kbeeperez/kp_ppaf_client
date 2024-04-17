import { Accordion, Button, Container, Divider, Grid, GridCol, Input, Paper, Text, TextInput, Title, rem } from "@mantine/core"
import axios from "axios"
import { useEffect, useState } from "react"
import DocumentStatsCard from "./DocumentStatsCard"
import AnalysesCard from "./AnalysesCard"
import { Form } from "react-router-dom"
import { useToggle } from "@mantine/hooks"
import { IconMoodSad } from "@tabler/icons-react"
import "../assets/styles/Analyses.css"

export default function Analyses({cards}) {
    if (localStorage.getItem("token")) {
        let [documents, setDocuments] = useState([])
        let [user, setUser] = useState(undefined)

        let [toggleState, toggle] = useToggle();

        let [title, setTitle] = useState("")
        let [url, setUrl] = useState("")

        let[selectedPrime, setPrime] = useState("")
        let[selectedSec, setSec] = useState("")

        const handleSelect = (data) => {
                if (!selectedPrime && data != selectedSec) {
                    setPrime(data);
                  console.log("First card selected:", data);
                } else if (!selectedSec && data !== selectedPrime) {
                    setSec(data);
                  console.log("Second card selected:", data);
                } else {
                  console.log("Card already selected or both selections are made");
                }
              };

        useEffect(() => {
            axios.get("/document/",).then((res) => {
                setDocuments(res.data)
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
            <Container size={"lg"} p={"md"} style={{background:""}}>
                {/* main container ^ */}
                <Title order={1} pt={"lg"} c={"black"}>Analyses</Title>
                <Divider/>
                <Title order={2} py={"lg"} c={"black"}>Create a new analysis </Title>
                <Text>Pick two documents to analyze against each other.</Text>

                {/* container to hold primary and secondary documents */}
                <Container size={"sm"} p={""} mt={"lg"} justify="right" style={{background:""}}>

                    <Grid p={"md"} justify="space-between" align="flex-start" style={{background:""}}>
                    <GridCol align="center" span={4}>
                        <Text className="text-title" align='center' fw={700} >PRIMARY</Text>
                        <Divider/>
                        <Button mt={"8px"} radius={"xl"} color="#c92a2a" onClick={() => setPrime("")}>Remove</Button>
                    </GridCol>
                    <GridCol align="center" span={4}>
                        <Text className="text-title" align='center' fw={700} >SECONDARY</Text>
                        <Divider/>
                        <Button mt={"8px"} radius={"xl"} color="#c92a2a" onClick={() => setSec("")} >Remove</Button>
                    </GridCol>
                    </Grid>

                    <Grid p={"md"} justify="space-between" align="flex-start" style={{background:""}}> 
                        <GridCol className="grid-box" span="content"><AnalysesCard data={selectedPrime} refreshHandler={toggle} onSelect={handleSelect} /></GridCol>
                        <GridCol className="grid-box" span="content"><AnalysesCard data={selectedSec} refreshHandler={toggle} onSelect={handleSelect} /></GridCol>
                    </Grid>

                    <Button radius={"xl"} fullWidth my={"md"} onClick={submit}> Analyze</Button>
                </Container>
                

                <Title order={3} py={"lg"} c={"black"}>{user?.name}'s Documents</Title>
                <Divider/>

                <Grid py={"lg"} style={{background:""}}>
                    { documents.length >= 1 ? documents.map( (item) => { 
                        return <GridCol span={{base: 12, xs:4 }}>
                            <DocumentStatsCard data={item} refreshHandler={toggle} onSelect={handleSelect} />
                        </GridCol>
                    }) :
                    ( <GridCol span={{ base:12, xs: 12 }}>
                        <Paper withBorder p={"sm"}>
                            <Text fz={"xl"} c="dimmed">
                                Its lonely! Create an analyses.
                            </Text>
                        </Paper>
                    </GridCol>)
                }


                
                </Grid>

            </Container>
        )
            
    }
}