import { Confirm, Icon, Table } from 'semantic-ui-react'
import { useState, useEffect } from 'react';
import { router } from 'next/router';

export default function Item({item, showAs}) {

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        async function getCategoryName() {
            const name = await handleFindCategory(item.category);
            setCategoryName(name);
        }
        getCategoryName();
    }, [item.category]);

    if(showAs === "Page"){
        return <div>Page</div>;
    }

    if(showAs === "ListItem") {
        return <div>List item</div>;
    }

    async function handleDeleteItem(id) {
        try {
            await fetch(`http://localhost:3000/api/items/${id}`,{
                method: "DELETE",
            });
            setConfirmOpen(false);
            router.push('../gestion/item')
        } catch (error) {
            console.error(error);
        }
    }

    async function handleFindCategory(id) {
        try {
            const res = await fetch(`http://localhost:3000/api/categories/${id}`);
            const categoria = await res.json();
            return categoria.name
        } catch (error) {
            console.error(error)
        }
    }

    const handleTrashClick = () => setConfirmOpen(true);
    return (
        <Table.Row>
            <Table.Cell>{item.code}</Table.Cell>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>$ {item.price}</Table.Cell>
            <Table.Cell>{item.quantity}</Table.Cell>
            <Table.Cell>{categoryName}</Table.Cell>
            <Table.Cell textAlign='center'>
                <Icon name='pencil alternate' size='large' color='blue' onClick={() => router.push(`/gestion/item/${item._id}/edit`)}/>
            </Table.Cell>
            <Table.Cell textAlign='center'>
                    <Icon name='trash' size='large' color='red' onClick={handleTrashClick}/>
            </Table.Cell>
            <Confirm
                open={confirmOpen}
                content="¿Estás seguro de que quieres eliminar este artículo?"
                // Pass a reference to the handleDeleteItem function instead of calling it directly
                onConfirm={() => handleDeleteItem(item._id)}
                confirmButton="Eliminar"
                onCancel={() => setConfirmOpen(false)}
                onClose={() => setConfirmOpen(false)}
            ></Confirm>
        </Table.Row >
    )
}
