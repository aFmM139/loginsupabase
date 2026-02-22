import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/core/supabase/client.supabase';
import { useRouter } from 'expo-router';
import "@/global.css";

export default function Profile() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    setEmail(user.email || '');

    const { data, error } = await supabase
      .from('profiles')
      .select('name, country')
      .eq('id', user.id)
      .single();

    if (data) {
      setName(data.name || '');
      setCountry(data.country || '');
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/(auth)/login');
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-yellow-400">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-yellow-400 justify-center items-center px-6">

      <View className="bg-white p-6 rounded-3xl shadow-lg w-full">

        <Text className="text-2xl font-bold mb-4 text-center">
          👤 Bienvenido a tu perfil
        </Text>

        <Text className="text-lg mb-2">
          📧 Email: {email}
        </Text>

        <Text className="text-lg mb-2">
          🧑 Nombre: {name || 'No registrado'}
        </Text>

        <Text className="text-lg mb-6">
          🌎 País: {country || 'No registrado'}
        </Text>

        <TouchableOpacity
          onPress={handleLogout}
          className="bg-black py-3 rounded-xl"
        >
          <Text className="text-white text-center font-bold">
            🚪 Cerrar sesión
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}