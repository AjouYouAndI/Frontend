import React, { useState, useRef, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { ProgressContext } from '../contexts';
import { createChannel } from '../utils/firebase';
import styled from 'styled-components/native';
import { Input, Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
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

  const _handleCreateButtonPress = async () => {
    try {
      spinner.start();
      const id = await createChannel({ location, title, description });
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
          label="작성 위치"
          placeholder="..."
        />
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
          label="감정 및 설명"
          value={description}
          onChangeText={text => setDescription(text)}
          onSubmitEditing={() => {
            setDescription(description.trim());
            _handleCreateButtonPress();
          }}
          onBlur={() => setDescription(description.trim())}
          placeholder="감정 및 설명을 쓰시오."
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