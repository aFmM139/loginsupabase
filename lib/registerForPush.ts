import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Alert } from "react-native";

export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    Alert.alert("Error", "Usa un dispositivo físico");
    return;
  }

  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } =
      await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert("Permiso denegado");
    return;
  }

  const tokenData =
    await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas?.projectId,
    });

  const token = tokenData.data;

  console.log("Expo Push Token:", token);

  return token;
}
