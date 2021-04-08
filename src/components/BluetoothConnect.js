import React from "react";
import BluetoothConnectButton from "./BluetoothConnectButton";

const BLEService_UUID = "37fc19ab-98ca-4543-a68b-d183da78acdc";
const BLE_Characteristic_UUID = "a40d0c2e-73ba-4d8b-8eef-9a0666992e56";

class BluetoothConnect extends React.Component {
  connectToDevice = async () => {
    navigator.bluetooth
      .requestDevice({
        optionalServices: [BLEService_UUID],
        acceptAllDevices: true,
      })
      .then((device) => {
        this.props.onDeviceChange(device);
        device.addEventListener(
          "gattserverdisconnected",
          this.props.onDisconnected
        );
        return device.gatt.connect();
      })
      .then((server) => {
        this.props.onServerChange(server);
        return server.getPrimaryService(BLEService_UUID);
      })
      .then((service) => {
        this.props.onServiceChange(service);
        return service.getCharacteristic(BLE_Characteristic_UUID);
      })
      .then((characteristic) => {
        this.props.onCharacteristicChange(characteristic);
        characteristic.addEventListener(
          "characteristicvaluechanged",
          this.props.handleNotifications
        );
        this.props.onConnectedChange(true);
        return characteristic.startNotifications();
      })
      .catch((error) => {
        if (this.props.device && this.props.device.gatt.connected) {
          this.props.device.gatt.disconnect();
        }
        console.log("Bluetooth conection: " + error);
      });
  };

  render = () => {
    const { connected } = this.props;
    return (
      <BluetoothConnectButton
        connect={this.connectToDevice}
        connected={connected}
      />
    );
  };
}

export default BluetoothConnect;
