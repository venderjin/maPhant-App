import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import CheckBox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import { sha512 } from "js-sha512";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity } from "react-native";

import { boardPost } from "../../Api/board";
import { statusResponse } from "../../Api/fetchAPI";
import { BoardType } from "../../App/Board/BoardList";
import { Container, Input, Spacer, TextButton } from "../../components/common";
import { NavigationProps } from "../../Navigator/Routes";
import UserStorage from "../../storage/UserStorage";

function uploadAPI<T extends statusResponse>(
  method: string = "POST",
  url: string,
  body?: FormData,
) {
  return UserStorage.getUserToken().then(token => {
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    setTimeout(() => abortController.abort(), 10000);

    const options: RequestInit = {
      method: method,
      signal: abortSignal,
      headers: {},
    };
    console.info(token);
    if (token != undefined) {
      // @ts-expect-error
      options.headers["x-auth"] = token.token;
      // @ts-expect-error
      options.headers["x-timestamp"] = Math.floor(Date.now() / 1000);
      // @ts-expect-error
      options.headers["x-sign"] = sha512(
        // @ts-expect-error
        `${options.headers["x-timestamp"]}${token.privKey}`,
      );
    }

    if (method != "GET") {
      options.body = body;
    }

    const url_complete = `https://dev.api.tovelop.esm.kr${url}`;
    console.info(url_complete, options);
    return fetch(url_complete, options)
      .catch(err => {
        console.warn(method, url_complete, body, err);
        if (err.name && (err.name === "AbortError" || err.name === "TimeoutError")) {
          return Promise.reject("서버와 통신에 실패 했습니다 (Timeout)");
        }

        return Promise.reject("서버와 통신 중 오류가 발생했습니다.");
      })
      .then(res => {
        console.log(res);
        console.info(res.body);
        // 특수 처리 (로그인 실패시에도 401이 들어옴)
        // 로그인의 경우는 바로 내려 보냄
        if (url == "/user/login") {
          return res.json();
        }

        if (res.status === 401) {
          // 로그인 안됨 (unauthorized)
          UserStorage.removeUserData();
          return Promise.reject("로그인 토큰이 만료되었습니다.");
        }

        return res.json();
      })
      .then(json => {
        console.log(json);
        const resp = json as T;

        return Promise.resolve({ json: resp });
      });
  });
}

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

  const [postImageUrl, setPostImageUrl] = useState<string[]>([]);

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
    console.log(postImageUrl);
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
        postImageUrl, // 이새끼가 자꾸 null 로 들어감 개빡침
        // ["https://tovelope.s3.ap-northeast-2.amazonaws.com/image_1.jpg"]
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
      await uploadImageAsync(selectedImages);
    } catch (error) {
      console.error("Image upload error:", error);
      // Handle the error
    }
    setImageUrl(selectedImages.map(image => image.uri));

    console.log("selectedImages", selectedImages);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function uploadImageAsync(images: any[]) {
      const formData = new FormData();
      console.log(images);

      images.forEach((image, index) => {
        // @ts-expect-error
        formData.append("files", {
          uri: image.uri,
          type: "image/jpeg",
          name: `image_${index + 1}.jpg`,
        });
      });

      console.log(formData);

      try {
        // const response = await uploadAPI(formData);
        const response = uploadAPI("POST", "/image", formData);
        console.log("Image upload response:", (await response).json);
        const jsonResponse = (await response).json;
        for (const item of jsonResponse) {
          const imageUrl = item.url;
          postImageUrl.push(imageUrl);
        }
        setPostImageUrl(postImageUrl);
      } catch (error) {
        console.error("Image upload error:", error);
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
