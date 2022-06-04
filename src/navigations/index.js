import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { Spinner } from '../components';
import { ProgressContext, UserContext } from '../contexts';
import MainStack from './MainStack';

const Navigation = () => {
    const { inProgress, isLogin } = useContext(ProgressContext);

    return (
        <NavigationContainer>
            {isLogin? <MainStack /> : <AuthStack />}
            {inProgress && <Spinner />}
        </NavigationContainer>
    );
};

export default Navigation;