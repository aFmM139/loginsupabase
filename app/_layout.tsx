import { Stack } from 'expo-router';
import { AuthProvider } from '@/lib/modules/auth/AuthProvider';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/register" />
        <Stack.Screen name="(tabs)/feed" />
        <Stack.Screen name="(tabs)/profile" />
      </Stack>
    </AuthProvider>
  );
}
