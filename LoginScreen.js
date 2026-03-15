import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!name || !email) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Erro', 'Email inválido.');
      return;
    }
    dispatch(login({ name, email }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a)!</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 32, textAlign: 'center' },
  input: {
    backgroundColor: '#fff', borderRadius: 8, padding: 14,
    marginBottom: 16, borderWidth: 1, borderColor: '#ddd', fontSize: 16,
  },
  button: {
    backgroundColor: '#6C63FF', borderRadius: 8,
    padding: 16, alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});