import { Accordion, AccordionItem, AccordionPanel, Badge, Container, Divider, Grid, GridCol, List, ListItem, Menu, MenuDropdown, MenuItem, MenuTarget, Paper, ScrollArea, Text, Timeline, TimelineItem, Title, rem } from "@mantine/core";
import { IconCheck, IconDotsVertical, IconScan, IconTrash, IconUpload } from "@tabler/icons-react";
import axios from "axios";
import classes from '../assets/styles/Document.module.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

export default function Document(){
    if (localStorage.getItem("token")) {
        let { id } = useParams();
        let [documents, setDocuments] = useState(undefined)
        let [baseAnalysis, setBaseAnalysis] = useState(undefined)
        let [gdprAnalysis, setGdprAnalysis] = useState(undefined)
        let navigate = useNavigate()

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
                axios.get("/analysis/singular/"+res.data.find((x)=>{return x.kind=="GDPR"}).id).then((gdpr)=>{
                    setGdprAnalysis(gdpr.data)
                })
            })
        }, [documents])

        const deleteCard = () => {
            axios.delete("/document/"+id).then((res)=>{
                navigate("/documents")
            })
        }

        const baseContents = baseAnalysis?.contents
        const gdprContents = gdprAnalysis?.contents

        const base = baseContents != undefined ? JSON.parse(baseContents) : null
        const gdpr = gdprContents != undefined ? JSON.parse(gdprContents) : null

        const items = [
            {
                value: 'Base Summary',
                description: base?.summary
            },
            {
                value: 'GDPR Summary',
                description: !!!gdpr?.summary ? "Pending..." : gdpr?.summary
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

        console.log('Base:', base);


        return (
            <Container size="md" mt="lg" p="md">
                <Paper shadow="sm" mb="md" withBorder className={classes.document}>
                    <Container size="md" pb="md" >
                        <Title order={1} pt="lg" c="dark">{documents?.title}</Title>
                        <Menu classes={classes.menu} shadow="md" width={100} trigger="hover" onClick={(e)=>e.preventDefault()}>
                            <MenuTarget>
                                <IconDotsVertical className={classes.dots}/>
                            </MenuTarget>
                            <MenuDropdown>
                                <MenuItem
                                color="red"
                                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                onClick={(e)=>{e.stopPropagation(); deleteCard()}}
                                >
                                Delete
                                </MenuItem>
                            </MenuDropdown>
                        </Menu>
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
                        <Divider my="md" color={base?.color} size="xl" />
                        <Title order={2} mb="md" c="dimmed">Details</Title>
                        <Grid columns={2}>
                            <GridCol span={1}>
                                <Paper p="sm" shadow="xs" mb="sm">
                                <Title order={4} fw={600}>Data Shared</Title> {/*COLLECTED INFO*/}
                                <List p="s">
                                {base?.shared}
                                </List>
                                </Paper>
                                <Paper p="sm" shadow="xs" mb="sm">
                                <Title order={4} fw={600}>Data Collected</Title> {/*COLLECTED INFO*/}
                                <List p="xs">
                                {base?.collected}
                                    </List>
                                </Paper>
                                <Paper p="sm" shadow="xs" mb="sm">
                                <Title order={4} fw={600}>Security Practices</Title> {/*COLLECTED INFO*/}
                                <List p="xs">
                                {base?.security}
                                    </List>
                                </Paper>
                            </GridCol>
                            <GridCol span={1}>
                                <Paper p="sm" shadow="xs">
                                    <Title order={4} c="dimmed" fw={400}>Document Status</Title>

                                    <Timeline color="purple" active={baseAnalysis?.state == "Complete" && gdprAnalysis?.state == "Complete" ? 2 : baseAnalysis?.state == "Complete" ? 1 : 0} bulletSize={24} lineWidth={2} pt="xs">
                                        <TimelineItem bullet={<IconUpload size={12} />} title="Upload">
                                            <Text c="dimmed" size="sm">You submitted this document for analysis.</Text>
                                            <Text size="xs" mt={4}>{moment.duration(moment.utc().diff(moment.utc(documents?.content_access_date))).humanize()} ago</Text>
                                        </TimelineItem>

                                        <TimelineItem bullet={<IconScan size={12} />} title="Base Analysis">
                                            <Text c="dimmed" size="sm">Base Analysis {baseAnalysis?.state}</Text>
                                            <Text size="xs" mt={4}>{moment.duration(moment.utc().diff(moment.utc(baseAnalysis?.analysis_date))).humanize()} ago</Text>
                                        </TimelineItem>

                                        <TimelineItem bullet={<IconScan size={12} />} title="GDPR Analysis">
                                            <Text c="dimmed" size="sm">GDPR Analysis {gdprAnalysis?.state}</Text>
                                            <Text size="xs" mt={4}>{moment.duration(moment.utc().diff(moment.utc(gdprAnalysis?.analysis_date))).humanize()} ago</Text>
                                        </TimelineItem>
                                    </Timeline>
                                </Paper>
                            </GridCol>
                            <GridCol span={2}>
                                <Paper p="sm" shadow="xs">
                                    <Title order={4} c="dimmed" fw={400}>GDPR concerns</Title>
                                    <List p="xs">
                                        {gdpr?.inconsistencies.map((inconsistency=>{return <ListItem>{inconsistency}</ListItem>}))}
                                    </List>
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