import { Accordion, AccordionItem, AccordionPanel, Container, Grid, GridCol, List, ListItem, Paper, ScrollArea, Text, Title } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Document(){
    if (localStorage.getItem("token")) {
        let { id } = useParams();
        let [documents, setDocuments] = useState(undefined)
        let [baseAnalysis, setBaseAnalysis] = useState(undefined)

        useEffect(() => {
            axios.get("/document/"+id,).then((res) => {
                setDocuments(res.data)
            })
        }, [])

        useEffect(()=>{
            axios.get("/document/"+id+"/analyses").then((res)=>{
                axios.get("/analysis/singular/"+res.data.find((x)=>{return x.kind=="BASE"}).id).then((base)=>{
                    setBaseAnalysis(base.data)
                })
            })
        }, [documents])

        const baseContents = baseAnalysis?.contents

        const base = baseContents != undefined ? JSON.parse(baseContents) : null

        const items = [
            {
                value: 'Base Summary',
                description: base?.summary
            },
            {
                value: 'Raw Document',
                description: documents?.contents?.replace("\n", "")
            }
        ]

        const accordionItems = items.map((item) => (
            <Accordion.Item key={item.value} value={item.value}>
              <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
              <Accordion.Panel><ScrollArea h={250}>{item.description}</ScrollArea></Accordion.Panel>
            </Accordion.Item>
        ));

        return (
            <Container size="md" mt="lg" p="md">
                <Paper shadow="sm" mb="md" >
                    <Container size="md" pb="md" >
                        <Title order={1}>{documents?.title}</Title>
                        <Text mt="sm" mb="md" c="dimmed" fz="xs">
                        {`${documents?.contents?.split(" ").length + " words"} • `}
                        </Text>
                        <Title order={2} mb="md">{documents?.title}</Title>
                        <Grid columns={2}>
                            <GridCol span={1}>
                                <Paper p="sm" shadow="xs">
                                <Title order={4} c="dimmed" fw={400}>Collected Information Scopes</Title>
                                <List p="xs">
                                    {base?.scopes.map((scope=>{return <ListItem>{scope}</ListItem>}))}
                                </List>
                                </Paper>
                            </GridCol>
                            <GridCol span={1}>
                                <Paper p="sm" shadow="xs">
                                    <Title order={4} c="dimmed" fw={400}>Document Status</Title>
                                </Paper>
                            </GridCol>
                        </Grid>
                        <h2>Analyses</h2>                        
                            <Accordion variant="separated" defaultValue="Base Summary">
                            {accordionItems}
                            </Accordion>
                    </Container>
                </Paper>
            </Container>
        )
    }
}