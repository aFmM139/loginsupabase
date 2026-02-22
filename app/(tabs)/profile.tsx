import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/core/supabase/client.supabase';
import { useRouter } from 'expo-router';
import "@/global.css";

export default function Profile() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("No hay usuario autenticado");

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setProfile(data);

    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
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

        <Text className="text-2xl font-bold mb-6 text-center">
          👤 Tu Perfil
        </Text>

        <Text className="text-lg mb-2">
          🧑 Nombre: {profile?.first_name}
        </Text>

        <Text className="text-lg mb-2">
          🌎 País: {profile?.country}
        </Text>

        <Text className="text-lg mb-6">
          🏠 Dirección: {profile?.address}
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