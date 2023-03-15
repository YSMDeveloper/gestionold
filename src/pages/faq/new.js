import { useState, useEffect } from "react";
import { Button, Form, FormInput, Grid, GridColumn, Label } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function FAQDetail() {

    const [newFAQ, setNewFAQ] = useState({
        title: "",
        description: "",
        index: ""
    })

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        index: ""
    });

    const {query, push} = useRouter();

    const validate = () => {
        const errors = {}

        if (!newFAQ.title) errors.title = "El titulo es requerido"
        if (!newFAQ.description) errors.description = "La descripción es requerida"
        if (!newFAQ.index) errors.index = "El index es requerido"

        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = validate();

        if (Object.keys(errors).length) return setErrors(errors);

        if (query.id) {
            await updateFAQ();
        } else {
            await createFAQ();
        }
        await createFAQ();
        await push('/faq');
    };

    const createFAQ = async () => {
        try {
            await fetch('http://localhost:3000/api/faqs', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newFAQ)
            })
        } catch (error) {
            console.error(error);
        }
    }

    const updateFAQ = async () => {
        try {
            await fetch('http://localhost:3000/api/faqs/' + query.id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newFAQ)
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) =>
        setNewFAQ({...newFAQ, [e.target.name]: e.target.value});

    const getFAQ = async () => {
        const res = await fetch('http://localhost:3000/api/faqs/' + query.id);
        const data = await res.json();
        setNewFAQ({title: data.title, description: data.description});
    }

    useEffect(() => {
        if (query.id) getFAQ();
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
                    <h1>{query.id ? 'Editar FAQ' : 'Crear FAQ'}</h1>
                    <Form onSubmit={handleSubmit}>
                        <FormInput
                            label="Título"
                            placeholder="Título"
                            name="title"
                            onChange={handleChange}
                            error={errors.title ? {content: errors.title, pointing: 'below'} : null}
                            value={newFAQ.title}
                        ></FormInput>
                        <FormInput
                            label="Descripción"
                            placeholder="Descripción"
                            name="description"
                            onChange={handleChange}
                            error={errors.description ? {content: errors.description, pointing: 'below'} : null}
                            value={newFAQ.description}
                        /><FormInput
                        label="Index"
                        placeholder="Index"
                        name="index"
                        onChange={handleChange}
                        error={errors.index ? {content: errors.index, pointing: 'below'} : null}
                    />
                        <Button primary>Guardar</Button>
                    </Form>
                </GridColumn>
            </Grid.Row>
        </Grid>
    );
}