import * as THREE from 'three';

type Props = {
  positionY: number;
  color: string;
  height?: number;
};

export function BurgerIngredient({
  positionY,
  color,
  height = 0.25,
}: Props) {
  return (
    <mesh position={[0, positionY, 0]}>
      <cylinderGeometry args={[1.1, 1.1, height, 32]} />
      <meshStandardMaterial color={color} roughness={0.9} />
    </mesh>
  );
}
