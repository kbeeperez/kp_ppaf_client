import { Container, Divider, Group, Text, Title} from "@mantine/core"

import '../assets/styles/AboutUs.css';


export default function AboutUs() {
    return (
    <div className="about-main">
        <div align="center">


        <Title> About PPAF </Title>

        <Container className="box">
        
        <p></p>

        <Text c="black" size="lg" mt={"50px"} mb={"50px"}>
        Privacy Policy Analysis (PPA) is the intelligent privacy policy summarization and analysis tool that helps you stay informed and make the best decisions for you and your data. 
        Even when privacy policies clearly spell out a companies usage of your data, they are simply too lengthy to read even if is in your best interest, but with AI assisted comprehension 
        and summarization, you can finally be in charge of your information again. Privacy protection is not only a responsibility of individuals and organizations; it is a fundamental human right enshrined in various international treaties and conventions. 
        As technology continues to evolve at an unprecedented pace, so too must our efforts to protect privacy. This involves staying informed about emerging threats, adopting best practices, and advocating for stronger regulations.
        Together, we can build a future where privacy is respected, valued, and protected, enabling everyone to enjoy the benefits of technology while minimizing its risks.
        </Text>
        </Container>

        <Title  mb={"50px"}> Meet Our Team! </Title>

        <Container className="box">
        <Divider size="lg" color="black"/>
        <p></p>

        <Group>
        <img src="https://justinwoodring.com/assets/alt-profile-comp.jpg" className="profile-1"/>
        <Divider orientation="vertical" size="md" color="black"/>
        <img src="https://marvel-b1-cdn.bc0a.com/f00000000290274/www.lsu.edu/cybersecurity/images/students/katherineperez.jpg" className="profile-2"/>
        </Group>
        <p></p>


        <Text c="black" size="lg">
            PPAF is a project developed by Justin Woodring (left) and Katherine Perez (right) as part of the <a href="https://csc.lsu.edu/~aligombe/SySec%20Lab.html" target="_blank">Systems Security Lab (SySec)</a> at Louisiana State University (LSU).
            Woodring and Perez are both pursuing the Master's program at LSU and have an avid interest in safeguarding individuals' right to privacy and the cybersecurity field in general.  
        </Text>
        </Container>

        </div>
    </div>


    )
}