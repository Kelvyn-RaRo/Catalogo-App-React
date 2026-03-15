import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, ScrollView,
  StyleSheet, ActivityIndicator
} from 'react-native';
import { getProductById } from '../services/api';

export default function ProductDetailScreen({ route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductById(productId)
      .then(res => setProduct(res.data))
      .catch(() => setError('Erro ao carregar produto.'))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <ActivityIndicator size="large" color="#6C63FF" style={{ flex: 1 }} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
          <Text style={styles.discount}>-{product.discountPercentage}% OFF</Text>
        </View>
        <Text style={styles.rating}>⭐ {product.rating} / 5</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  image: { width: '100%', height: 280 },
  info: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 14, color: '#555', marginBottom: 16, lineHeight: 22 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  price: { fontSize: 24, fontWeight: 'bold', color: '#6C63FF' },
  discount: {
    backgroundColor: '#e0fbe2', color: '#2e7d32',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, fontWeight: 'bold',
  },
  rating: { fontSize: 16, color: '#888' },
  error: { color: 'red', textAlign: 'center', marginTop: 40 },
});