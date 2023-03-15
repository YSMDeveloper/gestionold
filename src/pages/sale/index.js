import {Card, Image, Button, Feed, Input, Form, Dropdown, Table} from "semantic-ui-react";
import {getSession} from "next-auth/react";
import Layout from "../../components/layout";
import { useState} from "react";
import { useRouter } from "next/router";
import SearchBar from "../../components/searchBar";

export default function Sale({paymentmethods, categories, items}) {

  const [newSale, setNewSale] = useState({
    total: null,
    user: "",
    customer: null,
    paymentmethod: null,
    items: [
    //   {
    //   item: "",
    //   quantity: "",
    //   subtotal: ""
    // }
    ]
})

  const [errors, setErrors] = useState({
      total: "",
      user: "",
      customer: "",
      paymentmethod: "",
      items: [
        //   {
        //   item: "",
        //   quantity: "",
        //   subtotal: ""
        // }
        ]
  });

const {query, push} = useRouter();

const validate = () => {
    const errors = {}

    if (!newSale.total) errors.total = "El nombre es requerido"
    if (!newSale.user) errors.user = "El apellido es requerido"
    if (!newSale.customer) errors.customer = "El apellido es requerido"

    return errors;
}

  const [cantidad, setCantidad] = useState(1)
  const [total, setTotal] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedPaymentMethod, setselectedPaymentMethod] = useState(null)
  const [selectedCustomer, setselectedCustomer] = useState(null)
  const [selectedProductDetails, setSelectedProductDetails] = useState({})
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedResult, setSelectedResult] = useState(null);

  function handleAddProduct(event) {
    const price = selectedProduct.price;
    const selectedItem = {
      item: selectedProduct._id,
      name: selectedProduct.name,
      subtotal: selectedProduct.price * cantidad,
      quantity: cantidad,
    };
    setTotal((prevTotal) => prevTotal + price * cantidad);
    setSelectedItems((prevItems) => [...prevItems, selectedItem]);
    setCantidad(1);
    setNewSale((prevSale) => ({
      ...prevSale,
      items: [...prevSale.items, selectedItem],
      total: total
    }));
  }


  function handleCategoryChange(event, data) {
    setSelectedCategory(data.value)
  }

  function handlePaymentMethodChange(event, data) {
    const selected = paymentmethods.find((item) => item._id === data.value)
    setselectedPaymentMethod(selected)
    setNewSale((prevSale) => ({
      ...prevSale,
      paymentmethod: selected._id,
    }));
  }



  const handleResultSelect = (result) => {
    setSelectedResult(result.title);
    setselectedCustomer(result.id);
    setNewSale((prevSale) => ({
      ...prevSale,
      customer: result.id,
    }));
  };

  function handleProductChange(event, data) {
    const selected = items.find((item) => item._id === data.value)
    setSelectedProduct(selected)
    console.log(selectedProduct)
    setSelectedProductDetails({
      codigo: selected.code,
      precio: selected.price,
      stock: selected.quantity
    })
  }

  const aumentarCantidad = () => {
    setCantidad(cantidad + 1)
  }

  const disminuirCantidad = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1)
    }
  }

  const handleNewSale = async () => {
    setNewSale((prevSale) => ({
      ...prevSale,
      paymentmethod: selectedPaymentMethod._id,
      customer: selectedCustomer,
      total: total
    }));
    await createSale()
    await push('sale').then(() => {
      inputCleaner();
    });
  };

  const createSale = async () => {
    try {
        await fetch('http://localhost:3000/api/sales', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSale)
        })
    } catch (error) {
        console.error(error);
    }
}

const inputCleaner = () => {
  setSelectedCategory(null)
  setSelectedProduct(null)
  setSelectedProductDetails(null)
  setCantidad(1)
  setTotal(0)
  setSelectedItems([])
  setselectedPaymentMethod(null)
  setSelectedResult(null)
}

  return (
    <Layout>
      <div className="ui grid">
        <div className="five wide column">
          <div className="ui card">
            <div className="content">
              <div className="header">Caja registradora</div>
              <div className="description">
                <Form className="ui form">
                  <Form.Field>
                    <label>Categoría</label>
                    <Dropdown
                      selection
                      options={categories.map((category, i) => ({
                        key: category._id,
                        text: category.name,
                        value: category._id,
                      }))}
                      placeholder="Seleccionar categoría"
                      onChange={handleCategoryChange}
                      value={selectedCategory}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Producto</label>
                    <Dropdown
                      selection
                      options={items
                        .filter((item) => item.category == selectedCategory)
                        .map((item, i) => ({
                          key: item._id,
                          text: item.name,
                          value: item._id,
                        }))
                      }
                      value={(selectedProduct != null) ? selectedProductDetails.name : ""}
                      placeholder="Seleccionar producto"
                      onChange={handleProductChange}
                    />
                        </Form.Field>
                        <Form.Field>
                          <label>Código del producto</label>
                          <span>{(selectedProductDetails != null) ? selectedProductDetails.codigo : 0}</span>
                        </Form.Field>
                        <Form.Field>
                          <label>Cantidad</label>
                          <Button.Group>
                            <Button icon='plus' onClick={aumentarCantidad}/>
                            <Button icon='minus' onClick={disminuirCantidad}/>
                          </Button.Group>
                          <span>  {cantidad}</span>
                        </Form.Field>
                        <Form.Field>
                          <label>Precio</label>
                          <span>{(selectedProductDetails != null) ? selectedProductDetails.precio : 0}</span>
                        </Form.Field>
                        <Form.Field>
                          <label>Stock</label>
                          <span>{(selectedProductDetails != null) ? selectedProductDetails.stock : 0}</span>
                        </Form.Field>
                        <Form.Button onClick={handleAddProduct}>Añadir</Form.Button>
                      </Form>
                    </div>
                  </div>
                  <div className="extra content">
                    <span>Total: {total}</span>
                  </div>
                </div>
              </div>
              <div className="five wide column">
              <div className="ui card">
                <div className="content">
                  <div className="header">Items seleccionados</div>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Nombre</Table.HeaderCell>
                        <Table.HeaderCell>Valor</Table.HeaderCell>
                        <Table.HeaderCell>Cantidad</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {selectedItems.map((item, index) => (
                        <Table.Row key={index}>
                          <Table.Cell>{item.name}</Table.Cell>
                          <Table.Cell>${item.subtotal.toFixed(2)}</Table.Cell>
                          <Table.Cell>{item.quantity}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                    <Table.Footer>
                      <Table.Row>
                        <Table.HeaderCell>Total</Table.HeaderCell>
                        <Table.HeaderCell>${total.toFixed(2)}</Table.HeaderCell>
                        <Table.HeaderCell>Total</Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                  </Table>
                </div>
              </div>
            </div>
              <div className="five wide column">
                <div className="ui card">
                  <div className="content">
                    <div className="header">Caja registradora</div>
                    <div className="description">
                      <Form className="ui form">
                        <Form.Field>
                          <label>Método de pago</label>
                          <Dropdown
                            selection
                            options={paymentmethods.map((paymentMethod, i) => ({
                              key: i,
                              text: paymentMethod.name,
                              value: paymentMethod._id,
                            }))}
                            placeholder="Seleccionar método de pago"
                            onChange={handlePaymentMethodChange}
                            value={selectedPaymentMethod ? selectedPaymentMethod._id : null} // establecer el valor seleccionado en el ID del método de pago o en null
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>Cliente</label>
                          <SearchBar onResultSelect={handleResultSelect} selectedResult={selectedResult} />
                        </Form.Field>
                        <Form.Field>
                          <label>Total</label>
                          <span>${total.toFixed(2)}</span>
                        </Form.Field>
                        <Form.Button onClick={handleNewSale}>Finalizar</Form.Button>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </Layout>
    );
}

export const getServerSideProps = async (context) => {
  const respm = await fetch("http://localhost:3000/api/paymentmethods")
  const paymentmethods = await respm.json();
  const resc = await fetch("http://localhost:3000/api/categories")
  const categories = await resc.json();
  const resi = await fetch("http://localhost:3000/api/items")
  const items = await resi.json();
  const rescu = await fetch("http://localhost:3000/api/customers")
  const customers = await rescu.json();
  const session = await getSession(context)
  if (!session) return {
      redirect: {
          destination: '/login',
          permanent: false
      }
  }
  return {
      props: {
        paymentmethods,
        categories,
        items,
        customers
      }
  }
}