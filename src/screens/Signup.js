import React, { useState, useRef, useEffect, useContext } from 'react';
import { ProgressContext, UserContext } from '../contexts';
import styled from 'styled-components/native';
import { Image, Input, Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import { images } from '../utils/images';
import { Alert } from 'react-native';
import { signup } from '../utils/firebase';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 40px 20px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const Signup = () => {
    const { dispatch } = useContext(UserContext);
    const { spinner } = useContext(ProgressContext);
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const didMountRef = useRef();
    const [photoUrl, setPhotoUrl] = useState(images.photo);

    useEffect(() => {
        if (didMountRef.current) {
            let _errorMessage = '';
            if (!name) {
                _errorMessage = '닉네임을 입력해주세요.';
            } else if (!validateEmail(email)) {
                _errorMessage = '이메일을 확인하세요.';
            } else if (password.length < 6) {
                _errorMessage = '6자 이상의 비밀번호를 입력해주세요.';
            } else if (password !== passwordConfirm) {
                _errorMessage = '비밀번호 확인이 필요합니다.';
            } else {
                _errorMessage = '';
            }
            setErrorMessage(_errorMessage);
        } else {
            didMountRef.current = true;
        }
    }, [name, email, password, passwordConfirm]);

    useEffect(() => {
        setDisabled(
            !(name && email && password && passwordConfirm && !errorMessage)
        );
    }, [name, email, password, passwordConfirm, errorMessage]);

    const _handleSignupButtonPress = async () => {
        try {
          spinner.start();
          const user = await signup({ email, password, name, photoUrl });
          dispatch(user);
        } catch (e) {
          Alert.alert('Signup Error', e.message);
        } finally {
          spinner.stop();
        }
      };

    return (
        <KeyboardAwareScrollView
        extraScrollHeight={20}
        >
            <Container>
                <Image rounded url={photoUrl} showButton onChangeImage={url => setPhotoUrl(url)}/>
                <Input
                label = "닉네임"
                value={name}
                onChangeText = {text => setName(text)}
                onSubmitEditing = {() => {
                    setName(name.trim());
                    emailRef.current.focus();
                }}
                onBlur={() => setName(name.trim())}
                placeholder="닉네임을 입력하시오."
                returnKeyType="next"
                />
                <Input
                ref={emailRef}
                label="이메일"
                value={email}
                onChangeText={text => setEmail(removeWhitespace(text))}
                onSubmitEditing={() => passwordRef.current.focus()}
                placeholder="이메일을 입력하시오."
                returnKeyType="next"
                />
                <Input
                ref={passwordRef}
                label="비밀번호"
                value={password}
                onChangeText={text => setPassword(removeWhitespace(text))}
                onSubmitEditing={() => passwordConfirmRef.current.focus()}
                placeholder="비밀번호를 입력하시오."
                returnKeyType="done"
                isPassword
                />
                <Input
                ref={passwordConfirmRef}
                label="비밀번호 확인"
                value={passwordConfirm}
                onChangeText={text => setPasswordConfirm(removeWhitespace(text))}
                onSubmitEditing={_handleSignupButtonPress}
                placeholder="비밀번호를 입력하시오."
                returnKeyType="done"
                isPassword
                />
                <ErrorText>{errorMessage}</ErrorText>
                <Button
                title="회원가입 하기"
                onPress={_handleSignupButtonPress}
                disabled={disabled}
                />
            </Container>
            </KeyboardAwareScrollView>
        );
    };

export default Signup;