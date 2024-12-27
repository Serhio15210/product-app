import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { onValue, ref } from "@firebase/database";
import { db } from "@/firebaseConfig";
import ProductCard from "@/components/product-card/ProductCard";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const dbRef = ref(db, "product");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setProducts(data ? Object.values(data) : []);
    });
  }, []);
  return (
    <SafeAreaView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Product List</ThemedText>
      </ThemedView>
      <FlatList
        data={products}
        renderItem={ProductCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 16,
  },
});
