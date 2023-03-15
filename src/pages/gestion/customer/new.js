import { useState, useEffect } from "react";
import { Button, Form, FormInput, Grid, GridColumn, Label } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function CustomerDetail() {

    const [newCustomer, setNewCustomer] = useState({
        rut: "",
        name: "",
        lastname: ""
    })

    const [errors, setErrors] = useState({
        rut: "",
        name: "",
        lastname: ""
    });

    const {query, push} = useRouter();

    const validate = () => {
        const errors = {}

        if (!newCustomer.rut) errors.rut = "El rut es requerido"
        if (!newCustomer.name) errors.name = "El nombre es requerido"
        if (!newCustomer.lastname) errors.lastname = "El apellido es requerido"

        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = validate();

        if (Object.keys(errors).length) return setErrors(errors);

        if (query.id) {
            await updateCustomer();
        } else {
            await createCustomer();
        }
        await push('/gestion/customer');
    };

    const createCustomer = async () => {
        try {
            await fetch('http://localhost:3000/api/customers', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCustomer)
            })
        } catch (error) {
            console.error(error);
        }
    }

    const updateCustomer = async () => {
        try {
            await fetch('http://localhost:3000/api/customers/' + query.id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCustomer)
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) =>
        setNewCustomer({...newCustomer, [e.target.name]: e.target.value});

        const getCustomer = async () => {
            const res = await fetch('http://localhost:3000/api/customers/' + query.id);
            const data = await res.json();
            setNewCustomer({rut: data.rut, name: data.name, lastname: data.lastname});
        }

        useEffect(() => {
            if (query.id) getCustomer();
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
                    <h1>{query.id ? 'Editar cliente' : 'Crear cliente'}</h1>
                    <Form onSubmit={handleSubmit}>
                        <FormInput
                            label="Rut"
                            placeholder="Rut"
                            name="rut"
                            onChange={handleChange}
                            error={errors.rut ? {content: errors.rut, pointing: 'below'} : null}
                            value={newCustomer.rut}
                        ></FormInput>
                        <FormInput
                            label="Nombre"
                            placeholder="Nombre"
                            name="name"
                            onChange={handleChange}
                            icon="dollar sign"
                            iconPosition="left"
                            error={errors.name ? {content: errors.name, pointing: 'below'} : null}
                            value={newCustomer.name}
                        /><FormInput
                        label="Apellido"
                        placeholder="Apellido"
                        name="lastname"
                        onChange={handleChange}
                        error={errors.lastname ? {content: errors.lastname, pointing: 'below'} : null}
                        value={newCustomer.lastname}
                    />
                        <Button primary>Guardar</Button>
                    </Form>
                </GridColumn>
            </Grid.Row>
        </Grid>
    );
}