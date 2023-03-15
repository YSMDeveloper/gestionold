import { router } from 'next/router';
import {useState} from 'react'
import {Button, Card, Confirm} from 'semantic-ui-react'
import QuickAccessModal from '../../components/quickAccessModal';

function QuickAccess({quickAccessData}) {

    const [confirmOpen, setConfirmOpen] = useState(false);
    const handleTrashClick = () => setConfirmOpen(true);

    async function handleDeleteItem(id) {
        try {
            await fetch(`http://localhost:3000/api/quickaccess/${id}`,{
                method: "DELETE",
            });
            setConfirmOpen(false);
            router.push('/')
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div>
        <div style={{ position: 'relative' }}>
  <h3 style={{ marginTop: '1rem' }}>Acceso Rápido</h3>
    <QuickAccessModal/>
  </div>
      <Card.Group>
      {quickAccessData && quickAccessData.map((quickacces) =>
        <Card>
          <Card.Content>
            <Card.Header>{quickacces.title}</Card.Header>
            <Card.Meta>{quickacces.subtitle}</Card.Meta>
            <Card.Description>
              {quickacces.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green' onClick={() => router.push(quickacces.route)}>
                IR
              </Button>
              <Button basic color='red' onClick={handleTrashClick}>
                Eliminar
              </Button>
            </div>
          </Card.Content>
          <Confirm
                open={confirmOpen}
                content="¿Estás seguro de que quieres eliminar este acceso rápido?"
                onConfirm={() => handleDeleteItem(quickacces._id)}
                confirmButton="Eliminar"
                onCancel={() => setConfirmOpen(false)}
                onClose={() => setConfirmOpen(false)}
            ></Confirm>
        </Card>
      )}
      </Card.Group>
    </div>
  )
}

export default QuickAccess;