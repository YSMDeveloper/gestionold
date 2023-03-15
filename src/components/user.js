import { Confirm, Icon, Table } from 'semantic-ui-react'
import { useState } from 'react';
import { router} from 'next/router';

export default function User({user, showAs}) {

    const [confirmOpen, setConfirmOpen] = useState(false);

    if(showAs === "Page"){
        return <div>Page</div>;
    }

    if(showAs === "ListUser") {
        return <div>List User</div>;
    }

    async function handleDeleteUser(id) {
        try {
            await fetch(`http://localhost:3000/api/users/${id}`,{
                method: "DELETE",
            });
            // Set confirmOpen to false after the delete request is successful
            setConfirmOpen(false);
            router.push('../gestion/user')
        } catch (error) {
            console.error(error);
        }
    }

    const handleTrashClick = () => setConfirmOpen(true);
    return (
        <Table.Row>
            <Table.Cell>{user.rut}</Table.Cell>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.lastname}</Table.Cell>
            <Table.Cell>{user.age}</Table.Cell>
            <Table.Cell textAlign='center'>
                <Icon name='pencil alternate' size='large' color='blue' onClick={() => router.push(`/gestion/user/${user._id}/edit`)}/>
            </Table.Cell>
            <Table.Cell textAlign='center'>
                <Icon name='trash' size='large' color='red' onClick={handleTrashClick}/>
            </Table.Cell>
            <Confirm
                open={confirmOpen}
                content="¿Estás seguro de que quieres eliminar a este usuario?"
                // Pass a reference to the handleDeleteItem function instead of calling it directly
                onConfirm={() => handleDeleteUser(user._id)}
                confirmButton="Eliminar"
                onCancel={() => setConfirmOpen(false)}
                onClose={() => setConfirmOpen(false)}
            ></Confirm>
        </Table.Row >
    )
}