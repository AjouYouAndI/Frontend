import App from './src/App';
import React from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native-web';

export default class extends React.Component {
    geoLocation = async() => {
        try{
            const response = await Location.requestForegroundPermissionsAsync();
            console.log(response);
            const location = await Location.getCurrentPositionAsync();
            console.log(location);
            const {coords} = location;
            console.log(coords.latitude, coords.longitude);
        } catch(error) {
            Alert.alert("위치를 찾을 수 없습니다.")
        }
    }

    componentDidMount(){
        this.geoLocation();
    }
    render(){
        return <App />;
    }
}
