import { Button, Container } from "@mantine/core"

export default function Landing(){
    if(localStorage.getItem("token")){
        return(<h1>My Documents</h1>)
    } else {
        return(
        <div className=""><Container>
            <h1>Privacy Policy Analysis Framework</h1>
            <p>Empowering intelligent privacy policy understanding and documentation...</p>

            <Button>Get Started</Button>
        </Container></div>)
    }
}