import { View, Text, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { supabase } from '@/lib/core/supabase/client.supabase';
import Input from '@/Components/UI/Input';
import Button from '@/Components/UI/Button';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      Alert.alert(
        'Cuenta creada 🎉',
        'Ahora inicia sesión'
      );

      router.replace('/(auth)/login');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-yellow-400 justify-center px-6">
      {/* Tarjeta */}
      <View className="bg-white rounded-2xl p-6 shadow-lg">
        <Text className="text-2xl font-bold mb-6 text-center">
          📝 Registro
        </Text>

        <Input
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Input
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          title={loading ? 'Creando...' : 'Registrarse'}
          onPress={handleRegister}
          disabled={loading}
        />

        <Text
          className="text-center mt-4 text-blue-600"
          onPress={() => router.back()}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </Text>
      </View>
    </View>
  );
}
