import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Burger3D from '@/Components/Burger3D';
import "@/global.css";

export default function FeedScreen() {
  return (
    <View className="flex-1 bg-yellow-400 px-5 pt-10">

      {/* HEADER CON BOTÓN PERFIL */}
      <View className="flex-row justify-between items-center">
        <Text className="text-2xl font-bold">
          🍔 Feed
        </Text>

        <Link href="/profile" asChild>
          <TouchableOpacity className="bg-black px-4 py-2 rounded-full">
            <Text className="text-white font-semibold">
              👤 Perfil
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* TARJETA */}
      <View className="bg-white rounded-2xl p-4 shadow-md mt-6">

        {/* HAMBURGUESA 3D */}
        <Burger3D />

        {/* INFO */}
        <Text className="text-xl font-bold mt-4">
          Hamburguesa Clásica
        </Text>

        <Text className="text-gray-500 mt-1 mb-4">
          Pan, carne, queso
        </Text>

        {/* BOTÓN PERSONALIZAR */}
        <Link href="/BurgerBuild" asChild>
          <TouchableOpacity className="bg-black py-4 rounded-xl">
            <Text className="text-white text-center font-bold text-lg">
              Agregar Ingredientes
            </Text>
          </TouchableOpacity>
        </Link>

      </View>
    </View>
  );
}