import Layout from "../../../components/layout";
import Item from "../../../components/item";
import { Button, Icon, Menu, Table } from 'semantic-ui-react';
import {useRouter} from 'next/router';
import React from "react";
import {getSession} from "next-auth/react";

export default function Index({items}) {

    const router = useRouter();
    const nodeRef = React.useRef(null);

    return (
        <Layout nodeRef={nodeRef}>
                <h1>Gestión de Artículos</h1>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Código</Table.HeaderCell>
                            <Table.HeaderCell>Nombre</Table.HeaderCell>
                            <Table.HeaderCell>Precio</Table.HeaderCell>
                            <Table.HeaderCell>Cantidad</Table.HeaderCell>
                            <Table.HeaderCell>Categoría</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Editar</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Eliminar</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body >
                        {items && items.map((item) => <Item key={item._id} item={item} showAs="Default"/>)}
                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='7' pageSize="10">
                                <Button
                                    floated='left'
                                    icon
                                    labelPosition='left'
                                    primary
                                    size='large'
                                    onClick={() => router.push('item/new')}
                                >
                                    <Icon name='user' /> Agregar artículo
                                </Button>
                                <Menu floated='right' pagination>
                                    <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                    </Menu.Item>
                                    <Menu.Item as='a'>1</Menu.Item>
                                    <Menu.Item as='a'>2</Menu.Item>
                                    <Menu.Item as='a'>3</Menu.Item>
                                    <Menu.Item as='a'>4</Menu.Item>
                                    <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                    </Menu.Item>
                                </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
        </Layout>
    );
}

export const getServerSideProps = async (context) => {
    const res = await fetch("http://localhost:3000/api/items")
    const items = await res.json();
    const session = await getSession(context)

    if (!session) return {
        redirect: {
            destination: '/login',
            permanent: false
        }
    }

    return {
        props: {
            items,
        },
    };
}