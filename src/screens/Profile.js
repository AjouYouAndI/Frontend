import React, { useContext, useState, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { Button, Image, Input } from '../components';
import { UserContext, ProgressContext } from '../contexts';
import { FlatList, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons, FontAwesome5} from '@expo/vector-icons';

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-width: 3px;
  border-color: ${({ theme }) => theme.listBorder};
  flex-direction: row;
  border-radius: 10;
  margin-bottom: 10;
  margin-top: 10;
  justify-content: space-around;
`;

const EmoRateCon = styled.View`
    padding: 0 20px;
    margin-top: 20;
    border-bottom-width: 3px;
    border-color: ${({ theme }) => theme.listBorder};
    margin-bottom: 20;
`;

const EmoCon = styled.View`
    align-items: center;
    justify-content: center;
`;

const ItemTextContainer = styled.View`
  flex-direction: column;
`;
const ItemTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;
const ItemDescription = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.listDescription};
`;

const Item = React.memo(
    ({ item: { id, emotion, rate} }) => {
        const theme = useContext(ThemeContext);
        return (
            <ItemContainer>
                <EmoCon>
                    <FontAwesome5
                        name={emotion}
                        size={100}
                        color={theme.listIcon}
                    />
                </EmoCon>
                <ItemTextContainer>
                    <ItemTitle>{emotionName[id]}</ItemTitle>
                    <ItemDescription style={{marginRight: 10}}>{rate}</ItemDescription>
                </ItemTextContainer>
            </ItemContainer>
        );
    }
);

const Profile = () => {
    const { spinner, setLogin } = useContext(ProgressContext);
    const {userEmail} = useContext(UserContext);
    const theme = useContext(ThemeContext);

    useEffect(() => {
        console.log(userEmail);
    });

    // const user = getCurrentUser();
    const [photoUrl, setPhotoUrl] = useState("");

    const _handleLogoutButtonPress = async () => {
        try {
            spinner.start();
            setLogin.logout();
        } catch (e) {
            console.log('[Profile] logout: ', e.message);
        } finally {
            spinner.stop();
        }
    };

    const _handlePhotoChange = async url => {
        // try {
        //     spinner.start();
        //     const updatedUser = await updateUserPhoto(url);
        //     setPhotoUrl(updatedUser.photoUrl);
        // } catch (e) {
        //     Alert.alert('Photo Error', e.message);
        // } finally {
        //     spinner.stop();
        // }
    };

    return (
        <ScrollView style={{backgroundColor: 'white', paddingTop: 20, paddingBottom: 20}}>
        <Container>
            <Image
            url={photoUrl}
            onChangeImage={_handlePhotoChange}
            showButton
            rounded
            />
            <Input label="Name" value={"name"} disabled />
            <Input label="Email" value={userEmail} disabled />
            <Button 
            title="logout" 
            onPress={_handleLogoutButtonPress}
            containerStyle={{ marginTop: 30, backgroundColor: theme.buttonLogout }}
            />
            </Container>
            <EmoRateCon>
            <ItemTitle style={{backgroundColor: 'white', paddingLeft: '5%'}}>이번 달 나의 감정들</ItemTitle>
            <FlatList 
            keyExtractor={item => item['id'].toString()}
            data={emotioList}
            renderItem={({item}) => (
                <Item item={item} />
            )}
            />
            </EmoRateCon>
        </ScrollView>
    );
};

export default Profile;

const emotioList = [
    {
        id: 0,
        emotion: 'dizzy',
        rate: '5%'
    },
    {
        id: 1,
        emotion: 'surprise',
        rate: '5%'
    },
    {
        id: 2,
        emotion: 'angry',
        rate: '15%'
    },
    {
        id: 3,
        emotion: 'sad-tear',
        rate: '15%'
    },
    {
        id: 4,
        emotion: 'grin-beam',
        rate: '30%'
    },
    {
        id: 5,
        emotion: 'grimace',
        rate: '20%'
    },
    {
        id: 6,
        emotion: 'meh-blank',
        rate: '10%'
    },
]

const emotionName = ["공포", "놀람", "분노", "슬픔", "행복", "혐오", "중립"]