import React from "react";
import Contenido from "./Contenido";

const Main = (props) => {
  const {
    descuento
  } = props;
  return (
    <main className="Main">
        <Contenido
            descuento={descuento}
        />
    </main>
  );
};

export default Main;