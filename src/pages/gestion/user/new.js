import { useState, useEffect } from "react";
import { Button, Form, FormInput, Grid, GridColumn } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function UserDetail() {

    const [newUser, setNewUser] = useState({
        rut: "",
        lastname: "",
        name: "",
        age: ""
    })

    const [errors, setErrors] = useState({
        rut: "",
        lastname: "",
        name: "",
        age: ""
    });

    const {query, push} = useRouter();

    const validate = () => {
        const errors = {}

        if (!newUser.rut) errors.rut = "El rut es requerido"
        if (!newUser.lastname) errors.lastname = "El apellido es requerido"
        if (!newUser.name) errors.name = "El nombre es requerido"
        if (!newUser.age) errors.age = "La edad es requerida"

        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = validate();

        if (Object.keys(errors).length) return setErrors(errors);

        if (query.id) {
            await updateUser();
        } else {
            await createUser();
        }
        await createUser();
        await push('/gestion/user');
    };

    const createUser = async () => {
        try {
            await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })
        } catch (error) {
            console.error(error);
        }
    }

    const updateUser = async () => {
        try {
            await fetch('http://localhost:3000/api/users/' + query.id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) =>
        setNewUser({...newUser, [e.target.name]: e.target.value});

    const getUser = async () => {
        const res = await fetch('http://localhost:3000/api/users/' + query.id);
        const data = await res.json();
        setNewUser({rut: data.rut, lastname: data.lastname, name: data.name, age: data.age});
    }

    useEffect(() => {
        if (query.id) getUser();
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
                    <h1>{query.id ? 'Editar Usuario' : 'Crear Usuario'}</h1>
                    <Form onSubmit={handleSubmit}>
                        <FormInput
                            label="Rut"
                            placeholder="Rut"
                            name="rut"
                            onChange={handleChange}
                            error={errors.rut ? {content: errors.rut, pointing: 'below'} : null}
                            value={newUser.rut}
                        />
                        <FormInput
                            label="Nombre"
                            placeholder="Nombre"
                            name="name"
                            onChange={handleChange}
                            error={errors.name ? {content: errors.name, pointing: 'below'} : null}
                            value={newUser.name}
                        />
                        <FormInput
                            label="Apellido"
                            placeholder="Apellido"
                            name="lastname"
                            onChange={handleChange}
                            error={errors.lastname ? {content: errors.lastname, pointing: 'below'} : null}
                            value={newUser.lastname}
                        />
                        <FormInput
                            label="Edad"
                            placeholder="Edad"
                            name="age"
                            onChange={handleChange}
                            error={errors.age ? {content: errors.age, pointing: 'below'} : null}
                            value={newUser.age}
                        />
                        <Button primary>Guardar</Button>
                    </Form>
                </GridColumn>
            </Grid.Row>
        </Grid>
    );
}