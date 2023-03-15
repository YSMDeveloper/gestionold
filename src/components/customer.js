import { Confirm, Icon, Table } from 'semantic-ui-react'
import { useState } from 'react';
import { router} from 'next/router';

export default function Customer({customer, showAs}) {

    const [confirmOpen, setConfirmOpen] = useState(false);

    if(showAs === "Page"){
        return <div>Page</div>;
    }

    if(showAs === "ListCustomer") {
        return <div>List Customer</div>;
    }

    async function handleDeleteCustomer(id) {
        try {
            await fetch(`http://localhost:3000/api/customers/${id}`,{
                method: "DELETE",
            });
            // Set confirmOpen to false after the delete request is successful
            setConfirmOpen(false);
            router.push('../gestion/customer')
        } catch (error) {
            console.error(error);
        }
    }

    const handleTrashClick = () => setConfirmOpen(true);
    return (
        <Table.Row>
            <Table.Cell>{customer.rut}</Table.Cell>
            <Table.Cell>{customer.name}</Table.Cell>
            <Table.Cell>{customer.lastname}</Table.Cell>
            <Table.Cell textAlign='center'>
                <Icon name='pencil alternate' size='large' color='blue' onClick={() => router.push(`/gestion/user/${user._id}/edit`)}/>
            </Table.Cell>
            <Table.Cell textAlign='center'>
                <Icon name='trash' size='large' color='red' onClick={handleTrashClick}/>
            </Table.Cell>
            <Confirm
                open={confirmOpen}
                content="¿Estás seguro de que quieres eliminar a este cliente?"
                // Pass a reference to the handleDeleteItem function instead of calling it directly
                onConfirm={() => handleDeleteCustomer(customer._id)}
                confirmButton="Eliminar"
                onCancel={() => setConfirmOpen(false)}
                onClose={() => setConfirmOpen(false)}
            ></Confirm>
        </Table.Row >
    )
}