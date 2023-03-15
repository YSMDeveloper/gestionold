import React, { useEffect, useState } from 'react';
import { Modal, Checkbox, Button, Form, Header, Grid } from 'semantic-ui-react'
import { router } from 'next/router';

export default function QuickAccessModal() {

	const [newQuickAccess, setNewQuickAccess] = useState({
        title: "",
        subtitle: "",
        description: "",
        route: ""
    })

	const [errors, setErrors] = useState({
        title: "",
        subtitle: "",
        description: "",
        route: ""
    });

	const [confirmOpen, setConfirmOpen] = useState(false)

	const validate = () => {
        const errors = {}

        if (!newItem.name) errors.name = "El nombre es requerido"
        if (!newItem.price) errors.price = "El apellido es requerido"
        if (!newItem.quantity) errors.quantity = "El apellido es requerido"

        return errors
    }

  	const handleOpenModal = () => {
    	setConfirmOpen(true)
  	}

	useEffect(() => {
		if(newQuickAccess.title === 'Usuarios'){
			if(newQuickAccess.subtitle === 'Crear Usuarios'){
				setNewQuickAccess((prevSale) => ({
					...prevSale,
					description: "Crea usuarios con roles.",
					route: "gestion/user/new"
				}))
			}
		}
		if(newQuickAccess.title === 'Artículos'){
			if(newQuickAccess.subtitle === 'Crear Artículos'){
				setNewQuickAccess((prevSale) => ({
					...prevSale,
					description: "Crea articulos para poderlos manipular en las ventas.",
					route: "gestion/item/new"
				}))
			}
		}
		if(newQuickAccess.title === 'FAQs'){
			if(newQuickAccess.subtitle === 'Crear Faqs'){
				setNewQuickAccess((prevSale) => ({
					...prevSale,
					description: "Crea nuevos FAQs como guía para usuarios.",
					route: "/faq/new"
				}))
			}
		}
		if(newQuickAccess.title === 'Ventas'){
			if(newQuickAccess.subtitle === 'Crear Ventas'){
				setNewQuickAccess((prevSale) => ({
					...prevSale,
					description: "Realiza las ventas a tráves de nuestro sistema de venta.",
					route: "/sale"
				}))
			}
		}
	}, [newQuickAccess.subtitle]);

	const handleSubmit = async () => {
		setConfirmOpen(false)
		await createQuickAccess()
        await router.push('/')
    };

	const createQuickAccess = async () => {
        try {
            await fetch('http://localhost:3000/api/quickaccess', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newQuickAccess)
            })
        } catch (error) {
            console.error(error);
        }
    }

    return (
      	<div>
		<Button
      	icon='plus'
      	size='mini'
      	name='abremodal'
      	style={{
          	position: 'absolute',
          	right: '0',
          	top: '50%',
          	transform: 'translateY(-50%)'
      	}}
      onClick={handleOpenModal}
    />
		<Modal
			open={confirmOpen}
			onClose={() => setConfirmOpen(false)}
			size='tiny'
			closeOnDimmerClick={false}
		>
			<Header icon='checkmark' content='Opciones de permisos' />
			<Modal.Content>
				<Grid>
					<Form.Field>
						<Grid.Row>
							<Grid.Column>
								<Checkbox
									radio
									label='Usuarios'
									name='usuarios'
									value='Usuarios'
									checked={newQuickAccess.title === 'Usuarios'}
									onChange={(e, data) =>
									setNewQuickAccess((prevSale) => ({
										...prevSale,
										title: data.value,
									  }))
									}
								/>
							</Grid.Column>
							<Grid.Column>
								<Checkbox
									radio
									label='Crear'
									name='crearUsuarios'
									value='Crear Usuarios'
									checked={newQuickAccess.subtitle === 'Crear Usuarios'}
									onChange={(e, data) => setNewQuickAccess((prevSale) => ({
										...prevSale,
										subtitle: data.value,
									  }))
									}
									disabled={newQuickAccess.title != 'Usuarios'}
									inline={false}
								/>
							</Grid.Column>
						</Grid.Row>
					</Form.Field>
					<Form.Field>
						<Grid.Row>
							<Grid.Column>
								<Checkbox
									radio
									label='Artículos'
									name='articulos'
									value='Artículos'
									checked={newQuickAccess.title === 'Artículos'}
									onChange={(e, data) => setNewQuickAccess((prevSale) => ({
										...prevSale,
										title: data.value,
									  }))
									}
								/>
							</Grid.Column>
							<Grid.Column>
								<Checkbox
									radio
									label='Crear'
									name='crearArticulos'
									value='Crear Artículos'
									checked={newQuickAccess.subtitle === 'Crear Artículos'}
									onChange={(e, data) => setNewQuickAccess((prevSale) => ({
										...prevSale,
										subtitle: data.value,
									  }))
									}
									disabled={newQuickAccess.title != 'Artículos'}
									inline={false}
								/>
							</Grid.Column>
						</Grid.Row>
					</Form.Field>
					<Form.Field>
						<Grid.Row>
							<Grid.Column>
								<Checkbox
									radio
									label='FAQs'
									name='faqs'
									value='FAQs'
									checked={newQuickAccess.title === 'FAQs'}
									onChange={(e, data) => setNewQuickAccess((prevSale) => ({
										...prevSale,
										title: data.value,
									  }))
									}
								/>
							</Grid.Column>
							<Grid.Column>
								<Checkbox
									radio
									label='Crear'
									name='crearFaqs'
									value='Crear Faqs'
									checked={newQuickAccess.subtitle === 'Crear Faqs'}
									onChange={(e, data) => setNewQuickAccess((prevSale) => ({
										...prevSale,
										subtitle: data.value,
									  }))
									}
									disabled={newQuickAccess.title != 'FAQs'}
								/>
							</Grid.Column>
						</Grid.Row>
					</Form.Field>
					<Form.Field>
						<Grid.Row>
							<Grid.Column>
								<Checkbox
									radio
									label='Ventas'
									name='ventas'
									value='Ventas'
									checked={newQuickAccess.title === 'Ventas'}
									onChange={(e, data) => setNewQuickAccess((prevSale) => ({
										...prevSale,
										title: data.value,
									  }))
									}
								/>
							</Grid.Column>
							<Grid.Column>
								<Checkbox
									radio
									label='Crear'
									name='crearVentas'
									value='Crear Ventas'
									checked={newQuickAccess.subtitle === 'Crear Ventas'}
									onChange={(e, data) => setNewQuickAccess((prevSale) => ({
										...prevSale,
										subtitle: data.value,
									  }))
									}
									disabled={newQuickAccess.title != 'Ventas'}
									/>
							</Grid.Column>
						</Grid.Row>
					</Form.Field>
				</Grid>
			</Modal.Content>
			<Modal.Actions>
				<Button color="black" onClick={() => setConfirmOpen(false)}>
					Cancel
				</Button>
				<Button
					positive
					icon="checkmark"
					labelPosition="right"
					content="Save"
					onClick={() => {
						handleSubmit()
					}}
				/>
			</Modal.Actions>
		</Modal>
	</div>
    )
}