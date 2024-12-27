import React from 'react';
import {TouchableOpacity, Text, Image, View} from "react-native";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {router} from "expo-router";
import {Product} from "@/api/types";

interface ProductCardProps {
  item: Product;
}



const ProductCard = ({item}:ProductCardProps) => {

    return (
        <TouchableOpacity style={{padding: 16,opacity:item.bought?0.5:1}} onPress={()=>router.push(`/product/${item.uuid}`)} disabled={item.bought}>
            <ThemedView style={{padding: 16, borderRadius: 10, flexDirection: 'column', gap: 10}}>
                {item.photo &&
                    <Image source={{uri: item.photo}} style={{width: '100%', height: 200, borderRadius: 10}}/>}
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <ThemedText>{item.name}</ThemedText>
                    <ThemedText>${item.price}</ThemedText>
                </View>

            </ThemedView>

        </TouchableOpacity>
    );
};

export default ProductCard;