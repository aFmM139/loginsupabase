import React from 'react';
import { Canvas } from '@react-three/fiber/native';
import { View } from 'react-native';

export type Ingredient =
  | 'bottom-bun'
  | 'meat'
  | 'cheese'
  | 'top-bun';

type Props = {
  ingredients?: Ingredient[];
  topBun?: boolean;
  size?: 'small' | 'large';
};

export default function Burger3D({
  ingredients,
  topBun,
  size = 'small',
}: Props) {
  const finalIngredients: Ingredient[] =
    ingredients ?? ['bottom-bun', 'meat', 'cheese'];

  const showTopBun = topBun ?? true;

  // 🔧 AJUSTES 3D
  const scale = size === 'large' ? 1.35 : 1.1;
  const baseY = size === 'large' ? -1.8 : -1.2; // ⬆️ SUBIMOS TODA LA HAMBURGUESA
  const spacing = 0.35;

  // ⬆️ MÁS ALTURA REAL PARA EL CANVAS
  const height = size === 'large' ? 460 : 360;

  // 🍔 PAN SUPERIOR
  const ingredientStackHeight = finalIngredients.length * spacing;
  const topBunYOffset = -0.05;

  return (
    <View style={{ height }}>
      <Canvas camera={{ position: [0, 4.5, 7], fov: 50 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        <group position={[0, baseY, 0]} scale={scale}>
          {finalIngredients.map((item, index) => {
            const y = index * spacing;

            if (item === 'bottom-bun') {
              return (
                <mesh key={index} position={[0, y, 0]}>
                  <cylinderGeometry args={[1.1, 1.2, 0.35, 32]} />
                  <meshStandardMaterial color="#E0A35A" />
                </mesh>
              );
            }

            if (item === 'meat') {
              return (
                <mesh key={index} position={[0, y, 0]}>
                  <cylinderGeometry args={[1.05, 1.05, 0.25, 32]} />
                  <meshStandardMaterial color="#6B3E26" />
                </mesh>
              );
            }

            if (item === 'cheese') {
              return (
                <mesh key={index} position={[0, y, 0]}>
                  <boxGeometry args={[2.25, 0.08, 2.25]} />
                  <meshStandardMaterial color="#FFD23F" />
                </mesh>
              );
            }

            return null;
          })}

          {/* 🍔 PAN SUPERIOR (domo correcto, sin corte) */}
          {showTopBun && (
            <mesh
              position={[
                0,
                ingredientStackHeight + topBunYOffset,
                0,
              ]}
            >
              <sphereGeometry
                args={[1.0, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]}
              />
              <meshStandardMaterial color="#E0A35A" />
            </mesh>
          )}
        </group>
      </Canvas>
    </View>
  );
}
