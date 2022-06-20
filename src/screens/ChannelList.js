import React, { useState, useRef, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { FlatList, Text } from 'react-native';
import { MaterialIcons, FontAwesome5} from '@expo/vector-icons';
import { ProgressContext, UserContext } from '../contexts';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;

const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 3px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 15px 20px;
`;

const MentContainer = styled.View`
    flex-direction: row;
    margin-left: 15;
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

const EmoCon = styled.View`
    align-items: center;
    justify-content: center;
`;

const getEmtionSticker = (type) => {
    switch(type) {
        case 'HORROR':
            return "dizzy";
        case 'FRIGHTEN':
            return "surprise";
        case 'ANGRY':
            return "angry";
        case 'SAD':
            return "sad-tear";
        case 'HAPPY':
            return "grin-beam";
        case 'HATE':
            return "grimace";
        default:
            return "meh-blank";
    }
};

const Item = React.memo(
    ({ item: { id, title, content, emotionType}}) => {
        const theme = useContext(ThemeContext);
        console.log(`Item: ${id}`);

        return (
            <ItemContainer>
                <ItemTextContainer>
                    <ItemTitle>{title}</ItemTitle>
                    <ItemDescription style={{marginRight: 10}}>{content}</ItemDescription>
                </ItemTextContainer>
                <EmoCon><FontAwesome5
                name={getEmtionSticker(emotionType)}
                size={24}
                color={theme.listIcon}
                />
                </EmoCon>
            </ItemContainer>
        );
    }
);

const ChannelList = ({ navigation }) => {

    const theme = useContext(ThemeContext);
    const {userRegion, userLati, userLongi, baseUrl} = useContext(UserContext);
    const [data, setData] = useState([]);

    // const _handleItemPress = params => {
    //     navigation.navigate('Channel', params);
    // };

    const getPostsApi = async (lati, longi) => {
        let fixedUrl = baseUrl+'/posts/around?lati='+lati+"&longi="+longi; 
    
        let options = {
            method: 'GET', // Get 조회 //Post 값을 보낼때 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };
      
        try {
            let response = await fetch(fixedUrl, options);
            let res = await response.json();
            console.log("data는?")
            console.log(res)
           
            let result = res["success"];
            if(result !== true) {
              return false
            }else{
              setData(res.list);
              return true
            }
            
          } catch (error) {
            console.error(error);
          }
      };

    useEffect(() => {
        getPostsApi(userLati, userLongi);
    }, [navigation]);


    return (
        <Container>
            <Text style={{marginLeft: 15}}>현위치 :  {userRegion}</Text>
            <MentContainer>
            <Text style={{marginRight: 5}}>행복</Text>
            <EmoCon style={{marginRight: 5}}>
                <FontAwesome5
                name="grin-beam"
                size={15}
                color={theme.listIcon}
                />
            </EmoCon>
            <Text style={{marginRight: 5}}>공포</Text>
            <EmoCon style={{marginRight: 5}}>
                <FontAwesome5
                name="dizzy"
                size={15}
                color={theme.listIcon}
                />
            </EmoCon>
            <Text style={{marginRight: 5}}>놀람</Text>
            <EmoCon style={{marginRight: 5}}>
                <FontAwesome5
                name="surprise"
                size={15}
                color={theme.listIcon}
                />
            </EmoCon>
            <Text style={{marginRight: 5}}>분노</Text>
            <EmoCon style={{marginRight: 5}}>
                <FontAwesome5
                name="angry"
                size={15}
                color={theme.listIcon}
                />
            </EmoCon>
            <Text style={{marginRight: 5}}>슬픔</Text>
            <EmoCon style={{marginRight: 5}}>
                <FontAwesome5
                name="sad-tear"
                size={15}
                color={theme.listIcon}
                />
            </EmoCon>
            <Text style={{marginRight: 5}}>혐오</Text>
            <EmoCon style={{marginRight: 5}}>
                <FontAwesome5
                name="grin-beam"
                size={15}
                color={theme.listIcon}
                />
            </EmoCon>
            <Text style={{marginRight: 5}}>중립</Text>
            <EmoCon style={{marginRight: 5}}>
                <FontAwesome5
                name="meh-blank"
                size={15}
                color={theme.listIcon}
                />
            </EmoCon>
            </MentContainer>
            <FlatList
            keyExtractor={item => item['title'].toString()}
            data={data}
            renderItem={({ item }) => (
                <Item item={item} />
            )}
            windowSize={3}
            />
        </Container>
    );
};

export default ChannelList;


// 공포: dizzy 놀람: surprise 분노: angry 슬픔: sad-tear 행복: grin-beam 혐오: grimace 중립: meh-blank
const channels = [
    {
        id: 0,
        title: `오늘 날씨가 좋아`,
        description: `오늘 날씨가 좋아서 뭐할까 고민하다가 광교호수공원에 가서 산책을 했다. 쨍쩅한 햇빛과 적절한 바람은 산책하기에 딱 좋은 날씨였다.`,
        emotion: "grin-beam"
    },
    {
        id: 1,
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
    },
    {
        id: 6,
        title: `시험을 망쳤다`,
        description: `열심히 공부한 시험 과목인데 몇 문제가 날 이렇게 만들다니 진짜 세상이 무너질 것 같다.`,
        emotion: "sad-tear"
    },
];