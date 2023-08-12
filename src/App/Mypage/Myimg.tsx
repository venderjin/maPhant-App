import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// import { useSelector } from "react-redux";
import { PostAPI } from "../../Api/fetchAPI";
import { Spacer, TextButton } from "../../components/common";
// import UserStorage from "../../storage/UserStorage";

// const userID = useSelector(UserStorage.userProfileSelector)!.id;

// const getUserImg = (userID: number) => {
//   GetAPI(`/profile?targetUserId=${userID}`).then(res => {
//     console.log(res.success);
//   });
// };

const postUserImg = () => {
  PostAPI("/profile", {}).then(res => {
    console.log(res);
  });
};

// const img = getUserImg(userID);

const DefaultImg: React.FC = () => {
  // const url: string = imgSrc[0].img;
  // console.log(img);
  return (
    <Image
      style={{
        width: 100,
        height: 100,
        tintColor: "#5299EB",
      }}
      source={require("../../../assets/user.png")}
      // source={url}
    />
  );
};

const SelectedImg: React.FC = () => {
  return (
    <Image
      style={{
        width: 100,
        height: 100,
        tintColor: "#5299EB",
      }}
      source={{ uri: imageUrl }}
    />
  );
};

const Myimg: React.FC = () => {
  const [imgUploadMoal, setImgUploadModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [requsetpermission, setRequestPermission] = ImagePicker.useCameraPermissions();
  const [defaultImg, setDefaultImg] = useState(true);
  const [selectedImg, setSelectedImg] = useState(false);

  const uploadImage = async () => {
    console.log("hi");
    //권한 승인
    if (!requsetpermission?.granted) {
      const permission = await setRequestPermission();
      if (!permission.granted) {
        return null;
      }
    }

    //이미지 업로드
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });
    //이미지 업로드 취소시
    if (result.canceled) {
      return null;
    }
    //이미지 업로드 결과 및 이미지 경로 업데이트
    console.log(result.assets[0].uri);
    setImageUrl(result.assets[0].uri);
  };

  return (
    <View style={styles.profileImgContainer}>
      <TouchableOpacity
        onPress={() => {
          setImgUploadModal(true);
        }}
      >
        <Image
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            borderColor: "#aaa",
            borderWidth: 2,
          }}
          source={defaultImg == true ? require("../../../assets/user.png") : { uri: imageUrl }}
        />
      </TouchableOpacity>
      <Modal animationType="fade" transparent={true} visible={imgUploadMoal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={{ alignItems: "flex-end" }}
              onPress={() => {
                setImgUploadModal(false);
              }}
              hitSlop={{ top: 32, bottom: 32, left: 32, right: 32 }}
            >
              <AntDesign name="closecircle" size={20} color="#aaa" />
            </TouchableOpacity>
            {/* <Spacer size={5} /> */}
            <View style={{ alignItems: "center" }}>
              <Text style={styles.Moaltext}>프로필 사진을 선택해주세요</Text>
            </View>
            <Spacer size={20} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  borderColor: "#aaa",
                  borderWidth: 5,
                }}
                source={
                  defaultImg == true ? require("../../../assets/user.png") : { uri: imageUrl }
                }
              />
              <Spacer size={10} />
            </View>
            <Spacer size={20} />
            <View style={styles.modalBtnDirection}>
              <TextButton
                style={styles.modalConfirmBtn}
                onPress={() => {
                  setImgUploadModal(false);
                  setDefaultImg(true);
                  setSelectedImg(false);
                }}
              >
                삭제
              </TextButton>
              <TextButton
                style={styles.modalConfirmBtn}
                onPress={() => {
                  uploadImage();
                  setDefaultImg(false);
                  setSelectedImg(true);
                }}
              >
                수정
              </TextButton>
            </View>
            <Spacer size={5} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImgContainer: {
    paddingVertical: 5,
    // backgroundColor: "green",
  },
  modalConfirmBtn: {
    width: "45%",
  },
  modalBtnDirection: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modifyingContentWidth: {
    width: "75%",
  },
  modalBackground: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    flex: 0.8,
    borderRadius: 25,
    backgroundColor: "#ffffff",
    padding: 15,
  },
  modalInput: {
    width: "100%",
    paddingVertical: "5%",
    backgroundColor: "#D8E1EC",
  },
  Moaltext: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
export default Myimg;
