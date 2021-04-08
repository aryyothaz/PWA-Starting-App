import React from "react";

class BluetoothInput extends React.Component {
  input = React.createRef();
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onBluetoothInputChange(this.input.current.value);
  };
  emptyInput = (e) => {
    if (e.target.value === "") {
      console.log(this.input.current.value);
      this.props.onBluetoothInputChange(this.input.current.value);
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="buscar-form">
        <input
          id="BluetoothInput"
          type="text"
          className="form-control"
          name="BluetoothInput"
          placeholder="Enviar mensaje"
          ref={this.input}
          onChange={(e) => this.emptyInput(e)}
          autoComplete="BluetoothInput"
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default BluetoothInput;
