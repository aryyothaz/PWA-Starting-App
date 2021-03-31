import BluetoothInput from "./BluetoothInput";
import React from "react";
import BluetoothConnect from "./BluetoothConnect";

class Bluetooth extends React.Component {

    state = {
        supportsBluetooth: false,
        device: null,
        server: null,
        service: null,
        characteristic: null,
        value: null,
        connected: false,
    };
    handleDeviceChange = (device) => {
        this.setState({ device });
    };
    handleServerChange = (server) => {
        this.setState({ server });
    };
    handleServiceChange = (service) => {
        this.setState({ service });
    };
    handleCharacteristicChange = (characteristic) => {
        this.setState({ characteristic });
    };
    handleConnectedChange = (connected) => {
        this.setState({ connected });
    };
    handleSupportsBluetoothChange = (supportsBluetooth) => {
        this.setState({ supportsBluetooth });
    };

    componentDidMount = () => {
        if (navigator.bluetooth) 
        this.handleSupportsBluetoothChange(true);
    }

    onDisconnected = () => {
        this.setState({
            connected: false,
        });
    }
    
    handleNotifications = (event) => {
        let value = event.target.value;
        let str = "";
        for (let i = 0; i < value.byteLength; i++) {
            str += String.fromCharCode(value.getUint8(i));
        }
        this.setState({
            value: str,
        });
    }

    handleBluetoothInputChange = () => {
        let encoder = new TextEncoder('utf-8');
        console.log('Setting Characteristic...');
        this.state.characteristic.writeValue(encoder.encode(this.state.value))
        .then(_ => {
        console.log('> Characteristic changed to: ' + this.state.value);
        })
        .catch(error => {
        console.log('Set Characteristic error: ' + error);
        });
    }

    render = () => {
        const {
            supportsBluetooth,
            connected,
            device,
            server,
            service,
            characteristic,
        } = this.state;
        return (
        <div className="Bluetooth">+
            <h1 className="bluetooth-title">Bluetooth</h1>
            {supportsBluetooth ?
                <BluetoothConnect
                    device= {device}
                    onDeviceChange= {this.handleDeviceChange}
                    server= {server}
                    onServerChange= {this.handleServerChange}
                    service= {service}
                    onServiceChange= {this.handleServiceChange}
                    characteristic= {characteristic}
                    onCharacteristicChange= {this.handleCharacteristicChange}
                    connected= {connected}
                    onConnectedChange= {this.handleConnectedChange}
                    handleNotifications= {this.handleNotifications}
                    onDisconnected= {this.onDisconnected}
                />
                :
                <div className="no-bt">
                    Este dispositivo no soporta bluetooth.
                </div>
            }
            {connected &&
                <div className="connected">
                    <BluetoothInput onBluetoothInputChange={this.handleBluetoothInputChange} />
                    <p>{device.name}</p>
                </div>
            }
        </div>
    );
}
}

export default Bluetooth;