import { Card, Image, Text, Group, RingProgress, useMantineTheme, Menu, MenuTarget, MenuDropdown, MenuItem, rem } from '@mantine/core';
import classes from '../assets/styles/DocumentStatsCard.module.css';
import { useEffect, useId, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import WordCloud from "wordcloud"
import { IconDotsVertical, IconTrash } from '@tabler/icons-react';
import { useInterval, useToggle } from '@mantine/hooks';

export default function DocumentStatsCard({data, refreshHandler}) {
    let [content, setContent] = useState("")
    let [analyses, setAnalyses] = useState([])
    let [baseAnalysis, setBaseAnalysis] = useState(null)
    let [baseAnalysisContent, setBaseAnalysisContent] = useState(undefined)

    let canvasId = useId()
    let theme = useMantineTheme()

    let [toggleState, toggle] = useToggle();

    let polling = useInterval(()=>{
        toggle()
    },1000)
    
    useEffect(()=>{
        polling.start()
        axios.get("/document/"+data.id).then((res)=>{
            setContent(res.data.contents)
        })

        const list = [["N/A", 30]]
        WordCloud(document.getElementById(canvasId), { list: list, color: ()=>{return theme.colors.gray[parseInt(Math.random()*5*5)]}, backgroundColor: theme.colors.gray[2]  } );
    },[])

    useEffect(()=>{
        axios.get("/document/"+data.id+"/analyses").then((res)=>{
            setAnalyses(res.data)
        })
    }, [toggleState])

    useEffect(()=>{
        let base = analyses.find((item)=>{return item.kind == "BASE"})

        setBaseAnalysis(base)

        if (base?.state == "Complete") {
            polling.stop()
            axios.get("/analysis/singular/"+base.id).then((res)=>{
                let contents = JSON.parse(res.data.contents)
                setBaseAnalysisContent(contents)
                let scopes = contents.scopes.map((scope)=>{return [scope, 20]})
                WordCloud(document.getElementById(canvasId), { list: scopes, color: ()=>{return theme.colors.gray[parseInt(Math.random()*5)]}, backgroundColor: contents.color } );
            })
        }
    }, [analyses])

    const stats = [
        { title: 'Word Count', value: content.split(" ").length + " words" },
        { title: 'Privacy Friendliness Score', value: baseAnalysisContent?.score+'/100' },
    ];

    const items = stats.map((stat) => (
        <div key={stat.title}>
            <Text size="xs" color="dimmed">
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
        <Link to={"/documents/"+data.id} className={classes.link}>
        <Card withBorder padding="lg" className={classes.card} shadow='xs'>
            <Card.Section>
                <canvas
                    className={classes.canvas}
                    height={200}
                    id={canvasId}
                />
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
            </Card.Section>

            <Group justify="space-between" mt="xl">
                <Text fz="sm" fw={700} className={classes.title}>
                    {data.title}
                </Text>
                <Group gap={5}>
                    <Text fz="xs" c="dimmed">
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
            <Text mt="sm" mb="md" c="dimmed" fz="xs">
                {/*56 km this month • 17% improvement compared to last month • 443 place in global scoreboard*/}
            </Text>
            <Card.Section className={classes.footer}>{items}</Card.Section>
        </Card>
        </Link>
    );
}