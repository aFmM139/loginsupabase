import { TouchableOpacity, Text } from 'react-native';
import "@/global.css";

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export default function Button({
  title,
  onPress,
  disabled = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={`py-3 rounded-lg mt-2 ${
        disabled ? 'bg-gray-400' : 'bg-red-600'
      }`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className="text-black text-center font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
