import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useProductStore from "@/zustand/productStore";
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { ref, update } from "@firebase/database"; // Импортируем методы для работы с Firebase
import { db } from "@/firebaseConfig";
import { router } from "expo-router";

const Cart = () => {
  const removeFromCart = useProductStore((state) => state.removeFromCart);
  const cart = useProductStore((state) => state.cart);

  const markProductsAsBought = async () => {
    try {
      for (const product of cart) {
        const productRef = ref(db, `product/${product.uuid}`);
        await update(productRef, { bought: true });
      }
      router.replace("/");
    } catch (error) {
      console.error("Ошибка при обновлении продуктов:", error);
      alert("Произошла ошибка при обновлении продуктов.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {cart.length ? (
        <>
          <FlatList
            data={cart}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 200, gap: 10 }}
            renderItem={({ item }) => {
              return (
                <ThemedView style={styles.cartItem}>
                  {item.photo && (
                    <Image source={{ uri: item.photo }} style={styles.img} />
                  )}
                  <View style={styles.row}>
                    <ThemedText>{item.name}</ThemedText>
                    <ThemedText>${item.price}</ThemedText>
                  </View>
                  <Button
                    title={"Remove"}
                    onPress={() => removeFromCart(item.uuid)}
                  />
                </ThemedView>
              );
            }}
          />
          <View style={styles.btn}>
            <View style={{ flex: 1, width: "100%" }}>
              <Button title={"Buy"} onPress={markProductsAsBought} />
            </View>
          </View>
        </>
      ) : (
        <ThemedText style={styles.empty}>Cart is empty</ThemedText>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  cartItem: {
    padding: 16,
    borderRadius: 10,
    flexDirection: "column",
    gap: 10,
  },
  img: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 40,
    width: "90%",
    margin: "auto",
    alignSelf: "center",
  },
  empty: {
    textAlign: "center",
    position: "absolute",
    top: "50%",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default Cart;
