import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const BLEService_UUID  = 0x1700;
    const BLE_Characteristic_UUID = 0x1A00;

    const [device, setDevice] = useState(null);
    const [server, setServer] = useState(null);
    const [service, setService] = useState(null);
    const [characteristic , setCharacteristic] = useState(null);
    const [connected, setConnected] = useState(false);

    const [supportsBluetooth, setSupportsBluetooth] = useState(false);

    useEffect(() => {
        if (navigator.bluetooth) {
        setSupportsBluetooth(true);
        }
    }, []);

    const connectToDevice = async () => {
        navigator.bluetooth.requestDevice({
            optionalServices: [BLEService_UUID],
            acceptAllDevices: true
        })
        .then(device => {
            setDevice(device); 
            console.log('Found ' + device.name);
            console.log('Connecting to GATT Server...');
            device.addEventListener('gattserverdisconnected', onDisconnected);
            return device.gatt.connect();
        })
        .then(server => {
            console.log('Locate NUS service');
            return server.getPrimaryService(BLEService_UUID);
        })
        .then(service => {
            setService(service); 
            console.log('Found NUS service: ' + service.uuid);
            return service.getCharacteristic(BLE_Characteristic_UUID);
        })
        .then(characteristic => {
            setCharacteristic(characteristic);
            console.log('Found RX characteristic');
        })
        .then(() => {
            console.log('Enable notifications');
            return characteristic.startNotifications();
        })
        .then(() => {
            console.log('Notifications started');
            characteristic.addEventListener('characteristicvaluechanged',
                                            handleNotifications);
            setConnected(true);
        })
        .catch(error => {
            console.log('' + error);
            if(device && device.gatt.connected)
            {
                device.gatt.disconnect();
            }
        });
    };

    function onDisconnected() {
        setConnected(false);
    }

    function handleNotifications(event) {
        console.log('notification');
        let value = event.target.value;
        let str = "";
        for (let i = 0; i < value.byteLength; i++) {
            str += String.fromCharCode(value.getUint8(i));
        }
        console.log(str);
    }

    return (
        <div className="App">
        <h1>Get Device Battery Info Over Bluetooth</h1>
        {supportsBluetooth &&
            <button onClick={connectToDevice}>Connect to a Bluetooth device</button>
        }
        {connected &&
            <h2>Dispositivo conectado!</h2>
        }
        </div>
    );
}

export default App;