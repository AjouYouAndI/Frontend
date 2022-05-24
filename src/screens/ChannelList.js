import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { FlatList, Text } from 'react-native';
import { MaterialIcons} from '@expo/vector-icons';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 3px;
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
for (let idx = 0; idx < 10; idx++){
    channels.push({
        id: idx,
        title: `오늘 날씨가 좋아요~~`,
        description: `오늘 광교호수공원가서 산책을 했어요!`,
        
    });
}

const Item = React.memo(
    ({ item: { id, title, description }, onPress }) => {
        const theme = useContext(ThemeContext);
        console.log(`Item: ${id}`);

        return (
            <ItemContainer onPress={() => onPress({ id, title })}>
                <ItemTextContainer>
                    <ItemTitle>{title}</ItemTitle>
                    <ItemDescription>{description}</ItemDescription>
                </ItemTextContainer>
                <MaterialIcons
                name="emoji-emotions"
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
            <Text>현위치 :  원천동</Text>
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