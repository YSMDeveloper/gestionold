import { useState, useEffect } from "react";
import { Button, Form, FormInput, Grid, GridColumn, Label, Dropdown } from "semantic-ui-react";
import { useRouter } from "next/router";
import {getSession} from "next-auth/react";

export default function ItemDetail({categories}) {

    const [newItem, setNewItem] = useState({
        name: "",
        price: "",
        quantity: "",
        category: ""
    })

    const [errors, setErrors] = useState({
        name: "",
        price: "",
        quantity: "",
        category: ""
    });

    const {query, push} = useRouter();

    const validate = () => {
        const errors = {}

        if (!newItem.name) errors.name = "El nombre es requerido"
        if (!newItem.price) errors.price = "El apellido es requerido"
        if (!newItem.quantity) errors.quantity = "El apellido es requerido"

        return errors;
    }

    const handleSubmit = async (e) => {
        console.log("e", e)
        e.preventDefault();
        let errors = validate();

        if (Object.keys(errors).length) return setErrors(errors);

        if (query.id) {
            await updateItem();
        } else {
            await createItem();
        }
        await push('/gestion/item');
    };

    const createItem = async () => {
        console.log("Nuevo Objeto", JSON.stringify(newItem))
        try {
            await fetch('http://localhost:3000/api/items', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newItem)
            })
        } catch (error) {
            console.error(error);
        }
    }

    const updateItem = async () => {
        try {
            await fetch('http://localhost:3000/api/items/' + query.id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newItem)
            })
        } catch (error) {
            console.error(error);
        }
    }

    // Agrega un nuevo estado para guardar el valor seleccionado en el Dropdown
const [selectedCategory, setSelectedCategory] = useState("");

// Actualiza el handler del Dropdown para guardar el valor seleccionado en el estado
const handleDropdownChange = (e, { value }) => {
    setSelectedCategory(value);
    setNewItem({ ...newItem, category: value });
  };

    const handleChange = (e) =>
        {
            setNewItem({...newItem, [e.target.name]: e.target.value})
        };

    const getItem = async () => {
        const res = await fetch('http://localhost:3000/api/items/' + query.id);
        const data = await res.json();
        setNewItem({name: data.name, price: data.price, quantity: data.quantity});
    }

    useEffect(() => {
        if (query.id) getItem();
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
                    <h1>{query.id ? 'Editar Artículo' : 'Crear Artículo'}</h1>
                    <Form onSubmit={handleSubmit}>
                        <FormInput
                            label="Nombre"
                            placeholder="Nombre"
                            name="name"
                            onChange={handleChange}
                            error={errors.name ? {content: errors.name, pointing: 'below'} : null}
                            value={newItem.name}
                        />
                        <FormInput
                            label="Precio"
                            placeholder="Precio"
                            name="price"
                            onChange={handleChange}
                            icon="dollar sign"
                            iconPosition="left"
                            error={errors.price ? {content: errors.price, pointing: 'below'} : null}
                            value={newItem.price}
                        />
                        <FormInput
                            label="Cantidad"
                            placeholder="Cantidad"
                            name="quantity"
                            onChange={handleChange}
                            error={errors.quantity ? {content: errors.quantity, pointing: 'below'} : null}
                            value={newItem.quantity}
                        />
                        <Dropdown
  selection
  options={categories.map((category, i) => ({
    key: i,
    text: category.name,
    value: category._id, // Cambia el valor de la opción por el nombre de la categoría
  }))}
  placeholder="Seleccionar categoría"
  name="category" // Cambia el nombre de la propiedad por "category"
  onChange={handleDropdownChange} // Usa el nuevo handler
/>
                        <Button primary>Guardar</Button>
                    </Form>
                </GridColumn>
            </Grid.Row>
        </Grid>
    );
}

export const getServerSideProps = async (context) => {
    const resc = await fetch("http://localhost:3000/api/categories")
    const categories = await resc.json();
    const session = await getSession(context)
    if (!session) return {
        redirect: {
            destination: '/login',
            permanent: false
        }
    }
    return {
        props: {
          categories
        }
    }
}