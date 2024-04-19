import { Card, Text, Group, RingProgress, useMantineTheme, CardSection, Menu, MenuTarget, MenuDropdown, MenuItem, rem } from '@mantine/core';
import classes from '../assets/styles/DocumentStatsCard.module.css';
import { useEffect, useId, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import WordCloud from "wordcloud"
import { IconDotsVertical, IconTrash } from '@tabler/icons-react';
import { useInterval, useToggle } from '@mantine/hooks';
import "../assets/styles/Analyses.css"

export default function AnalysesCard({data, refreshHandler}) {
    const location = useLocation();
    let [content, setContent] = useState("")
    let [analyses, setAnalyses] = useState([])
    let [baseAnalysis, setBaseAnalysis] = useState(null)
    let [baseAnalysisContent, setBaseAnalysisContent] = useState(undefined)


    let theme = useMantineTheme()

    let [toggleState, toggle] = useToggle();

    let polling = useInterval(()=>{
        toggle()
    },1000)

    console.log(data)
    console.log(axios.get("/analysis/"))
    


    const stats = [
        { title: 'Word Count', value: content.split(" ").length + " words" },
        { title: 'Privacy Friendliness Score', value: baseAnalysisContent?.score+'/100' },
    ];

    const items = stats.map((stat) => (
        <div key={stat.title}>
            <Text size="xs" c="dimmed">
                {stat.title}
            </Text>
            <Text fw={500} size="sm">
                {stat.value}
            </Text>
        </div>
    ));

    const deleteCard = () => {
        axios.delete("/document/"+data.id).then((res)=>{refreshHandler()})
    }


    return (
        <Card withBorder padding="lg" className={classes.card} shadow='xs'>
            <CardSection>
                <canvas height={50} width={100}/>
                {location.pathname == "/documents" &&
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
                }
            </CardSection>

            <Group justify="space-between" mt="xl">
                <Text fz="sm" fw={700} className={classes.title } >
                    {data.title}
                </Text>
                <Group gap={5}  mb={"2px"}>
                    <Text fz="xs" c="dimmed" mt={"2px"} >
                        Analysis {!!baseAnalysis && (
                            baseAnalysis.state
                        )}{!!!baseAnalysis && (
                            "Pending"
                        )}
                    </Text>
                    {!!baseAnalysis && ((baseAnalysis.state == "Complete" && (
                            <RingProgress size={18} thickness={2} sections={[{ value: 100, color: 'green' }]} />
                        )) || (baseAnalysis.state == "Failed" && (
                            <RingProgress size={18} thickness={2} sections={[{ value: 100, color: 'red' }]} />
                        )) || (baseAnalysis.state == "In Progress" && (
                            <RingProgress size={18} thickness={2} sections={[{ value: 50, color: 'yellow' }]} />
                        )) || (baseAnalysis.state == "Pending" && (
                            <RingProgress size={18} thickness={2} sections={[{ value: 0, color: 'yellow' }]} />
                        )))}
                        {!!!baseAnalysis && (
                            <RingProgress size={18} thickness={2} sections={[{ value: 0, color: 'red' }]} />
                        )}
                </Group>
            </Group>
             <Card.Section className={classes.footer}>{items}</Card.Section>
        </Card>
    );
}