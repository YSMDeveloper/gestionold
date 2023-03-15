import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";

const RutInput = () => {
  const [rut, setRut] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e, { value }) => {
    setRut(value);
    setIsValid(validarRut(value));
  };

  const handleSubmit = () => {
    console.log(rut);
  };

  const validarRut = (rut) => {
    if (!rut) return false;
    const sinGuion = rut.replace("-", "");
    const cuerpo = sinGuion.slice(0, -1);
    const dv = sinGuion.slice(-1).toUpperCase();
    if (!/^\d+$/.test(cuerpo)) return false;
    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += multiplo * parseInt(cuerpo.charAt(i));
      if (multiplo < 7) multiplo += 1;
      else multiplo = 2;
    }
    const dvCalculado = 11 - (suma % 11);
    const dvEsperado = dvCalculado === 11 ? "0" : dvCalculado === 10 ? "K" : dvCalculado.toString();
    return dv === dvEsperado;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>RUT</label>
        <Input placeholder="Ingresa tu RUT" value={rut} onChange={handleChange} error={!isValid} />
        {!isValid && <span style={{ color: "red" }}>RUT inválido</span>}
      </Form.Field>
      <Button type="submit" primary disabled={!isValid}>
        Enviar
      </Button>
    </Form>
  );
};

export default RutInput;
