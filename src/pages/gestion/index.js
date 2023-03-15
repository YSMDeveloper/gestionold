import Layout from "../../components/layout";
import SubMenu from "../../components/submenu";
import {
    Button,
    Divider,
    Grid,
    Header,
    Icon,
    Segment,
  } from 'semantic-ui-react'
import { useRouter } from "next/router";

export default function Gestion() {

    const router = useRouter();

    const sections = [
        {name: "Usuarios"},
        {name: "Artículos"},
        {name: "Categorías"},
        {name: "Clientes"},
        {name: "Métodos de pago"}
    ]

    const {jsx, activeItem} = SubMenu({Sections: sections});

    return(
        <Layout title="Gestion">
            <h1>Gestión</h1>
            {jsx}
            {activeItem === "Usuarios" ?
            <div>
                <Segment placeholder>
                    <Grid columns={2} stackable textAlign='center'>
                    <Divider vertical>O</Divider>

                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                        <Header icon>
                            <Icon name='pencil' />
                            Gestión de usuarios
                        </Header>

                        <Button primary onClick={() => router.push('/gestion/user')}>Crear</Button>
                        </Grid.Column>

                        <Grid.Column>
                        <Header icon>
                            <Icon name='dashboard' />
                            Estadísticas de usuarios
                        </Header>
                        <Button primary>Crear</Button>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Segment>
            </div>
            : activeItem === "Artículos" ?
            <div>
                <Segment placeholder>
                    <Grid columns={2} stackable textAlign='center'>
                    <Divider vertical>O</Divider>

                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                        <Header icon>
                            <Icon name='pencil' />
                            Gestión de artículos
                        </Header>

                        <Button primary onClick={() => router.push('/gestion/item')}>Crear</Button>
                        </Grid.Column>

                        <Grid.Column>
                        <Header icon>
                            <Icon name='dashboard' />
                            Estadísticas de artículos
                        </Header>
                        <Button primary>Crear</Button>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Segment>
            </div>
            : activeItem === "Categorías" ?
            <div>
                <Segment placeholder>
                    <Grid columns={2} stackable textAlign='center'>
                    <Divider vertical>O</Divider>

                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                        <Header icon>
                            <Icon name='pencil' />
                            Gestión de categorías
                        </Header>

                        <Button primary onClick={() => router.push('/gestion/category')}>Crear</Button>
                        </Grid.Column>

                        <Grid.Column>
                        <Header icon>
                            <Icon name='dashboard' />
                            Estadísticas de categorías
                        </Header>
                        <Button primary>Crear</Button>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Segment>
            </div>
            : activeItem === "Clientes" ?
            <div>
                <Segment placeholder>
                    <Grid columns={2} stackable textAlign='center'>
                    <Divider vertical>O</Divider>

                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                        <Header icon>
                            <Icon name='pencil' />
                            Gestión de clientes
                        </Header>

                        <Button primary onClick={() => router.push('/gestion/customer')}>Crear</Button>
                        </Grid.Column>

                        <Grid.Column>
                        <Header icon>
                            <Icon name='dashboard' />
                            Estadísticas de clientes
                        </Header>
                        <Button primary>Crear</Button>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Segment>
            </div>
            :
            <div>
                <Segment placeholder>
                    <Grid columns={2} stackable textAlign='center'>
                    <Divider vertical>O</Divider>

                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                        <Header icon>
                            <Icon name='pencil' />
                            Gestión de métodos de pago
                        </Header>

                        <Button primary onClick={() => router.push('/gestion/paymentmethod')}>Crear</Button>
                        </Grid.Column>

                        <Grid.Column>
                        <Header icon>
                            <Icon name='dashboard' />
                            Estadísticas de métodos de pago
                        </Header>
                        <Button primary>Crear</Button>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Segment>
            </div>
            }
        </Layout>
    )
}