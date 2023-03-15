import { Confirm, Icon, Table } from 'semantic-ui-react'
import { useState } from 'react';
import { router} from 'next/router';

export default function Category({category, showAs}) {

    const [confirmOpen, setConfirmOpen] = useState(false);

    if(showAs === "Page"){
        return <div>Page</div>;
    }

    if(showAs === "ListCategory") {
        return <div>List Categories</div>;
    }

    async function handleDeleteCategory(id) {
        console.log("Llegue", id)
        try {
            await fetch(`http://localhost:3000/api/categories/${id}`,{
                method: "DELETE",
            });
            // Set confirmOpen to false after the delete request is successful
            setConfirmOpen(false);
            router.push('../gestion/category')
        } catch (error) {
            console.error(error);
        }
    }

    const handleTrashClick = () => setConfirmOpen(true);
    return (
        <Table.Row>
            <Table.Cell>{category.name}</Table.Cell>
            <Table.Cell>{category.description}</Table.Cell>
            <Table.Cell textAlign='center'>
                <Icon name='pencil alternate' size='large' color='blue' onClick={() => router.push(`/gestion/category/${category._id}/edit`)}/>
            </Table.Cell>
            <Table.Cell textAlign='center'>
                <Icon name='trash' size='large' color='red' onClick={handleTrashClick}/>
            </Table.Cell>
            <Confirm
                open={confirmOpen}
                content="¿Estás seguro de que quieres eliminar esta categoría?"
                // Pass a reference to the handleDeleteItem function instead of calling it directly
                onConfirm={() => handleDeleteCategory(category._id)}
                confirmButton="Eliminar"
                onCancel={() => setConfirmOpen(false)}
                onClose={() => setConfirmOpen(false)}
            ></Confirm>
        </Table.Row >
    )
}