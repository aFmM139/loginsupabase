import "@/global.css";
import { View, Text, Alert } from 'react-native';
import { useState } from 'react';
import { useAuth } from '@/lib/modules/auth/AuthProvider';
import { router } from 'expo-router';
import Input from '@/Components/UI/Input';
import Button from '@/Components/UI/Button';
import { registerForPushNotificationsAsync } from '@/lib/registerForPush';
import { supabase } from '@/lib/core/supabase/client.supabase';

export default function LoginScreen() {
  const { signInWithEmail, session} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmail(email, password);
      const token = await registerForPushNotificationsAsync();
  
      if (token && session) {
        await supabase.from('push_tokens').upsert({
          user_id: session.user.id,
          token: token,
        });
      }
  
      if (token) {
        await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: token,
            sound: "default",
            title: "🍔 Bienvenido",
            body: "Has iniciado sesión correctamente",
          }),
        });
      }
  
      router.replace('/(tabs)/feed');
  
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View className="flex-1 bg-yellow-400 justify-center px-6">
      <View className="bg-white rounded-2xl p-6 shadow-lg">
        <Text className="text-2xl font-bold mb-6 text-center">
          🍔 Comida Rápida
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

        <Button title="Entrar" onPress={handleLogin} />

        <Text
          className="text-center mt-4 text-blue-600"
          onPress={() => router.push('/(auth)/register')}
        >
          ¿No tienes cuenta? Regístrate
        </Text>
      </View>
    </View>
  );
}
