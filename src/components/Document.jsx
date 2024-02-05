import { Accordion, AccordionItem, AccordionPanel, Badge, Container, Divider, Grid, GridCol, List, ListItem, Paper, ScrollArea, Text, Timeline, TimelineItem, Title } from "@mantine/core";
import { IconCheck, IconScan, IconUpload } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment"

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
                <Paper shadow="sm" mb="md" withBorder >
                    <Container size="md" pb="md" >
                        <Title order={1} pt="lg" c="dark">{documents?.title}</Title>
                        {!!baseAnalysis && ((baseAnalysis.state == "Complete" && (
                            <Badge color="green">Complete</Badge>
                        )) || (baseAnalysis.state == "Failed" && (
                            <Badge color="red">Failed</Badge>
                        )) || (baseAnalysis.state == "In Progress" && (
                            <Badge color="yellow">In Progress</Badge>
                        )) || (baseAnalysis.state == "Pending" && (
                            <Badge color="pending"></Badge>
                        )))}
                        {!!!baseAnalysis && (
                            <Badge color="red">Failed</Badge>
                        )}
                        <Text mt="sm" mb="md" c="dimmed" fz="xs">
                        {`${documents?.contents?.split(" ").length + " words"} • `}
                        </Text>
                        <Divider my="md" />
                        <Title order={2} mb="md" c="dimmed">Details</Title>
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
                                    <Timeline color="purple" active={baseAnalysis?.state == "Complete" ? 1 : 0} bulletSize={24} lineWidth={2} pt="xs">
                                        <TimelineItem bullet={<IconUpload size={12} />} title="Upload">
                                            <Text c="dimmed" size="sm">You submitted this document for analysis.</Text>
                                            <Text size="xs" mt={4}>{moment.duration(moment().diff(documents?.content_access_date)).humanize()} ago</Text>
                                        </TimelineItem>

                                        <TimelineItem bullet={<IconScan size={12} />} title="Base Analysis">
                                            <Text c="dimmed" size="sm">Base Analysis {baseAnalysis?.state}</Text>
                                            <Text size="xs" mt={4}>{moment.duration(moment().diff(baseAnalysis?.analysis_date)).humanize()}</Text>
                                        </TimelineItem>
                                    </Timeline>
                                </Paper>
                            </GridCol>
                        </Grid>
                        <Title order={2} c="dimmed" my="lg">Analyses</Title>                        
                            <Accordion variant="separated" defaultValue="Base Summary">
                            {accordionItems}
                            </Accordion>
                    </Container>
                </Paper>
            </Container>
        )
    }
}