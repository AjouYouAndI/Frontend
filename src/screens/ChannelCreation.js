import React, { useState, useRef, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { ProgressContext, UserContext } from '../contexts';
import styled from 'styled-components/native';
import { Input, Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  padding: 0 20px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const ChannelCreation = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext);
  const {baseUrl, userLati, userLongi, token} = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const descriptionRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(title && !errorMessage));
  }, [title, description, errorMessage]);

  const _handleTitleChange = title => {
    setTitle(title);
    setErrorMessage(title.trim() ? '' : 'Please enter the title.');
  };

  const postApi = async () => {
    let fixedUrl = baseUrl+'/posts'; 
    let Info;
        Info = {
           "latitude": userLati,
           "longitude": userLongi,
           "content": description,
           "title": title
          }

    let options = {
        method: 'POST', // Get 조회 //Post 값을 보낼때 
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': token,
        },
        body: JSON.stringify( Info ),
    
    };
  
    try {
        let response = await fetch(fixedUrl, options);
        let res = await response.json();
        console.log(res);
        return res;
        
        
      } catch (error) {
        console.error(error);
      }

}

 const getEmoMent = (type) => {
  switch(type) {
    case 'HORROR':
        return "오늘의 조용한 곳인 분당구 백현동을 가보는 것은 어떨까요?";
    case 'FRIGHTEN':
        return "오늘의 조용한 곳인 분당구 백현동을 가보는 것은 어떨까요?";
    case 'ANGRY':
        return "오늘의 조용한 곳인 분당구 백현동을 가보는 것은 어떨까요?";
    case 'SAD':
        return "오늘의 긍정적인 곳인 영통구 하동을 가보는 것은 어떨까요?";
    case 'HAPPY':
        return "오늘의 긍정적인 곳인 영통구 하동을 가보는 것은 어떨까요?";
    case 'HATE':
        return "오늘의 긍정적인 곳인 영통구 하동을 가보는 것은 어떨까요?";
    default:
        return "오늘의 시끌벅적한 곳인 강남구 역삼동을 가보는 것은 어떨까요?";
  }
 }

 const getEmo = (type) => {
  switch(type) {
    case 'HORROR':
        return "공포";
    case 'FRIGHTEN':
        return "놀람";
    case 'ANGRY':
        return "분노";
    case 'SAD':
        return "슬픔";
    case 'HAPPY':
        return "행복";
    case 'HATE':
        return "증오";
    default:
        return "중립";
  }
 }

  const _handleCreateButtonPress = async () => {
    try {
      spinner.start();
      let res = await postApi();
      if(res.success===true) {
        let emo = res.data.emotionType;
        setDescription("");
        setTitle("");
        Alert.alert(getEmo(emo),getEmoMent(emo));
      }
    } catch (e) {
      Alert.alert('Creation Error', e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container>
        <Input
          label="제목"
          value={title}
          onChangeText={_handleTitleChange}
          onSubmitEditing={() => {
            setTitle(title.trim());
            descriptionRef.current.focus();
          }}
          onBlur={() => setTitle(title.trim())}
          placeholder="제목을 입력하시오."
          returnKeyType="next"
          maxLength={20}
        />
        <Input
          ref={descriptionRef}
          label="글 내용"
          value={description}
          onChangeText={text => setDescription(text)}
          onSubmitEditing={() => {
            setDescription(description.trim());
            _handleCreateButtonPress();
          }}
          onBlur={() => setDescription(description.trim())}
          placeholder="공유하고 싶은 글을 작성하시오."
          returnKeyType="done"
          maxLength={80}
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="글 작성하기"
          onPress={_handleCreateButtonPress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default ChannelCreation;