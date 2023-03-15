import Layout from "../../components/layout";
import {getSession} from "next-auth/react";
import { Accordion, Button, Confirm, Icon } from 'semantic-ui-react'
import { useState } from "react";
import { router } from "next/router";

export default function FAQ({faqs}) {

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [state, setState] = useState({ activeIndex: 0 });
    const { activeIndex } = state;

    function handleClick(e, titleProps) {
        const {index} = titleProps;
      const newIndex = activeIndex === index ? 0 : index;
      setState({ activeIndex: newIndex });
    }

    async function handleDeleteFAQ(id) {
        try {
            await fetch(`http://localhost:3000/api/faqs/${id}`,{
                method: "DELETE",
            });
            // Set confirmOpen to false after the delete request is successful
            setConfirmOpen(false);
            router.push('/faq')
        } catch (error) {
            console.error(error);
        }
    }

    const handleTrashClick = () => setConfirmOpen(true);

    return (
        <Layout>
            <div style={{ position: 'relative' }}>
            <h1 style={{ marginTop: '1rem' }}>FAQ</h1>
            <Button
                icon='plus'
                size='mini'
                style={{
                    position: 'absolute',
                    right: '0',
                    top: '50%',
                    transform: 'translateY(-50%)'
                }}
                onClick={() => router.push('/faq/new')}
            />
            </div>
                <Accordion fluid styled>
                    {faqs && faqs.map((faq) =>
                    <div>
                     <Accordion.Title
                     active={activeIndex === faq.index}
                     index={faq.index}
                     onClick={handleClick}
                     >
                     <Icon name='dropdown' />
                     {faq.title}<Icon name='pencil' size='large' color='red'  floated='right' onClick={() => router.push(`/faq/${faq._id}/edit`)}/>
                     <Icon name='trash' size='large' color='red'  floated='right' onClick={handleTrashClick}/>
                     </Accordion.Title>
                     <Accordion.Content active={activeIndex === faq.index}>
                     <p>
                        {faq.description}
                     </p>
                     </Accordion.Content>
                     <Confirm
                        open={confirmOpen}
                        content="¿Estás seguro de que quieres eliminar este FAQ?"
                        // Pass a reference to the handleDeleteItem function instead of calling it directly
                        onConfirm={() => handleDeleteFAQ(faq._id)}
                        confirmButton="Eliminar"
                        onCancel={() => setConfirmOpen(false)}
                        onClose={() => setConfirmOpen(false)}
                    ></Confirm>
                    </div>
                     )}
                </Accordion>
        </Layout>
    )
}

export const getServerSideProps = async (context) => {
    const res = await fetch("http://localhost:3000/api/faqs")
    const faqs = await res.json();
    const session = await getSession(context)
    if (!session) return {
        redirect: {
            destination: '/login',
            permanent: false
        }
    }
    return {
        props: {
            faqs
        }
    }
}