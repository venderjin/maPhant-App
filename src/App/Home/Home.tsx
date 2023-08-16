import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

import { NavigationProps } from "../../Navigator/Routes";
import { ThemeContext } from "../Style/ThemeContext";

interface Tags {
  id: string | undefined;
  title: string | undefined;
}
// type homeScreenProps = NativeStackScreenProps

const Home: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const changeMode = () => {
    setIsDark(!isDark);
  };

  // console.log("width : " + width);

  useEffect(() => {
    setSCREEN_WIDTH(width);
    setSCREEN_HEIGHT(height);

    setStyleSheet(createStyle(width, height, theme));
  }, [width, height, isDark]);

  // * Search
  const [text, setText] = useState<string>();
  const [styles, setStyleSheet] = useState(createStyle(SCREEN_WIDTH, SCREEN_HEIGHT, theme));

  const clearTextHandler = () => {
    console.log("Search Text Delete Done");
    setText("");
  };
  // Search *

  // * Info
  const [currentinfoPage, setCurrentinfoPage] = useState(0);
  const infoPageCount = 3; // 페이지 수

  const [info /*, setInfo*/] = useState<ImageSourcePropType[]>([
    require("../../../assets/image1.png"),
    require("../../../assets/image2.png"),
    require("../../../assets/image3.png"),
  ]); // 들어갈 컨텐츠

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
  const [tags /*, setTags*/] = useState<Tags[]>([
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

  return (
    //view화면

    <SafeAreaView style={styles.mainContainer}>
      <StatusBar style="auto" />
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
                navigation.navigate("alarm" as never);
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <View>
            <Icon name="search" size={25} color="#666666" style={{}} />
          </View>
          <TextInput
            value={text}
            onChangeText={setText}
            returnKeyType="search"
            onEndEditing={() => console.log("Search Text Update Done")}
            // onTouchStart={() => console.log("start")}
            // onTouchEnd={() => console.log("end")}
            style={{
              flex: 1,
              //backgroundColor: "pink",
              height: "100%",
              marginLeft: "3%",
              marginRight: "3%",
            }}
          />
          <TouchableOpacity onPress={clearTextHandler}>
            <Icon name="close" size={25} color="#666666" style={{}} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ height: Dimensions.get("window").height }}>
        <View style={styles.infoContainer}>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={{ borderRadius: 18 }}
          >
            {/* <View style={[styles.infoPage, { backgroundColor: "red" }]}>
              
            </View>
            <View style={[styles.infoPage, { backgroundColor: "blue" }]}>
            
            </View>
            <View style={[styles.infoPage, { backgroundColor: "green" }]}>
              
            </View> */}
            {createInfoView(info)}
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

        <View style={styles.todaysHotContainer}>
          <View style={styles.todaysHotTitleBox}>
            <Text style={styles.todaysHotTitleText}> 🔥오늘의</Text>
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
            <Text style={styles.todaysHotTitleText}> 키워드🔥</Text>

            <View
              style={{
                width: "13%",
                height: "80%",
                marginLeft: "-3%",
                marginBottom: "2%",
                //backgroundColor: "gray",
              }}
            ></View>
          </View>

          <ScrollView
            horizontal={true}
            keyboardDismissMode="none"
            showsHorizontalScrollIndicator={false}
            style={styles.todaysHotTagBox}
          >
            {mapTag()}
          </ScrollView>
        </View>

        <View style={styles.advertisementContainer}>
          <Image
            source={require("../../../assets/adv1.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>

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
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyle = (width: number, height: number, theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      width: width,
      height: height,
    },
    mainScroll: {
      height: "100%",
    },
    titleContainer: {
      height: height * 0.06,
      flexDirection: "row",
      // backgroundColor: "blue",
      alignItems: "center",
      paddingLeft: "3%",
      paddingRight: "3%",
    },
    titleText: {
      color: theme.colors.text,
      fontSize: 35,
      marginLeft: "4%",
      fontWeight: "bold",
    },
    iconContainer: {
      flex: 1,
      flexDirection: "row",
      // backgroundColor: "skyblue",
      justifyContent: "flex-end",
    },
    searchContainer: {
      height: height * 0.07,
      flexDirection: "row",
      //backgroundColor: "teal",
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
    infoContainer: {
      height: Dimensions.get("window").height * 0.28,
      //backgroundColor: "yellow",
      paddingTop: "3%",
      paddingLeft: "5%",
      paddingRight: "5%",
      // backgroundColor: "red",
    },

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
    todaysHotContainer: {
      height: Dimensions.get("window").height * 0.13,
      //backgroundColor: "green",
      paddingLeft: "5%",
      paddingRight: "5%",
    },
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
