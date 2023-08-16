import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import CheckBox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import { boardPost, ImageUpload } from "../../Api/board";
import { BoardType } from "../../App/Board/BoardList";
import { Container, Input, Spacer, TextButton } from "../../components/common";
import { NavigationProps } from "../../Navigator/Routes";
import UserStorage from "../../storage/UserStorage";
import { UserCategory, UserData } from "../../types/User";

const Post: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [hashtagInput, setHashtagInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [checkList, setCheckList] = useState<string[]>([]);
  const [isanonymous, setIsanonymous] = useState(0);
  const [isHide, setIsHide] = useState(0);

  const [requsetpermission, setRequestPermission] = ImagePicker.useCameraPermissions();
  const [imageUrl, setImageUrl] = useState<string[]>([]);

  const params = useRoute().params as { boardType: BoardType };
  const boardType = params?.boardType;
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    // 받아온 게시판 타입(boardType)을 이용하여 필요한 작업 수행
    console.log("게시판 타입:", boardType);
  }, [boardType]);

  const check = (name: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckList([...checkList, name]);
    } else {
      setCheckList(checkList.filter(choice => choice !== name));
    }
  };

  const complete = async () => {
    try {
      const response = await boardPost(
        null,
        boardType.id,
        title,
        body,
        isHide,
        0,
        isanonymous,
        //hashtags.join(" "),
      );
      console.log("게시물 작성 성공", response);
      // console.log(categoryId, userId, boardType.id, title, body);
      navigation.navigate("DetailList", { boardType: boardType });
    } catch (error) {
      console.error("게시물 작성 오류", error);
    }
  };

  const updateHashtags = () => {
    const words = hashtagInput.split("");
    const newHashtags = words.filter(word => word.startsWith("#"));
    setHashtags(newHashtags);
  };

  const addHashtag = () => {
    if (hashtagInput.trim() !== "") {
      updateHashtags();
      setHashtagInput("");
    }
  };

  const uploadImage = async () => {
    console.log("사진 올려지나여");
    if (!requsetpermission?.granted) {
      const permission = await setRequestPermission();
      if (!permission.granted) {
        return null;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    //이미지 업로드 취소시
    if (result.canceled) {
      return null;
    }
    const selectedImages = result.assets.slice(0, 5);

    try {
      // Call the uploadImageAsync function to upload the selected images
      await uploadImageAsync(result.assets.uri, selectedImages);
    } catch (error) {
      console.error("Image upload error:", error);
      // Handle the error
    }
    setImageUrl(selectedImages.map(image => image.uri));

    console.log("selectedImages", selectedImages);
    async function uploadImageAsync(uri: string, selectedImages: any) {
      const formData = new FormData();
      for (const name in selectedImages) {
        formData.append(name, selectedImages[name]);
      }
      try {
        // Call the ImageUpload function to upload the selected images
        const response = await ImageUpload(formData);
        console.log("Image upload response:", response);
        // Handle the response as needed
      } catch (error) {
        console.error("Image upload error:", error);
        // Handle the error
      }
    }
  };

  return (
    <Container isFullScreen={true}>
      <Container style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Container
          style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}
        >
          <Container style={{ flexDirection: "row", marginRight: 10 }}>
            <CheckBox
              style={{ marginRight: 5 }}
              value={checkList.includes("private")}
              onValueChange={isChecked => {
                check("private", isChecked);
                setIsHide(isChecked ? 1 : 0);
              }}
            ></CheckBox>
            <Text>비공개</Text>
          </Container>
          <Container style={{ flexDirection: "row" }}>
            <CheckBox
              style={{ marginRight: 5 }}
              value={checkList.includes("anonymous")}
              onValueChange={isChecked => {
                check("anonymous", isChecked);
                setIsanonymous(isChecked ? 1 : 0);
              }}
            ></CheckBox>
            <Text>익명</Text>
          </Container>
        </Container>
        <Container style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={uploadImage}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
        </Container>
        <Container style={{ flexDirection: "row" }}>
          <TextButton onPress={complete}>완료</TextButton>
        </Container>
      </Container>
      <Container>
        <Input
          placeholder="제목"
          onChangeText={text => setTitle(text)}
          value={title}
          multiline={true}
        ></Input>
        <Spacer size={20} />
        <Input
          placeholder="해시태그"
          onChangeText={text => setHashtagInput(text)}
          value={hashtagInput}
          multiline={true}
          onSubmitEditing={addHashtag}
        ></Input>
        <Spacer size={10} />
        {hashtags.map((tag, index) => (
          <Text key={index}>{tag}</Text>
        ))}
        <Spacer size={20} />
        <Input
          style={{ height: "40%" }}
          placeholder="본문"
          onChangeText={text => setBody(text)}
          value={body}
          multiline={true}
        ></Input>
        <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
          <Spacer size={20} />
          {Array.isArray(imageUrl) &&
            imageUrl.map((uri, index) => (
              <Image
                key={index}
                source={{ uri: uri }}
                style={{ width: 200, height: 200, marginRight: 5 }} // 이미지 간 간격을 조절해줍니다.
              />
            ))}
        </ScrollView>
      </Container>
    </Container>
  );
};

export default Post;
