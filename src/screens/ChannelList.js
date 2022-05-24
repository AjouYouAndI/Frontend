import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { FlatList } from 'react-native';
import { MaterialIcons} from '@expo/vector-icons';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 15px 20px;
`;
const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;
const ItemTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;
const ItemDescription = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.listDescription};
`;
const ItemTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.listTime};
`;
const channels = [];
for (let idx = 0; idx < 1000; idx++){
    channels.push({
        id: idx,
        title: `title ${idx}`,
        description: `description ${idx}`,
        createAt: idx,
    });
}

const Item = React.memo(
    ({ item: { id, title, description, createAt }, onPress }) => {
        const theme = useContext(ThemeContext);
        console.log(`Item: ${id}`);

        return (
            <ItemContainer onPress={() => onPress({ id, title })}>
                <ItemTextContainer>
                    <ItemTitle>{title}</ItemTitle>
                    <ItemDescription>{description}</ItemDescription>
                </ItemTextContainer>
                <ItemTime>{createAt}</ItemTime>
                <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color={theme.listIcon}
                />
            </ItemContainer>
        );
    }
);

const ChannelList = ({ navigation }) => {
    const _handleItemPress = params => {
        navigation.navigate('Channel', params);
    };

    return (
        <Container>
            <FlatList
            keyExtractor={item => item['id'].toString()}
            data={channels}
            renderItem={({ item }) => (
                <Item item={item} onPress={_handleItemPress} />
            )}
            windowSize={3}
            />
        </Container>
    );
};

export default ChannelList;