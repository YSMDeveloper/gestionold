import { useState, useEffect } from "react";
import { Button, Form, FormInput, Grid, GridColumn } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function CategoryDetail() {

    const [newCategory, setNewCategory] = useState({
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

        if (!newCategory.name) errors.name = "El nombre es requerido"
        if (!newCategory.description) errors.description = "La descripción es requerida"

        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = validate();

        if (Object.keys(errors).length) return setErrors(errors);

        if (query.id) {
            await updateCategory();
        } else {
            await createCategory();
        }
        await push('/gestion/category');
    };

    const createCategory = async () => {
        try {
            await fetch('http://localhost:3000/api/categories', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCategory)
            })
        } catch (error) {
            console.error(error);
        }
    }

    const updateCategory = async () => {
        try {
            await fetch('http://localhost:3000/api/categories/' + query.id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCategory)
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) =>
        setNewCategory({...newCategory, [e.target.name]: e.target.value});

    const getCategory = async () => {
        const res = await fetch('http://localhost:3000/api/categories/' + query.id);
        const data = await res.json();
        setNewCategory({name: data.name, description: data.description});
    }

    useEffect(() => {
        if (query.id) getCategory();
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
                    <h1>{query.id ? 'Editar Categoría' : 'Crear Categoría'}</h1>
                    <Form onSubmit={handleSubmit}>
                        <FormInput
                            label="Nombre"
                            placeholder="Nombre"
                            name="name"
                            onChange={handleChange}
                            error={errors.name ? {content: errors.name, pointing: 'below'} : null}
                            value={newCategory.name}
                        />
                        <FormInput
                            label="Descripcíon"
                            placeholder="Descripcíon"
                            name="description"
                            onChange={handleChange}
                            error={errors.description ? {content: errors.description, pointing: 'below'} : null}
                            value={newCategory.description}
                        />
                        <Button primary>Guardar</Button>
                    </Form>
                </GridColumn>
            </Grid.Row>
        </Grid>
    );
}