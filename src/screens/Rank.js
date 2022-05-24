import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { FlatList, View, Text } from 'react-native';
import { MaterialIcons} from '@expo/vector-icons';
import { Input, Button } from '../components';
import RNPickerSelect from 'react-native-picker-select';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    justify-content: center;
    padding: 0 20px;
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
for (let idx = 0; idx < 3; idx++){
    channels.push({
        id: idx,
        title: `오늘 날씨가 좋아요~~`,
        description: `오늘 광교호수공원가서 산책을 했어요!`,
        
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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{ width: 300 }}>
            <RNPickerSelect
            placeholder={{
                label: '카테고리를 선택하기!',
            }}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: '오늘의 좋아요 가득 장소', value: '오늘의 좋아요 가득 장소' },
                { label: '오늘의 시끌벅적 장소', value: '오늘의 시끌벅적 장소' },
            ]}
            />
            </View>
            </View>
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