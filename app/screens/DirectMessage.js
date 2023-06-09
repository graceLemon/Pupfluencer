import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {io} from 'socket.io-client';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native';
import {SOCKET_URL} from '@env';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  saveMessages,
  addRecentMessage,
  deleteMessageStack,
} from '../redux/modules/userDMSlice';
import {Colors} from '../constants/colors';
import GoBackButton from '../components/common/GoBackButton';
import SendDM from '../components/svg/SendDM';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import MyText from '../components/common/MyText';

const DirectMessage = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const isFocused = useIsFocused();
  const {token} = route.params;
  const {value} = route.params;
  const [socket, setSocket] = useState(null);
  const [messageLength, setMessageLength] = useState(1); // 상대방과 대화한 총 대화길이
  //인풋창에 쓰는 내가 작성한 메시지
  const {userDM} = useSelector(state => state.userDM);

  const [myDM, setMyDM] = useState('');

  const onChangeInputHandler = e => {
    setMyDM(e);
  };

  const handleSendMessage = () => {
    if (socket && myDM !== '') {
      socket.emit('dm', {message: myDM});
      console.log('Sent message: ', myDM);
      setMyDM('');
    }
  };

  useEffect(() => {
    // Connect to the Socket.io server
    const newSocket = io(`${SOCKET_URL}/dm/${value.roomId}`, {
      extraHeaders: {
        authorization: token,
      },
    });

    // Listen for connection success and set the socket state
    newSocket.on('connect', () => {
      // console.log('Connected to server, dm');
      setSocket(newSocket);
    });
    //있었던거 전부다.
    newSocket.on('getMessages', data => {
      console.log(data, 'getMessages 데이터');
      dispatch(saveMessages(data));
      // setTotalMessage(data);
    });

    // Listen for incoming messages and update the message state
    newSocket.on('newDM', data => {
      // console.log('Received message: ', data);

      dispatch(addRecentMessage(data));
    });
    if (!isFocused) {
      newSocket.disconnect();
    }
    // Disconnect from the server when the component is unmounted
    return () => {
      // newSocket.disconnect();
      newSocket.disconnect();
      dispatch(deleteMessageStack());
      // console.log('연결해졔');
    };
  }, []);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        style={{backgroundColor: 'white'}}
        behavior="heigth">
        <View style={styles.wrapper}>
          <View style={styles.userButton}>
            <GoBackButton />
          </View>
          <View style={styles.dmHeaderBox}>
            <View style={styles.logoWrapper}>
              <Image
                source={require('../assets/LogoSmall.png')}
                resizeMode={'cover'}
              />
              <Text style={styles.logoText}>메시지</Text>
            </View>
            <View style={styles.targetProfileBox}>
              <FastImage
                style={styles.targetProfileImage}
                source={{
                  uri: value.profileUrl,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <MyText style={styles.targetFont}>{value.nickname}</MyText>
            </View>
          </View>
          <View style={styles.chatListWrapper}>
            {userDM && (
              <FlatList
                data={userDM}
                inverted={true}
                renderItem={({item, index}) => (
                  <View>
                    {userDM.length > index + 1 &&
                      userDM[index].createdAt.substr(0, 10) !==
                        userDM[index + 1].createdAt.substr(0, 10) && (
                        <View style={styles.dateTeller}>
                          <MyText style={{fontSize: 8}}>
                            {userDM[index].createdAt.substr(0, 4)}년{' '}
                            {userDM[index].createdAt.substr(5, 2)}월{' '}
                            {userDM[index].createdAt.substr(8, 2)}일{' '}
                          </MyText>
                        </View>
                      )}
                    {userDM.length === index + 1 && (
                      <View style={styles.dateTeller}>
                        <MyText style={{fontSize: 8}}>
                          {userDM[index].createdAt.substr(0, 4)}년{' '}
                          {userDM[index].createdAt.substr(5, 2)}월{' '}
                          {userDM[index].createdAt.substr(8, 2)}일{' '}
                        </MyText>
                      </View>
                    )}
                    <View
                      style={
                        dynamicStyles(value.nickname === item.receiver.nickname)
                          .userConversationWrapper
                      }>
                      <View
                        style={
                          dynamicStyles(
                            value.nickname === item.receiver.nickname,
                          ).userConversationBox
                        }>
                        <MyText numberOfLines={10} style={styles.textContent}>
                          {item.message}
                        </MyText>
                      </View>
                      <MyText style={styles.textCreatedAt}>
                        {item.createdAt.substr(11, 2)}시{' '}
                        {item.createdAt.substr(14, 2)}분
                      </MyText>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index}
                horizontal={false}
              />
            )}
          </View>

          <View style={styles.KeyboardView}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInputStyler}
                placeholder="메시지 입력하기"
                value={myDM}
                onChangeText={onChangeInputHandler}
                maxLength={150}
              />
              <Pressable
                style={({pressed}) => dynamicStyles(pressed).sendMsgArea}
                onPress={handleSendMessage}>
                <View style={styles.sendIconPositioner}>
                  <SendDM />
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DirectMessage;

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  userButton: {
    position: 'absolute',
    marginTop: 12,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: '7%',
    zIndex: 20,
  },
  dmHeaderBox: {
    // backgroundColor: 'red',
    width: '100%',
    elevation: 4,
    zIndex: 15,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    backgroundColor: 'white',
  },
  logoText: {
    marginLeft: 10,
    lineHeight: 32,
    marginTop: 4,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 28,
    color: Colors.pointColorDark,
    fontFamily: 'SBAggro-M',
  },
  targetProfileBox: {
    width: '100%',
    paddingTop: 16,
    flexDirection: 'row',
    paddingHorizontal: 28,
    backgroundColor: 'white',
    paddingBottom: 8,
  },
  targetProfileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '14%',
    marginLeft: '7%',
    height: '100%',
  },
  targetProfileImage: {
    height: 28,
    width: 28,
    borderRadius: 100,
    backgroundColor: 'gray',
  },
  targetFont: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    marginLeft: '3%',
    paddingTop: 5,
  },
  chatListWrapper: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  KeyboardView: {
    width: '100%',
    height: 96,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    borderRadius: 5,
    borderWidth: 1,
    borderBottomColor: 'ligthgray',
  },
  textInputStyler: {
    fontSize: 14,
    padding: 0,
    paddingLeft: '5.5%',
    height: '100%',
    width: '70%',
    color: '#262626',
  },

  sendIconPositioner: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendMsgArea: {
    zIndex: 3,
    width: '25%',
    alignItems: 'flex-end',
    height: '100%',
    justifyContent: 'center',
    paddingRight: 20,
  },
  textCreatedAt: {
    fontSize: 8,
    fontWeight: 'light',
  },
  textContent: {
    fontSize: 14,
    lineHeight: 24,
    padding: 0,
    // lineHeight: ,
  },
  dateTeller: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 12,
  },
});

const dynamicStyles = value =>
  StyleSheet.create({
    userConversationWrapper: {
      flexDirection: value ? 'row-reverse' : 'row',
      alignItems: 'flex-end',
      marginBottom: 8,
    },
    userConversationBox: {
      maxWidth: 252,
      padding: 16,
      backgroundColor: value ? Colors.pointColorBright : 'transparent',
      borderWidth: 1,
      borderColor: Colors.pointColorBright,
      borderBottomEndRadius: 20,
      borderBottomStartRadius: 20,
      borderTopStartRadius: value ? 20 : 4,
      borderTopEndRadius: value ? 4 : 20,
    },
    sendMsgArea: {
      zIndex: 3,
      width: '25%',
      alignItems: 'flex-end',
      height: '100%',
      justifyContent: 'center',
      paddingRight: 20,
      opacity: value ? 0.5 : 1,
    },
  });
