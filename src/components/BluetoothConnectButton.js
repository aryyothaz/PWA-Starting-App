import React from "react";

const BluetoothConnectButton = (props) => {
  return (
    <div className="BluetoothConnect">
        <button onClick={props.connect}>{props.connected?"Conectado":"Conectar"}</button>
    </div>
  );
};

export default BluetoothConnectButton;


