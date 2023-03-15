import { Card, Icon, Image } from "semantic-ui-react";
import Layout from "../components/layout";

export default function UserProfile() {
    return (
        <Layout>
            <h1>Perfil</h1>
            <Card>
                <Image src='../../public/favicon.ico' wrapped ui={false} />
                <Card.Content>
                <Card.Header>Matthew</Card.Header>
                <Card.Meta>
                    <span className='date'>Joined in 2015</span>
                </Card.Meta>
                <Card.Description>
                    Matthew is a musician living in Nashville.
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <a>
                    <Icon name='user' />
                    22 Friends
                </a>
                </Card.Content>
            </Card>
        </Layout>  
    )
    
}