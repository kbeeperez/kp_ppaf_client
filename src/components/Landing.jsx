import { Button, Container, Divider, Grid, GridCol, Paper, Text, Title } from "@mantine/core"
import Hero from "./Hero"
import DocumentStatsCard from "./DocumentStatsCard"
import { useEffect, useState } from "react"
import axios from "axios"
import { useToggle } from "@mantine/hooks"
import { IconMoodSmile } from "@tabler/icons-react"
import { Link } from "react-router-dom"

export default function Landing() {
    if (localStorage.getItem("token")) {
        let [recentDocuments, setRecentDocuments] = useState([])

        let [toggleState, toggle] = useToggle();

        useEffect(()=>{
            axios.get("/document/", ).then((res)=>{
                setRecentDocuments(res.data.slice(-3))
            })
        }, [toggleState])

        return (
        <Container size="lg" p="md">
            <Title order={1} pt="lg" c="dark">Overview</Title>
            <Divider/>
            <Title order={2} py="md" c="dimmed">Recent Documents</Title>
            <Grid>
            {recentDocuments.length >= 1 ? recentDocuments.map((item) => { return <GridCol span={{ base: 12, xs: 4 }}><DocumentStatsCard data={item} refreshHandler={toggle}/></GridCol> }) : (<GridCol span={{ base: 12, xs: 12 }}><Paper withBorder p="sm"><Text fz="xl" c="dimmed">Nothing to show... yet. <IconMoodSmile style={{verticalAlign: "bottom"}}/></Text></Paper></GridCol>)}
            </Grid>
        </Container>)
    } else {
        return (
            <Container size="lg">
            <Grid >
                <GridCol span={{ base: 12, xs: 12 }}>
                    <Hero img="https://img.freepik.com/free-vector/modern-design-with-connecting-lines-dots_1048-11911.jpg?w=1380&t=st=1706554358~exp=1706554958~hmac=b87c5e3239a5792c7138ef31f6f1989356278f93fef8c0ae5b315da92373e512">
                        <Container size="lg">
                            <h1>Intelligent Privacy Policy Comprehension and Analysis</h1>
                        </Container>
                    </Hero>
                </GridCol>
                <GridCol span={{ base: 12, xs: 5 }}>
                    <Hero img="https://images.pexels.com/photos/6146929/pexels-photo-6146929.jpeg">
                        <Container size="lg">
                            <h2>Your Information Matters</h2>
                            <Text c="white" size="lg">Privacy protection is not only a responsibility of individuals and organizations; it is a fundamental human right enshrined in various international treaties and conventions. As technology continues to evolve at an unprecedented pace, so too must our efforts to protect privacy. This involves staying informed about emerging threats, adopting best practices, and advocating for stronger regulations. Together, we can build a future where privacy is respected, valued, and protected, enabling everyone to enjoy the benefits of technology while minimizing its risks.</Text>
                        </Container>
                    </Hero>
                </GridCol>
                <GridCol span={{ base: 12, xs: 7 }}>
                    <Hero img="https://images.pexels.com/photos/3469712/pexels-photo-3469712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
                        <Container size="lg">
                           <h2>Be in Control of Your Data</h2>
                           <Text c="white" size="lg">Being aware of what is being done with your data is important for several reasons. Firstly, it helps you understand how your personal information is being used and ensure that it aligns with your expectations and values. Knowledge is power, and having awareness allows you to make informed decisions about which companies and services you choose to engage with. Additionally, being vigilant about your data can help you prevent potential harm, such as identity theft or targeted advertising that infringes upon your privacy. Furthermore, raising awareness about data privacy issues can contribute to creating a societal shift towards prioritizing this fundamental right, driving positive change and fostering a safer digital landscape for all.</Text>
                        </Container>
                    </Hero>
                </GridCol>
                <GridCol span={{ base: 12, xs: 6 }}>
                    <Hero img="https://images.pexels.com/photos/1448561/pexels-photo-1448561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
                        <Container size="lg">
                           <h2>Why PPAF?</h2>
                           <Text c="white" size="lg">PPAF is the intelligent privacy policy summarization and analysis tool that helps you stay informed and make the best decisions for you and your data. Even when privacy policies clearly spell out a companies usage of your data, they are simply too lengthy to read even if is in your best interest. But with AI assisted comprehension and summarization, you can finally be in charge of your information again.</Text>
                        </Container>
                    </Hero>
                </GridCol>
                <GridCol span={{ base: 12, xs: 6 }}>
                    <Hero img="https://images.pexels.com/photos/4792287/pexels-photo-4792287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
                        <Container size="lg">
                           <h2>Take back your Privacy Today</h2>
                           <Text c="white" size="lg">Why wait to start understanding the data collection practices of the entities with whom you engage? From your favorite streaming service to your electrical utility provider everyone is collecting data on you. Find out what data is being collected and how it's used today! </Text>
                           <Divider my="md"/>
                           <Button component={Link} to="/auth">Get Started</Button>
                        </Container>
                    </Hero>
                </GridCol>
            </Grid>
            </Container>
        )
    }
}