import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { FlatList, View, Text } from 'react-native';
import { MaterialIcons, FontAwesome5} from '@expo/vector-icons';
import { Input, Button } from '../components';
import RNPickerSelect from 'react-native-picker-select';

const RealCon = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;

const Container = styled.View`
    background-color: ${({ theme }) => theme.background};
    justify-content: center;
    padding: 0 20px;
`;

const ItemContainer = styled.View`
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

const CategoryCon = styled.View`
    backgroundColor: ${({ theme }) => theme.listIcon};
    align-items: center;
    justify-content: center;
`;




const Item = React.memo(
    ({ item: { id, title, description, createAt, emotion }}) => {
        const theme = useContext(ThemeContext);
        console.log(`Item: ${id}`);

        return (
            <ItemContainer onPress={() => onPress({ id, title })}>
                <ItemTextContainer>
                    <ItemTitle>{title}</ItemTitle>
                    <ItemDescription>{description}</ItemDescription>
                </ItemTextContainer>
                <FontAwesome5
                name={emotion}
                size={24}
                color={theme.listIcon}
                />
            </ItemContainer>
        );
    }
);


const ChannelList = ({ navigation }) => {
    const [text, setText] = useState(0)

    const _handleItemPress = params => {
        navigation.navigate('Channel', params);
    };

    return (
        <RealCon>
        <Container>
            <CategoryCon>
            <View style={{ width: '96%', backgroundColor: 'white', marginBottom: '2%', marginTop: '2%'}}>
            <RNPickerSelect
            placeholder={{
                label: '카테고리 눌러보기!',
                value: 0,
            }}
            fixAndroidTouchableBug={true}
            onValueChange={(value) => setText(value)}
            items={[
                { label: '오늘의 긍정적인 장소', value: 1 },
                { label: '오늘의 시끌벅적 장소', value: 2 },
                { label: '오늘의 조용한 장소', value: 3 },
            ]}
            />
            </View>
            </CategoryCon>
            <View style={{width: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginTop: 5}}>
                <ItemTitle>{pholders[text]}: {places[text]}</ItemTitle>
            </View>
            {
                (text==0) ?
                <View></View>
                :
                <FlatList
                keyExtractor={item => item['id'].toString()}
                data={channels[text]}
                renderItem={({ item }) => (
                    <Item item={item} />
                )}
                windowSize={3}
                />
            }
            
        </Container>
        </RealCon>
    );
};

export default ChannelList;

const pholders = ['카테고리 ', '오늘의 긍정적인 장소', '오늘의 시끌벅적 장소', '오늘의 조용한 장소'];

const places = ['눌러봐!', '영통구 하동', '강남구 역삼동', '분당구 백현동'];

const channels = [
    [],
    [{
        id: 0,
        title: `오늘 날씨가 좋아`,
        description: `오늘 날씨가 좋아서 뭐할까 고민하다가 광교호수공원에 가서 산책을 했다. 쨍쩅한 햇빛과 적절한 바람은 산책하기에 딱 좋은 날씨였다.`,
        emotion: "grin-beam"
    },
    {
        id: 1,
        title: `우리집 고양이가 말을 한 날`,
        description: `내가 하도 만졌더니 우리집 고양이가 그만하다고 싫다옹이라고 말했다. 고양이가 말을 하다니 세상에, 놀랄 노자다.`,
        emotion: "surprise"
    }],
    [{
        id: 10,
        title: `망할 친구`,
        description: `가장 믿었던 친구한테 배신을 당했는데 어떻게 그럴 수가 있지?`,
        emotion: "angry"
    },
    {
        id: 2,
        title: `말벌이 제일 싫어 사라져`,
        description: `지나가다가 귀에서 윙윙 거리길래 뭔가 싶어서 봤더니 거의 손가락 크기의 말벌을 보았다. 생긴 것도 징그럽고 소리도 싫고 왜 존재하는지 모르겠다.`,
        emotion: "grimace"
    },
    {
        id: 3,
        title: `컨저링 괜히 봤어`,
        description: `잠을 자는데 발을 누가 잡아 당기는 기분이 들었다 누가 장난하나 하고 봤는데 아무도 없었다 마치 컨저링 공포 영화처럼.. `,
        emotion: "dizzy"
    },
    {
        id: 4,
        title: `오늘은 일기 쓰기가 귀찮은 날`,
        description: `오늘만 생략하자 쓰기 귀찮아`,
        emotion: "meh-blank"
    },
    {
        id: 5,
        title: `우리집 고양이가 말을 한 날`,
        description: `내가 하도 만졌더니 우리집 고양이가 그만하다고 싫다옹이라고 말했다. 고양이가 말을 하다니 세상에, 놀랄 노자다.`,
        emotion: "surprise"
    }],
    [{
        id: 6,
        title: `시험을 망쳤다`,
        description: `열심히 공부한 시험 과목인데 몇 문제가 날 이렇게 만들다니 진짜 세상이 무너질 것 같다.`,
        emotion: "sad-tear"
    }],
];