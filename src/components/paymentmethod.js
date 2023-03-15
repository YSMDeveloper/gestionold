import { Confirm, Icon, Table } from 'semantic-ui-react'
import { useState } from 'react';
import { router} from 'next/router';

export default function PaymentMethod({paymentMethod, showAs}) {

    const [confirmOpen, setConfirmOpen] = useState(false);

    if(showAs === "Page"){
        return <div>Page</div>;
    }

    if(showAs === "ListPaymentMethod") {
        return <div>List PaymentMethod</div>;
    }

    async function handleDeletePaymentMethod(id) {
        console.log("Llegue", id)
        try {
            await fetch(`http://localhost:3000/api/paymentmethods/${id}`,{
                method: "DELETE",
            });
            // Set confirmOpen to false after the delete request is successful
            setConfirmOpen(false);
            router.push('../gestion/paymentmethod')
        } catch (error) {
            console.error(error);
        }
    }

    const handleTrashClick = () => setConfirmOpen(true);
    return (
        <Table.Row>
            <Table.Cell>{paymentMethod.name}</Table.Cell>
            <Table.Cell>{paymentMethod.description}</Table.Cell>
            <Table.Cell textAlign='center'>
                <Icon name='pencil alternate' size='large' color='blue' onClick={() => router.push(`/gestion/paymentmethod/${paymentMethod._id}/edit`)}/>
            </Table.Cell>
            <Table.Cell textAlign='center'>
                <Icon name='trash' size='large' color='red' onClick={handleTrashClick}/>
            </Table.Cell>
            <Confirm
                open={confirmOpen}
                content="¿Estás seguro de que quieres eliminar a este usuario?"
                // Pass a reference to the handleDeleteItem function instead of calling it directly
                onConfirm={() => handleDeletePaymentMethod(paymentMethod._id)}
                confirmButton="Eliminar"
                onCancel={() => setConfirmOpen(false)}
                onClose={() => setConfirmOpen(false)}
            ></Confirm>
        </Table.Row >
    )
}