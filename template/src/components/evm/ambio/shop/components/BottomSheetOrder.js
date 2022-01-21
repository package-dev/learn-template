import React from "react";
import { Image, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import { Block, ButtonSimple, Typography, Icon } from "@uiCore";
import { HeaderBottomSheet } from "../components";
import { FormatMoney, renderImage } from "../utils/util";

const BottomSheetOrder = ({ onPressClose, onPressGo, item }) => (
  <Block
    style={{
      backgroundColor: "white",
      height: 250,
      width: width,
    }}
  >
    <HeaderBottomSheet
      backgroundColor="#15ca72"
      onPress={onPressClose}
      title={"Đã thêm vào giỏ hàng"}
    />
    <Block backgroundColor="#fff" width="100%">
      <Block row padding={10}>
        <Image
          source={renderImage(item ? JSON.parse(item.media) : [])}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />
        <Block
          width={300}
          paddingHorizontal={20}
          style={{ justifyContent: "center" }}
        >
          <Typography numberOfLines={2} size={16}>
            {item.name}
          </Typography>
          <Typography
            style={{
              fontWeight: "bold",
              color: "#FF2E00",
              fontSize: 18,
              marginTop: 10,
            }}
          >
            {FormatMoney(item.price)}
          </Typography>
        </Block>
      </Block>
      <Block width={"100%"} middle marginTop={20}>
        <ButtonSimple
          onPress={onPressGo}
          size={18}
          title="Xem giỏ hàng"
          width={"80%"}
        />
      </Block>
    </Block>
  </Block>
);
export default BottomSheetOrder;
