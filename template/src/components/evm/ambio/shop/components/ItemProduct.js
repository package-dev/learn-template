import React from "react";
import { StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { Block, Typography, BasicButton } from "@uiCore";
import { FormatMoney, renderImage } from "../utils/util";
import { LIGHT } from "@uiCore/Theme/colors";
const { width, height } = Dimensions.get("screen");
const largeWidth = width / 2 - 10;
const mediumWidth = width / 2 - 50;
export default function ItemProduct({
  size = "large",
  onPress,
  colorPrice,
  sizePrice,
  item,
}) {
  const data = item ? item : null;
  let tempMedia = data ? JSON.parse(data.media) : [];
  const styleItem = [
    size === "large" && styles.containerLarge,
    size === "medium" && styles.containerMedium,
    styles.styleBox,
  ];

  return (
    <BasicButton style={styleItem} onPress={onPress}>
      <Image
        source={renderImage(tempMedia)}
        style={{
          width: size === "medium" ? mediumWidth : largeWidth,
          resizeMode: "contain",
          //height: size === "medium" ? 150 : 180,
          height: size === "medium" ? mediumWidth : largeWidth,
        }}
      />
      <Block
        center
        style={[
          { width: "100%" },
          size === "medium"
            ? { paddingHorizontal: 5, height: 60, marginTop: 2 }
            : { height: 70, paddingHorizontal: 8, marginTop: 3 },
        ]}
      >
        {data && (
          <Typography
            color={LIGHT.text}
            numberOfLines={2}
            style={{ height: size === "medium" ? 40 : 40 }}
          >
            {data.name}
          </Typography>
        )}
        {data && (
          <Typography color={colorPrice} size={sizePrice}>
            {data.price ? FormatMoney(data.price) : ""}
          </Typography>
        )}
      </Block>
    </BasicButton>
  );
}
ItemProduct.defaultProps = {
  colorPrice: LIGHT.danger,
  sizePrice: 14,
};

const styles = StyleSheet.create({
  containerLarge: {
    width: largeWidth,
    height: 255,
    margin: 5,
    alignItems: "center",
    backgroundColor: "red",
  },
  containerMedium: {
    width: mediumWidth,
    height: 220,
    margin: 4,
    alignItems: "center",
    backgroundColor: "blue",
  },
  styleBox: {
    backgroundColor: "#fff",
  },
  styleImage: {
    width: "100%",
    resizeMode: "contain",
  },
});
