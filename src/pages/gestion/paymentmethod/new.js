import { useState, useEffect } from "react";
import { Button, Form, FormInput, Grid, GridColumn } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function PaymentMethodDetail() {

    const [newPaymentMethod, setNewPaymentMethod] = useState({
        name: "",
        description: ""
    })

    const [errors, setErrors] = useState({
        name: "",
        description: ""
    });

    const {query, push} = useRouter();

    const validate = () => {
        const errors = {}

        if (!newPaymentMethod.name) errors.name = "El nombre es requerido"
        if (!newPaymentMethod.description) errors.description = "La descripción es requerida"

        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = validate();

        if (Object.keys(errors).length) return setErrors(errors);

        if (query.id) {
            await updatePaymentMethod();
        } else {
            await createPaymentMethod();
        }
        await push('/gestion/paymentmethod');
    };

    const createPaymentMethod = async () => {
        try {
            await fetch('http://localhost:3000/api/paymentmethods', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPaymentMethod)
            })
        } catch (error) {
            console.error(error);
        }
    }

    const updatePaymentMethod = async () => {
        try {
            await fetch('http://localhost:3000/api/paymentmethods/' + query.id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPaymentMethod)
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) =>
        setNewPaymentMethod({...newPaymentMethod, [e.target.name]: e.target.value});

    const getPaymentMethod = async () => {
        const res = await fetch('http://localhost:3000/api/paymentmethods/' + query.id);
        const data = await res.json();
        setNewUser({name: data.name, description: data.description});
    }

    useEffect(() => {
        if (query.id) getPaymentMethod();
    }, []);

    return (
        <Grid
        centered
        verticalAlign="middle"
        columns="3"
        style={{height: "80vh"}}
        >
            <Grid.Row>
                <GridColumn textAlign="center">
                    <h1>{query.id ? 'Editar método de pago' : 'Crear método de pago'}</h1>
                    <Form onSubmit={handleSubmit}>
                        <FormInput
                            label="Nombre"
                            placeholder="Nombre"
                            name="name"
                            onChange={handleChange}
                            error={errors.name ? {content: errors.name, pointing: 'below'} : null}
                            value={newPaymentMethod.name}
                        />
                        <FormInput
                            label="Descripcíon"
                            placeholder="Descripcíon"
                            name="description"
                            onChange={handleChange}
                            error={errors.description ? {content: errors.description, pointing: 'below'} : null}
                            value={newPaymentMethod.description}
                        />
                        <Button primary>Guardar</Button>
                    </Form>
                </GridColumn>
            </Grid.Row>
        </Grid>
    );
}