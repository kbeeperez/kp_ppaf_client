import { Accordion, Box, Button, Checkbox, Container, Divider, Grid, GridCol, Input, Paper, Stack, Text, TextInput, Title, rem } from "@mantine/core"
import axios from "axios"
import { useEffect, useState } from "react"
import DocumentStatsCard from "./DocumentStatsCard"
import AnalysesCard from "./AnalysesCard"
import { Form } from "react-router-dom"
import { useToggle } from "@mantine/hooks"
import { IconMoodSad } from "@tabler/icons-react"
import "../assets/styles/Analyses.css"

export default function Analyses({}) {
    if (localStorage.getItem("token")) {
        let [documents, setDocuments] = useState([])
        let [user, setUser] = useState(undefined)

        let [toggleState, toggle] = useToggle();

        let[selectedPrime, setPrime] = useState("")
        let[selectedSec, setSec] = useState("")

        let [kind, setKind] = useState("")
        let [checkedWRT, setCheckedWRT] = useState(false)
        let [checkedREV, setCheckedREV] = useState(false)

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
            axios.post("/analysis/", {
                document_id_primary: selectedPrime.id,
                document_id_secondary: selectedSec.id,
                kind: kind
            }).then((res)=>{
                console.log(res)
                toggle()
            })
        }


        return (
            <Container size={"lg"} p={"md"}>
                {/* main container ^ */}
                <Title order={1} pt={"lg"} c={"black"}>Analyses</Title>
                <Divider/>
                <Title order={2} py={"lg"} c={"black"}>Create a new analysis </Title>
                <Text>Pick two documents to analyze against each other and what kind of analysis.</Text>

                {/* container to hold primary and secondary documents */}
                <Container size={"md"} mt={"lg"}  style={{background:""}}>

                    {/* grid holds: primary + secondary text + removal buttons */}
                    <Grid p={"md"} justify="space-between" align="flex-start">
                    <GridCol align="center" span={4}>
                        <Text className="text-title" align='center' fw={700} >PRIMARY</Text>
                        <Divider/>
                        <Button mt={"8px"} radius={"xl"} color="#c92a2a" onClick={() => setPrime("")}>Remove document</Button>
                    </GridCol>
                    <GridCol align="center" span={4}>
                        <Text className="text-title" align='center' fw={700} >SECONDARY</Text>
                        <Divider/>
                        <Button mt={"8px"} radius={"xl"} color="#c92a2a" onClick={() => setSec("")} >Remove document</Button>
                    </GridCol>
                    </Grid>
                     {/* grid holds: placeholder cards + anlysis selection */}
                    <Grid p={"md"} justify="space-between" align="flex-start" style={{background:""}}> 
                        <GridCol className="grid-box" span={4}><AnalysesCard data={selectedPrime} refreshHandler={toggle} /></GridCol>
                        <GridCol span="content" style={{background:""}}>

                            <Box className="check-size" style={{background: ""}}>
                                <Checkbox
                                checked={checkedWRT}
                                label="WRT analysis" ml={"sm"}
                                description=" 'With Respect To' performs an
                                analysis which cross examines the provisions of one document
                                based on another."
                                onChange={(event) => {setCheckedWRT(true); setCheckedREV(false); setKind("WRT")}}
                                />
                                <Checkbox 
                                checked={checkedREV}
                                label="Revision analysis" mt={"md"} ml={"sm"}
                                description="Performs a revision analysis between a
                                newer and older version of a privacy policy. "
                                onChange={(event) => {setCheckedREV(true); setCheckedWRT(false); setKind("REV")}}/>
                            </Box>
                                
                        </GridCol>
                        <GridCol className="grid-box" span={4}><AnalysesCard data={selectedSec} refreshHandler={toggle}/></GridCol>
                    </Grid>

                    <Button radius={"xl"} fullWidth my={"md"} onClick={submit}> Analyze</Button>
                </Container>
                

                <Title order={3} py={"lg"} c={"black"}>{user?.name}'s Documents</Title>
                <Divider/>

                <Grid py={"lg"}>
                    { documents.length >= 1 ? documents.map( (item) => { 
                        return <GridCol span={{base: 12, xs:4 }}>
                            <DocumentStatsCard data={item} refreshHandler={toggle} onSelect={handleSelect} />
                        </GridCol>
                    }) :
                    ( <GridCol span={{ base:12, xs: 12 }}>
                        <Paper withBorder p={"sm"}>
                            <Text fz={"xl"} c="dimmed">
                                It's lonely! Create an analysis.
                            </Text>
                        </Paper>
                    </GridCol>)
                }
                </Grid>
            </Container>
        )
            
    }
}