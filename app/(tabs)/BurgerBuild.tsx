import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';
import Burger3D from '@/Components/Burger3D';
import "@/global.css";

type Ingredient = 'meat' | 'cheese';

export default function BurgerBuild() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [topBun, setTopBun] = useState<boolean>(false);

  const meatCount = ingredients.filter(i => i === 'meat').length;
  const cheeseCount = ingredients.filter(i => i === 'cheese').length;

  const isLocked = topBun;
  const meatLimitReached = meatCount >= 3;
  const cheeseLimitReached = cheeseCount >= 3;

  const addIngredient = (item: Ingredient) => {
    if (isLocked) return;
    if (item === 'meat' && meatLimitReached) return;
    if (item === 'cheese' && cheeseLimitReached) return;
    setIngredients([...ingredients, item]);
  };

  return (
    <View className="flex-1 bg-yellow-400 px-4 pt-11">

      {/* HEADER CON FLECHA */}
      <View className="flex-row justify-between items-center mb-5 mt-2">
        <Link href="/feed" asChild>
          <TouchableOpacity className="mr-3">      
          </TouchableOpacity>
        </Link>

        <Text className="text-2xl font-bold">
          Arma tu hamburguesa 🍔
        </Text>
      </View>

      {/* TARJETA */}
      <View className="flex-1 bg-white rounded-3xl p-5 shadow-lg">

        {/* 3D */}
      
      <View className="flex-1 pt-28 pb-2 justify-end">
          <Burger3D
            ingredients={['bottom-bun', ...ingredients]}
            topBun={topBun}
          />
      </View>


        {/* CONTROLES */}
        <View>
          <Text className="text-sm font-semibold mb-3 text-gray-500">
            Ingredientes
          </Text>

          <View className="flex-row flex-wrap gap-3">

            {/* CARNE */}
            <TouchableOpacity
              disabled={isLocked || meatLimitReached}
              onPress={() => addIngredient('meat')}
              className={`px-4 py-2 rounded-full border ${
                isLocked || meatLimitReached
                  ? 'bg-gray-200 border-gray-300'
                  : 'bg-white border-black'
              }`}
            >
              <Text className="font-semibold">
                🥩 Carne ({meatCount}/3)
              </Text>
            </TouchableOpacity>

            {/* QUESO */}
            <TouchableOpacity
              disabled={isLocked || cheeseLimitReached}
              onPress={() => addIngredient('cheese')}
              className={`px-4 py-2 rounded-full border ${
                isLocked || cheeseLimitReached
                  ? 'bg-gray-200 border-gray-300'
                  : 'bg-white border-black'
              }`}
            >
              <Text className="font-semibold">
                🧀 Queso ({cheeseCount}/3)
              </Text>
            </TouchableOpacity>

            {/* FINALIZAR */}
            <TouchableOpacity
              disabled={topBun}
              onPress={() => setTopBun(true)}
              className={`px-4 py-2 rounded-full ${
                topBun ? 'bg-gray-300' : 'bg-black'
              }`}
            >
              <Text className="font-semibold text-white">
                {topBun ? '🍔 Lista' : '🎨 Finalizar'}
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>

    </View>
  );
}
