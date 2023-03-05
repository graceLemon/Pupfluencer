import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList, Image} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/core';
import {io} from 'socket.io-client';
import {SOCKET_URL} from '@env';
import {useIsFocused} from '@react-navigation/core';

import {Colors} from '../constants/colors';
import FastImage from 'react-native-fast-image';
import GoBackButton from '../components/common/GoBackButton';
const MessageBox = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();
  // useEffect로 받은 본인의 nickname
  const {token} = route.params;
  console.log(token, 'messagebox에서 토큰값확인');

  //연결유무
  const [socket, setSocket] = useState(null);
  //채팅방 리스트
  const [dmUserList, setDmUserList] = useState('');
  useEffect(() => {
    // Connect to the Socket.io server
    const newSocket = io(`${SOCKET_URL}/DMList`, {
      extraHeaders: {
        authorization: token,
      },
    });

    // Listen for connection success and set the socket state
    newSocket.on('connect', () => {
      // console.log('Connected to server');
      setSocket(newSocket);
    });
    newSocket.on('DMList', data => {
      // console.log(data, 'DMlist 데이터');
      setDmUserList(data);
    });

    // newSocket.on('newDM', data => {
    //   console.log('Received message: ', data);
    //   setMessage(data);
    // });
    if (!isFocused) {
      newSocket.disconnect();
      console.log('화면 이동시에도 연결해제');
    }
    //페이지 이동시(disconnect)
    return () => {
      newSocket.disconnect();
      console.log('요청종료, 리스트');
      // 리스트 밖으로 나갈떄만 꺼짐, 들어갈 때는 켜져있음.
    };
  }, [isFocused]);

  const accessRoomHandler = value => {
    navigation.push('DirectMessage', {value, token});
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.userButton}>
        <GoBackButton />
      </View>
      <View style={styles.logoWrapper}>
        <Image
          source={require('../assets/LogoSmall.png')}
          resizeMode={'cover'}
        />
        <Text style={styles.logoText}>메시지</Text>
      </View>
      <View style={styles.userRoomWrapper}>
        <FlatList
          data={dmUserList}
          renderItem={({item}) => (
            <View style={styles.roomCardWrapper}>
              <Pressable
                onPress={() =>
                  accessRoomHandler({
                    roomId: item.roomId,
                    profileUrl: item.profileUrl,
                    nickname: item.nickname,
                  })
                }
                style={styles.pressArea}>
                <FastImage
                  style={styles.profileImageWrapper}
                  source={{
                    uri: item.profileUrl,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <View style={styles.textAlinger}>
                  <Text style={styles.nickNameFont}>{item.nickname}</Text>
                  <Text style={styles.lastMessageFont}>{item.lastChat}</Text>
                </View>
                <View style={styles.detailInformation}>
                  <Text style={styles.timeGapText}>{item.timeGap}</Text>
                  <View style={styles.unreadCountHolder}>
                    <Text style={styles.unreadCount}>{item.unreadCount}</Text>
                  </View>
                </View>
              </Pressable>
            </View>
          )}
          keyExtractor={item => item.roomId}
        />
      </View>
    </View>
  );
};

export default MessageBox;

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  userButton: {
    position: 'absolute',
    height: '7.6%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: '7%',
    // backgroundColor: 'white',
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  logoText: {
    marginLeft: 10,
    lineHeight: 32,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 28,
    color: Colors.pointColorDark,
  },
  userRoomWrapper: {
    position: 'absolute',
    marginTop: '15%',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  profileImageWrapper: {
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: 'gray',
  },
  roomCardWrapper: {
    paddingLeft: '5%',
    // backgroundColor: 'white',
    width: '100%',
  },
  pressArea: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 76,
  },
  nickNameFont: {
    fontSize: 16,
    paddingBottom: '1%',
  },
  lastMessageFont: {
    fontSize: 10,
  },
  textAlinger: {
    marginLeft: '4%',
    width: '60%',
  },
  detailInformation: {
    position: 'absolute',
    right: '4%',
  },
  timeGapText: {
    fontSize: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  unreadCountHolder: {
    borderRadius: 10,
    backgroundColor: Colors.pointColorDark,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
  },
  unreadCount: {
    fontSize: 10,
    color: 'white',
  },
});
