import { Button, Container } from "@mantine/core"
import Hero from "./Hero"

export default function Landing() {
    if (localStorage.getItem("token")) {
        return (<h1>My Documents</h1>)
    } else {
        return (
            <><Hero>
                <Container size="lg">
                    <h1>Intelligent Privacy Policy Comprehension and Analysis</h1>
                </Container>
            </Hero>
            <Container size="lg">
                <p>Empowering intelligent privacy policy understanding and documentation...</p>
                <Button>Get Started</Button>
            </Container>
            </>
        )
    }
}