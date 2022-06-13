import React, { useState, useRef, useEffect, useContext } from 'react';
import { ProgressContext, UserContext } from '../contexts';
import styled from 'styled-components/native';
import { Image, Input, Button } from '../components';
import { images } from '../utils/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert } from 'react-native';
import * as Location from 'expo-location';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 0 20px;
    padding-top: ${({ insets: { top } }) => top}px;
    padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;

const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
    color: ${({ theme }) => theme.errorText};
`;

const Login = ({ navigation }) => {
    const { spinner, setLogin } = useContext(ProgressContext);
    const {setUserEmail, setUserName, baseUrl, setRToken, setToken, setUserLongi, setUserLati ,setUserRegion} = useContext(UserContext);
    
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
      geoLocation();
    }, []);

    const getRegionApi = async (lati, longi) => {
      let fixedUrl = baseUrl+'/posts/geo?lati='+lati+"&longi="+longi; 
  
      let options = {
          method: 'GET', // Get 조회 //Post 값을 보낼때 
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
      };
    
      try {
          console.log(fixedUrl);
          let response = await fetch(fixedUrl, options);
          let res = await response.json();
          console.log(res)
         
          let result = res["success"];
          if(result !== true) {
            return false
          }else{
            console.log(res.data);
            setUserRegion(res.data);
            return true
          }
          
        } catch (error) {
          console.error(error);
        }
    };

    const geoLocation = async() => {
      try{
          const location = await Location.getCurrentPositionAsync();
          const {coords} = location;
          setUserLati(coords.latitude);
          setUserLongi(coords.longitude);
          let res = await getRegionApi(coords.latitude, coords.longitude);
          return res;
      } catch(error) {
          Alert.alert("위치를 찾을 수 없습니다.")
      }
  }

    const postApi = async () => {
      let fixedUrl = baseUrl+'/users/auth/signin'; 
      let Info;
          Info = {
              "email": email,
              "password": password
            }
  
      let options = {
          method: 'POST', // Get 조회 //Post 값을 보낼때 
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify( Info ),
      
      };
    
      try {
          console.log(fixedUrl)
          let response = await fetch(fixedUrl, options);
          let res = await response.json();
          console.log(res);
         
          let result = res["success"];
          if(result !== true) {
            return false
          }else{
            let aceessToken = res.data.accessToken;
            let refreshToken = res.data.refreshToken;
            setToken(aceessToken);
            setRToken(refreshToken);
            let getRes = await getApi(aceessToken);
            if(getRes==true){
              return true
            }else{
              return false
            }
          }
          
        } catch (error) {
          console.error(error);
        }
  
  }

    const getApi = async (accessToken) => {
      let fixedUrl = baseUrl+'/users/user'; 
  
      let options = {
          method: 'GET', // Get 조회 //Post 값을 보낼때 
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-AUTH-TOKEN' : accessToken
          },
      
      };
    
      try {
          let response = await fetch(fixedUrl, options);
          let res = await response.json();
          console.log(res);
          console.log(options)
         
          let result = res["success"];
          if(result !== true) {
            return false
          }else{
            setUserEmail(res.data.email)
            setUserName(res.data.name)
            return true
          }
          
        } catch (error) {
          console.error(error);
        }
  
  }
    
    useEffect(() => {
      setDisabled(!(email && password && !errorMessage));
    }, [email, password, errorMessage]);

    const _handleEmailChange = email => {
        const changedEmail = removeWhitespace(email);
        setEmail(changedEmail);
        setErrorMessage(
            validateEmail(changedEmail) ? '' : '이메일을 확인하세요.'
        );
    };
    const _handlePasswordChange = password => {
        setPassword(removeWhitespace(password));
    };

    const _handleLoginButtonPress = async () => {
        console.log("login bt click: "+email);
        setUserEmail(email);
        try {
          spinner.start();
          let res = await postApi();
          if(res) {
            setLogin.login();
          }
        } catch (e) {
          Alert.alert('로그인 에러', e.message);
        } finally {
          spinner.stop();
        }
      };

    return (
    <KeyboardAwareScrollView
    contentContainerStyle={{ flex: 1 }}
    extraHeight={20}
    >
        <Container insets={insets}>
            <Image url={images.logo} imageStyle={{ borderRadius: 8}} />
            <Input
            label="아이디"
            value={email}
            onChangeText={_handleEmailChange}
            onSubmitEditing={() => passwordRef.current.focus()}
            placeholder="아이디"
            returnKeyType="next"
            />
            <Input
            ref = {passwordRef}
            label="비밀번호"
            value={password}
            onChangeText={_handlePasswordChange}
            onSubmitEditing={_handleLoginButtonPress}
            placeholder="비밀번호"
            returnKeyType="done"
            isPassword
            />
            <ErrorText>{errorMessage}</ErrorText>
            <Button title="로그인" 
            onPress={_handleLoginButtonPress} 
            disabled={disabled} 
            />
            <Button
            title="회원가입하기"
            onPress={() => navigation.navigate("Signup")}
            isFilled={false}
            />
        </Container>
    </KeyboardAwareScrollView>
    );
};

export default Login;