import React from "react";
import { Link } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useProductStore from "@/zustand/productStore";
const CartButton = () => {
  const cart = useProductStore((state) => state.cart);
  return (
    <Link href="/cart" asChild>
      <TouchableOpacity style={{ position: "relative", zIndex: 100 }}>
        <IconSymbol name={"shopping.cart.fill"} color={"#fff"} />
        <View style={styles.cartCircle}>
          <Text style={styles.cartText}> {cart.length}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
const styles = StyleSheet.create({
  cartCircle: {
    width: 15,
    height: 15,
    backgroundColor: "blue",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  cartText: {
    color: "#fff",
    fontSize: 8,
  },
});
export default CartButton;
