import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  Image, StyleSheet, ActivityIndicator, ScrollView
} from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { getProductsByCategory } from '../services/api';

const MALE_CATEGORIES = ['mens-shirts', 'mens-shoes', 'mens-watches'];
const FEMALE_CATEGORIES = ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches'];

function CategoryTab({ categories, navigation }) {
  const [selectedCat, setSelectedCat] = useState(categories[0]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProductsByCategory(selectedCat)
      .then(res => setProducts(res.data.products))
      .catch(() => setError('Erro ao carregar produtos.'))
      .finally(() => setLoading(false));
  }, [selectedCat]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catBar}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.catBtn, selectedCat === cat && styles.catBtnActive]}
            onPress={() => setSelectedCat(cat)}
          >
            <Text style={[styles.catText, selectedCat === cat && styles.catTextActive]}>
              {cat.replace(/-/g, ' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading && <ActivityIndicator size="large" color="#6C63FF" style={{ marginTop: 32 }} />}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={products}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detalhes', { productId: item.id })}
          >
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <Text style={styles.productName} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default function ProductListScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('masculino');
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Catálogo</Text>
        <TouchableOpacity onPress={() => dispatch(logout())}>
          <Text style={styles.logoutBtn}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        {['masculino', 'feminino'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'masculino'
        ? <CategoryTab categories={MALE_CATEGORIES} navigation={navigation} />
        : <CategoryTab categories={FEMALE_CATEGORIES} navigation={navigation} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', padding: 16, backgroundColor: '#6C63FF',
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  logoutBtn: { color: '#fff', fontSize: 14 },
  tabBar: { flexDirection: 'row', backgroundColor: '#fff', elevation: 2 },
  tab: { flex: 1, padding: 14, alignItems: 'center' },
  tabActive: { borderBottomWidth: 3, borderBottomColor: '#6C63FF' },
  tabText: { fontSize: 15, color: '#888' },
  tabTextActive: { color: '#6C63FF', fontWeight: 'bold' },
  catBar: { paddingHorizontal: 8, paddingVertical: 10, maxHeight: 56 },
  catBtn: {
    paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: 20, backgroundColor: '#eee', marginRight: 8,
  },
  catBtnActive: { backgroundColor: '#6C63FF' },
  catText: { color: '#555', fontSize: 13 },
  catTextActive: { color: '#fff', fontWeight: 'bold' },
  list: { padding: 8 },
  card: {
    flex: 1, margin: 8, backgroundColor: '#fff',
    borderRadius: 10, padding: 10, elevation: 2,
  },
  image: { width: '100%', height: 130, borderRadius: 8, marginBottom: 8 },
  productName: { fontSize: 13, fontWeight: '600', marginBottom: 4 },
  price: { color: '#6C63FF', fontWeight: 'bold' },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
});