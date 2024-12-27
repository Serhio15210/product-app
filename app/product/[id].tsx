import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { get, ref } from "@firebase/database";
import { db } from "@/firebaseConfig";
import { Button, Image, StyleSheet, View } from "react-native";
import useProductStore from "@/zustand/productStore";
import { Product } from "@/api/types";

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const addToCart = useProductStore((state) => state.addToCart);
  const removeFromCart = useProductStore((state) => state.removeFromCart);
  const cart = useProductStore((state) => state.cart);
  const isAdded = () => cart.find((item) => item.uuid === product?.uuid);
  const fetchProductById = async () => {
    try {
      const productRef = ref(db, `product/${id}`);
      const snapshot = await get(productRef);

      if (snapshot.exists()) {
        setProduct(snapshot.val());
      } else {
        console.log("No product found with this ID.");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error; // Обработка ошибки
    }
  };

  useEffect(() => {
    const getData = async () => {
      await fetchProductById();
    };
    getData();
  }, []);

  return (
    <ThemedView style={styles.container}>
      {product?.photo && (
        <Image source={{ uri: product?.photo }} style={styles.img} />
      )}
      <View style={styles.row}>
        <ThemedText>Name:</ThemedText>
        <ThemedText>{product?.name}</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText>Price:</ThemedText>
        <ThemedText>${product?.price}</ThemedText>
      </View>
      <View>
        <ThemedText>Description:</ThemedText>
        <ThemedText>{product?.description || "-"}</ThemedText>
      </View>
      {isAdded() ? (
        <Button
          title={"Remove from cart"}
          onPress={() => {
            product && removeFromCart(product.uuid);
          }}
        />
      ) : (
        <Button
          title={"Add to cart"}
          onPress={() => {
            product && addToCart(product);
          }}
        />
      )}
    </ThemedView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    width: "100%",
  },
});
export default ProductDetails;
