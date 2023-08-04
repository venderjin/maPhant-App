import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Dimensions,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { Container, ImageBox, Spacer, TextThemed } from "../../components/common";
import { NavigationProps } from "../../Navigator/Routes";
import { ThemeContext } from "../Style/ThemeContext";
interface Tags {
  id: string | undefined;
  title: string | undefined;
}
// type homeScreenProps = NativeStackScreenProps

const Home: React.FC = () => {
  // * Search
  const [text, setText] = useState<string>("");

  const [info, setInfo] = useState<[ImageSourcePropType, () => void][]>([
    [
      require("../../../assets/image1.png"),
      () => {
        alert("1");
      },
    ],
    [
      require("../../../assets/image2.png"),
      () => {
        alert("2");
      },
    ],
    [
      require("../../../assets/image3.png"),
      () => {
        alert("3");
      },
    ],
  ]); // 들어갈 컨텐츠

  // function mapInfo() {
  //   return info.map((info, index) => createInfoView(info, index));
  // }

  // Info *

  // HotTags *

  return (
    //view화면
    <Container isFullScreen={true} paddingHorizontal={0}>
      <MainHeader />
      <SearchBar text={text} onTextChanged={setText} />

      <ScrollView style={{ height: Dimensions.get("window").height }}>
        <Carousel imageList={info} />
        <Spacer size={20} />
        <TodaysHot />
        <Spacer size={40} />
        <Advertisements />
        <Spacer size={20} />
        <ToolBox />
      </ScrollView>
    </Container>
  );
};

const MainHeader: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const styles = StyleSheet.create({
    titleContainer: {
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: "3%",
      paddingRight: "3%",
    },
    titleText: {
      fontSize: 35,
      marginLeft: "4%",
      fontWeight: "bold",
    },
    iconContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
    },
  });

  const [isDark, setIsDark] = useContext(ThemeContext);

  const changeMode = useCallback(() => {
    setIsDark(!isDark);
  }, [isDark]);

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>software</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={{
            justifyContent: "center",
          }}
          onPress={changeMode}
        >
          <Icon
            name="moon-outline"
            size={30}
            color="#666666"
            style={{
              marginRight: "5%",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
          }}
        >
          <Icon
            name="notifications-outline"
            size={30}
            color="#666666"
            style={{
              marginRight: "5%",
            }}
            onPress={() => {
              navigation.navigate("alarm", 10);
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SearchBar: React.FC<{ text: string; onTextChanged: (text: string) => void }> = props => {
  const { text, onTextChanged } = props;

  const styles = StyleSheet.create({
    searchContainer: {
      height: 60,
      flexDirection: "row",
      justifyContent: "center",
    },
    searchBox: {
      flex: 1,
      flexDirection: "row",
      marginTop: "2.5%",
      marginBottom: "2.5%",
      marginLeft: "5%",
      marginRight: "5%",
      paddingLeft: "3%",
      paddingRight: "3%",
      backgroundColor: "#D8E1EC",
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "space-between",
    },
  });

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
        <View>
          <Icon name="search" size={25} color="#666666" style={{}} />
        </View>
        <TextInput
          value={text}
          onChangeText={onTextChanged}
          returnKeyType="search"
          onEndEditing={() => console.log("Search Text Update Done")}
          style={{
            flex: 1,
            height: "100%",
            marginLeft: "3%",
            marginRight: "3%",
          }}
        />
        <TouchableOpacity onPress={() => onTextChanged("")}>
          <Icon name="close" size={25} color="#666666" style={{}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Carousel: React.FC<{ imageList: [ImageSourcePropType, () => void][] }> = props => {
  const { imageList } = props;
  const [currentinfoPage, setCurrentinfoPage] = useState(0);
  const infoPageCount = 3; // 페이지

  const SCREEN_WIDTH = useWindowDimensions().width;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const infoPage = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentinfoPage(infoPage);
  };

  const CreateInfoView: React.FC<{
    imageList: [ImageSourcePropType, () => void][];
    currentPage: number;
  }> = props => {
    const { imageList, _currentPage } = props;
    return (
      <>
        {imageList.map(([image, action], idx) => (
          <Pressable key={idx} onPress={action} style={{ paddingHorizontal: 16, height: 250 }}>
            <ImageBox source={image} width={SCREEN_WIDTH - 16 * 2} height={250} borderRadius={8} />
          </Pressable>
        ))}
      </>
    );
  };

  const styles = StyleSheet.create({
    infoDotBox: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 10,
    },
    infoDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: "gray",
      marginHorizontal: 5,
    },
    activeinfoDot: {
      backgroundColor: "#5299EB",
    },
    unactiveinfoDot: {
      backgroundColor: "#CBD7E6",
    },
  });

  return (
    <View>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ borderRadius: 18 }}
      >
        <CreateInfoView imageList={imageList} currentPage={currentinfoPage} />
      </ScrollView>

      <View style={styles.infoDotBox}>
        {Array.from({ length: infoPageCount }, (_, index) => (
          <View
            key={index}
            style={[
              styles.infoDot,
              index === currentinfoPage ? styles.activeinfoDot : styles.unactiveinfoDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const TodaysHot: React.FC = () => {
  // * HotTags
  const [tags, setTags] = useState<Tags[]>([
    //useState를 이용해 상태 변경
    { id: "1", title: "#오정민" }, //초기값 설정
    { id: "2", title: "#앗뜨거 앗뜨" },
    { id: "3", title: "#부트캠프" },
    { id: "4", title: "#React" },
    { id: "5", title: "#React-Native" },
    { id: "6", title: "Node.js" },
    { id: "7", title: "과끼리" },
    { id: "8", title: "Tovelop" },
  ]);

  useEffect(() => {
    // 백엔드에서 데이터를 받아 상태 변경 tagFetchData();
  }, []);

  /*const tagFetchData = async () => {
      try {
        // 백엔드에서 데이터를 받아오는 비동기 요청
        const response = await fetch('API');
        const data = await response.json();
  
        // 받아온 데이터를 기반으로 배열 생성 후 상태 변경
        const tagList: Tags[] = data.map((tag: any) => ({
          id: tags.id,
          title: tags.title,
        }));
  
        setTags(tagList);
      } catch (error) {
        console.error('Fetching data error :', error);
      }
    };*/

  const createTagView = (tag: Tags, index: number) => {
    const colors = [
      "#FFC0CB",
      "#B5EEEA",
      "#CCCCCC",
      "#FFA07A",
      "#FFD700",
      "#ADFF2F",
      "#00FFFF",
      "#EE82EE",
      "#FFFF00",
    ];
    return (
      <View
        key={tag.id}
        style={{
          flex: 1,
          backgroundColor: colors[index % colors.length],
          justifyContent: "flex-start",
          alignItems: "center",
          marginLeft: 4,
          paddingVertical: 8,
          paddingHorizontal: 12,
          height: 36,
          borderRadius: 30,
        }}
      >
        <Text>{tag.title}</Text>
      </View>
    );
  };

  function mapTag() {
    return tags.map((tag, index) => createTagView(tag, index));
  }

  const styles = StyleSheet.create({
    todaysHotTitleBox: {
      padding: 16,
      flex: 1,
      flexDirection: "row",
      //backgroundColor: "skyblue",
      alignItems: "center",
    },

    todaysHotTitleText: {
      fontSize: 25,
      fontWeight: "bold",
    },
    todaysHotTagBox: {
      flex: 1,
      flexDirection: "row",
      //backgroundColor: "purple",
    },
  });

  return (
    <View>
      <View style={styles.todaysHotTitleBox}>
        <TextThemed style={styles.todaysHotTitleText}> 🔥오늘의</TextThemed>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "red",
          }}
        >
          {" "}
          HOT
        </Text>
        <TextThemed style={styles.todaysHotTitleText}> 키워드🔥</TextThemed>
      </View>

      <ScrollView
        horizontal={true}
        keyboardDismissMode="none"
        showsHorizontalScrollIndicator={false}
        style={styles.todaysHotTagBox}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {mapTag()}
      </ScrollView>
    </View>
  );
};

const Advertisements: React.FC = () => {
  const screen_width = useWindowDimensions().width;
  // const styles = StyleSheet.create({
  //   advertisementContainer: {
  //     height: 300,
  //     backgroundColor: "pink",
  //   },
  // });

  // return <View style={styles.advertisementContainer}>
  return <ImageBox source={require("../../../assets/adv1.png")} width={screen_width} />;
  // </View>
};
const ToolBox: React.FC = () => {
  const styles = StyleSheet.create({
    homeBlockLayout: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
    },
    homeBlockContainer: {
      width: "100%",
      justifyContent: "space-between",
      flexDirection: "row",
    },
    homeBlock: {
      width: "23%",
      height: 40,
      padding: 4,
      backgroundColor: "skyblue",
      alignItems: "center",
      borderColor: "black",
      justifyContent: "center",
      borderRadius: 15,
    },
  });

  return (
    <View style={styles.homeBlockLayout}>
      <View style={styles.homeBlockContainer}>
        <TouchableOpacity style={styles.homeBlock}>
          <Text>즐겨찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeBlock}>
          <Text>Blog</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeBlock}>
          <Text>Point</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeBlock}>
          <Text>아몰랑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
