import React, {useEffect, useState, useRef} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  Keyboard,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

import {
  __addDogProfile,
  __addDogImg,
} from '../../redux/modules/dogProfileSlice';
import {__getProfile, __editDogProfile} from '../../redux/modules/profileSlice';

import FastImage from 'react-native-fast-image';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

const InputDogProfileCard = ({item, index}) => {
  const dispatch = useDispatch();

  //Profile Data 가져오기
  const profile = useSelector(state => state.profile.profile);
  console.log('dog profile', profile[1]);

  //카메라
  const [openCamera, setOpenCamera] = useState(false);

  //이미지
  const [images, setImages] = useState([]);

  //data 값을 get
  useEffect(() => {
    console.log('강아지 data를 가져오자');
    dispatch(__getProfile());
  }, []);

  //ainput에서 text 로 바뀜
  const [isEdit, setIsEdit] = useState(true);

  //Add Input
  const inputRef = useRef();

  const [input, setInput] = useState({
    name: '',
    introduce: '',
    species: '',
    weight: '',
    birthday: '',
    bringDate: '',
  });

  const {name, introduce, species, weight, birthday, bringDate} = input;

  console.log('input', input);
  const onChange = (keyvalue, e) => {
    const {text} = e.nativeEvent;
    setInput({
      ...input,
      [keyvalue]: text,
    });
  };

  //수정과 저장 버튼
  const onPressEdit = () => {
    setIsEdit(!isEdit);
  };

  //Add dog profile
  const onPressAdd = e => {
    console.log('onPressAdd 안에', inputRef.current);
    dispatch(
      __addDogProfile({
        name: inputRef.current,
        introduce: inputRef.current,
        species: inputRef.current,
        weight: inputRef.current,
        birthday: inputRef.current,
        bringDate: inputRef.current,
      }),
    );
  };

  // useEffect(() => {}, []);

  //이미지,권한 설정
  useEffect(() => {
    if (Platform.OS !== 'ios' && Platform.OS !== 'android') return;
    const platformPermissions =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;
    const requestCameraPermission = async () => {
      try {
        const result = await request(platformPermissions);
        result === RESULTS.GRANTED
          ? setOpenCamera(true)
          : Alert.alert('카메라 권한을 허용해주세요!');
      } catch (error) {
        Alert.alert('카메라 권한설정이 에러났습니다.');
        console.warn(error);
      }
    };
    requestCameraPermission();
  }, []);

  //input 수정 폼 데이터

  const sendEditFormData = () => {
    const formData = new FormData();
    console.log('images[0]', images[0]);

    formData.append('name', name);
    formData.append('species', species);
    formData.append('weight', weight);
    formData.append('introduce', introduce);
    formData.append('birthday', birthday);
    formData.append('bringDate', bringDate);
    {
      images.length !== 0 &&
        formData.append('files', {
          name: images[0].fileName,
          type: images[0].mime,
          uri: `file://${images[0]?.realPath}`,
        });
    }

    console.log('dog edit profile');
    console.log('dog formData', formData);

    dispatch(__editDogProfile({id, formData: formData}));
    if (error === null) setIsEdit(false);
  };

  //이미지 클릭시 갤러리를 여는 이벤트
  const openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        usedCameraButton: true,
        mediaType: 'image',
        maxSelectedAssets: 1,
        selectedAssets: images,
        isExportThumbnail: true,
        isCrop: true,
        isCropCircle: true,
      });
      console.log('response: ', response);
      setImages(response);
    } catch (e) {
      console.log(e.code, e.message);
    }
  };

  return (
    <View style={styles.dogBlock}>
      <View style={styles.dogCardShadow} />

      <View style={styles.dogCard}>
        {/* <TouchableOpacity style={styles.saveBtn}>
            <Text>수정</Text>
          </TouchableOpacity>
   */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => {
            onPressAdd();
            onPressEdit();
          }}>
          {isEdit ? <Text>수정</Text> : <Text>저장</Text>}
        </TouchableOpacity>

        {isEdit ? (
          <FastImage
            style={styles.dogImg}
            source={{
              uri: profile[1]?.dogs[1]?.contentUrl,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        ) : (
          <View>
            <TouchableOpacity
              style={styles.dogImg}
              onPress={openPicker}
              vlue={openCamera}>
              {images.length !== 0 ? (
                <Image
                  width={IMAGE_WIDTH}
                  height={IMAGE_HEIGHT}
                  style={styles.media}
                  source={{
                    uri: `file:// ${images[0]?.realPath}`,
                  }}
                />
              ) : (
                <Text>사진등록</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.dogProfileInputWrap}>
          <View style={styles.dogInputWrapInner}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                margin: 5,
                paddingTop: 8,
              }}>
              <Text
                style={{
                  color: 'black',
                  zIndex: 2,
                  position: 'absolute',
                  fontSize: 13,
                  left: '15%',
                  top: '10%',
                  backgroundColor: '#ffffff',
                }}>
                강아지이름
              </Text>

              {isEdit ? (
                <Text
                  style={{
                    position: 'relative',
                    borderRadius: 5,
                    borderColor: 'gray',
                    width: '45%',
                    height: 50,
                    left: 5,
                  }}>
                  {profile[1].dogs[1].name}
                </Text>
              ) : (
                <TextInput
                  style={{
                    position: 'relative',
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: 'gray',
                    width: '45%',
                    height: 50,
                    left: 5,
                  }}
                  placeholder="김댕댕"
                  onChange={e => onChange('name', e)}
                  value={name}
                  onSubmitEditing={() => inputRef.current.focus()}
                  ref={inputRef}
                />
              )}
              <Text
                style={{
                  borderColor: 'gray',
                  width: '40%',
                  height: 50,
                  textAlign: 'center',
                }}>
                대표강아지
              </Text>
              <View style={styles.checkCircle} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                margin: 5,
                paddingTop: 8,
              }}>
              <Text
                style={{
                  color: 'black',
                  zIndex: 2,
                  position: 'absolute',
                  fontSize: 13,
                  top: 0,
                  left: '15%',
                  // borderWidth: 1,
                  backgroundColor: '#ffffff',
                }}>
                종류
              </Text>
              {isEdit ? (
                <Text
                  style={{
                    position: 'relative',

                    borderRadius: 5,
                    borderColor: 'gray',
                    width: '40%',
                    height: 50,
                    marginTop: '5%',
                  }}>
                  {profile[1].dogs[1].species}
                </Text>
              ) : (
                <TextInput
                  style={{
                    position: 'relative',
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: 'gray',
                    width: '40%',
                    height: 50,
                  }}
                  placeholder="요크셔테리어"
                  value={species}
                  onChange={e => onChange('species', e)}
                  ref={inputRef}
                />
              )}

              <Text
                style={{
                  color: 'black',
                  zIndex: 2,
                  position: 'absolute',
                  fontSize: 13,
                  top: 0,
                  right: '25%',
                  // borderWidth: 1,
                  backgroundColor: '#ffffff',
                }}>
                몸무게
              </Text>

              {isEdit ? (
                <Text
                  style={{
                    position: 'relative',
                    borderRadius: 5,
                    borderColor: 'gray',
                    width: '40%',
                    height: 50,
                    marginTop: '5%',
                  }}>
                  {profile[1].dogs[1].weight}
                </Text>
              ) : (
                <TextInput
                  style={{
                    position: 'relative',
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: 'gray',
                    width: '40%',
                    height: 50,
                  }}
                  placeholder="00kg"
                  value={weight}
                  keyboardType="numeric"
                  onChange={e => onChange('weight', e)}
                  ref={inputRef}
                />
              )}
            </View>

            <View
              style={{
                margin: 5,
                alignItems: 'center',
                paddingTop: 8,
              }}>
              <Text
                style={{
                  color: 'black',
                  zIndex: 2,
                  position: 'absolute',
                  fontSize: 13,
                  top: 0,
                  left: '15%',
                  // borderWidth: 1,
                  backgroundColor: '#ffffff',
                }}>
                강아지소개
              </Text>

              {isEdit ? (
                <Text
                  style={{
                    borderRadius: 5,
                    borderColor: 'gray',
                    width: '85%',
                    height: 50,
                    marginTop: '5%',
                  }}>
                  {profile[1].dogs[1].introduce}
                </Text>
              ) : (
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: 'gray',
                    width: '85%',
                    height: 50,
                  }}
                  placeholder="집사바라기"
                  value={introduce}
                  onChange={e => onChange('introduce', e)}
                  ref={inputRef}
                />
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                margin: 5,
                paddingTop: 8,
              }}>
              <Text
                style={{
                  color: 'black',
                  zIndex: 2,
                  position: 'absolute',
                  fontSize: 13,
                  top: 0,
                  left: '12%',
                  backgroundColor: '#ffffff',
                }}>
                태어난 날
              </Text>

              {isEdit ? (
                <Text
                  style={{
                    borderRadius: 5,
                    borderColor: 'gray',
                    width: '40%',
                    height: 50,
                    marginTop: '5%',
                  }}
                  placeholder="00.00.00">
                  {profile[1].dogs[1].birthday}
                </Text>
              ) : (
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: 'gray',
                    width: '40%',
                    height: 50,
                  }}
                  placeholder="00.00.00"
                  value={birthday}
                  keyboardType="numeric"
                  autoComplete="birthdate-full"
                  onChange={e => onChange('birthday', e)}
                  ref={inputRef}
                />
              )}

              <Text
                style={{
                  color: 'black',
                  zIndex: 2,
                  position: 'absolute',
                  fontSize: 13,
                  top: 0,
                  right: '20%',
                  backgroundColor: '#ffffff',
                }}>
                데려온 날
              </Text>

              {isEdit ? (
                <Text
                  style={{
                    position: 'relative',

                    borderRadius: 5,
                    borderColor: 'gray',
                    width: '40%',
                    height: 50,
                    marginTop: '5%',
                  }}
                  placeholder="yyyy-mm-dd">
                  {profile[1].dogs[1].bringDate}
                </Text>
              ) : (
                <TextInput
                  style={{
                    position: 'relative',
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: 'gray',
                    width: '40%',
                    height: 50,
                  }}
                  placeholder="yyyy-mm-dd"
                  value={bringDate}
                  keyboardType="numeric"
                  onChange={e => onChange('bringDate', e)}
                  ref={inputRef}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const IMAGE_WIDTH = 264;
const IMAGE_HEIGHT = 160;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dogBlock: {
    flex: 1,
  },

  dogCard: {
    width: 264,
    height: 444,
    borderRadius: 15,
    position: 'absolute',
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#00ff00',
  },
  dogCardShadow: {
    width: 264,
    height: 440,
    borderRadius: 15,
    top: '10%',
    shadowOpacity: 0.9,
    shadowRadius: 15,
    elevation: 5,
  },

  dogProfileInputWrap: {
    borderRadius: 15,
    backgroundColor: '#ffffff',
    bottom: 10,
  },

  dogImg: {
    width: 264,
    height: 160,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#ff0000',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  dogInputWrapInner: {
    width: 264,
    height: 284,
    justifyContent: 'center',
    borderWidth: 3,
  },

  saveBtn: {
    width: 30,
    height: 24,
    borderWidth: 1,
    zIndex: 2,
    position: 'relative',
    top: '50%',
    left: '40%',
  },
  media: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    backgroundColor: 'rgba(155, 155, 155, 0.2)',
  },
  // checkCircle: {
  //   borderWidth: 1,
  //   width: 24,
  //   height: 24,
  // },
});

export default InputDogProfileCard;
