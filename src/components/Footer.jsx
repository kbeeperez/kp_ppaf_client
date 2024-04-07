import { Container, Divider, Group, Text } from "@mantine/core"
import { IconBrandInstagram, IconBrandTwitter, IconBrandGithub } from "@tabler/icons-react"
import { useEffect, useState } from "react"

import '../assets/styles/Footer.css';

export default function AboutUs() {
    return (
        <div className="footer">
            
            <div align="center">
            <Container className="main-info" >
                <Group ml={"40%"} pt={"50px"}>
                    <IconBrandInstagram size={40} strokeWidth={1.5} color="white"/>
                    <Divider orientation="vertical" size="md" color="white"/>
                    <IconBrandTwitter size={40} strokeWidth={1.5} color="white"/>
                    <Divider orientation="vertical" size="md" color="white"/>
                    <a href="https://github.com/JustinWoodring/ppaf_client/tree/main" target="_blank"><IconBrandGithub size={40} strokeWidth={1.5} color="white"/></a>
                </Group>
                <Group ml={"30%"}>
                    <h4 className="end-text">How does it work?</h4>
                    <h4 className="end-text">Terms of Use</h4>
                    <h4 className="end-text">Privacy Policy</h4>
                    
                </Group>

                <Text c="white"> PPAF © 2024 </Text>

            </Container>
            </div>
        </div>
    )

}