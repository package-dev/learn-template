import React, { useRef, useState, useEffect } from "react";
import {
  Block,
  Layout,
  //FlatList,
  Typography,
  LoadingScreen,
  ButtonSimple,
} from "@uiCore";
import { FlatList, TouchableWithoutFeedback, Keyboard } from "react-native";
import { get, set, del } from "@lib/models/shopKeyword";
import { HeaderSearchInput, ItemPopular, ItemSearch } from "../components";
import { navigate, replace, goBack } from "@lib/rootNavigation";
import {
  getTimestamp,
  searchPopular,
  pushQueueSearch,
  minSearch,
} from "../utils/util";
import { logInfo, logDebug } from "@lib/debug";
export default function shop_searchProduct({ route }) {
  logInfo("shop_searchProduct");
  //clear all tim kiem gan day
  const [dataRecentSearch, setDataRecentSearch] = useState(null);
  const [render, setRender] = useState(true);
  const [loading, setLoading] = useState(true);
  const keySearch = useRef();
  const _keyboard = useRef();
  //______________________________________________________________

  useEffect(() => {
    get()
      .then((r) => {
        if (r === null) setDataRecentSearch([]);
        else {
          let sort = r.sort(function (a, b) {
            return b.time - a.time;
          });
          setDataRecentSearch(sort);
        }
      })
      .finally(() => setLoading(false));
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      _keyboard.current = true;
      logInfo("count open keyboard no call remove() keyboard");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      _keyboard.current = false;
    });
    return () => {
      logInfo("return () => {");
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [render]);
  //______________________________________________________________
  const handleSetDataStore = async () => {
    return await set(dataRecentSearch);
  };
  const handleRemoveItem = (item, index) => {
    dataRecentSearch.splice(index, 1);
    handleSetDataStore();
    setRender(!render);
  };
  const handleOnclickItem = (item, index) => {
    let timeNew = new Date();
    dataRecentSearch.splice(index, 1, {
      time: getTimestamp(timeNew),
      name: item.name,
    });
    handleSetDataStore();
    replace("shop_groupProducts", { key: item.name });
    setRender(!render);
  };
  //______________________________________________________________
  const handleSearchIcon = () => {
    logInfo("handleSearchIcon", "sadsa");
    const name = keySearch.current.getValue();
    if (name.trim() === "") keySearch.current.handleFocus();
    else handleSearchProduct();
  };
  const handleSearchKeyboard = () => {
    const name = keySearch.current.getValue();
    if (name.trim() === "")
      return replace("shop_groupProducts", { key: false });
    //thong bao
    else handleSearchProduct();
  };
  const handleSearchProduct = () => {
    const name = keySearch.current.getValue();
    let time = new Date();
    const item = { name: name, time: getTimestamp(time) };
    //tim old thay the
    let find = dataRecentSearch.find((item, index) => item.name === name);
    if (find) {
      let index = dataRecentSearch.indexOf(find);
      dataRecentSearch.splice(index, 1, {
        time: getTimestamp(time),
        name: name,
      });
      handleSetDataStore();
      setRender(!render);
      return replace("shop_groupProducts", { key: name });
    }
    //xem kich thuoc mang,
    if (dataRecentSearch.length === 10) {
      let min = minSearch(dataRecentSearch);
      let index = dataRecentSearch.indexOf(min);
      dataRecentSearch.splice(index, 1, item);
      handleSetDataStore();
      setRender(!render);
      return replace("shop_groupProducts", { key: name });
    }
    //them moi
    dataRecentSearch.push({ time: getTimestamp(time), name: name });
    handleSetDataStore();
    setRender(!render);
    return replace("shop_groupProducts", { key: name });
  };
  return (
    <Layout
      customHeader={() => (
        <HeaderSearchInput
          onPressRight={() => {
            navigate("shop_carts");
          }}
          onPressLeft={goBack}
          ref={keySearch}
          defaultValue={route.params ? route.params.keyOld : ""}
          placeholder="Tên mặt hàng"
          autoFocus={true}
          returnKeyType="search"
          onPressSearch={handleSearchIcon}
          onSubmitEditing={handleSearchKeyboard}
          onPressIn={() => logDebug("onPressIn")}
        />
      )}
    >
      {dataRecentSearch !== null && (
        <FlatList
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
          refreshing={loading}
          onRefresh={() => {
            setRender(!render);
            setLoading(true);
          }}
          data={dataRecentSearch}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ItemSearch
              name={item.name}
              onPress={() => handleOnclickItem(item, index)}
              onRemove={() => handleRemoveItem(item, index)}
            />
          )}
          ListHeaderComponent={
            <HeaderFlatList lengthData={dataRecentSearch.length} />
          }
          ListFooterComponent={<FooterFlatList data={dataRecentSearch} />}
          contentContainerStyle={{ marginHorizontal: 10, marginTop: 20 }}
          onScroll={() => {
            if (_keyboard.current) Keyboard.dismiss();
          }}
        />
      )}
      {dataRecentSearch === null && (
        <Block height={500}>
          <LoadingScreen />
        </Block>
      )}
    </Layout>
  );
}
const HeaderFlatList = ({ lengthData }) => {
  if (lengthData === 0) return null;
  return (
    <Block style={{ marginLeft: 10, marginVertical: 10 }}>
      <Typography size={18}>TÌM KIẾM GẦN ĐÂY</Typography>
    </Block>
  );
};
const FooterFlatList = ({}) => {
  //params data
  const data = searchPopular;
  return (
    <Block
      style={{
        marginTop: 30,
        width: 380,
        marginHorizontal: 10,
      }}
    >
      {data.length !== 0 && (
        <Typography size={18} style={{ marginBottom: 10, marginLeft: 2.5 }}>
          TỪ KHÓA PHỔ BIẾN
        </Typography>
      )}
      <FlatList
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        data={data}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <ItemPopular
            name={item}
            onPress={() => replace("shop_groupProducts", { key: item })}
          />
        )}
        contentContainerStyle={{
          marginTop: 10,
          width: 5000,
        }}
      />
    </Block>
  );
};
