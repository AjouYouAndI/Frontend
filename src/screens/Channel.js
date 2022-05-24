import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;

const Channel = ({ route }) => {
    return (
        <Container>
            <Text style={{ fontSize: 24}}>ID: {route.params?.id}</Text>
            <Text style={{ fontSize: 24}}>제목: {route.params?.title}</Text>
            <Text style={{ fontSize: 24}}>작성한 글: {route.params?.description}</Text>
        </Container>
    );
};

export default Channel;