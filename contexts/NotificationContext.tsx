import { registerForPushNotificationsAsync } from "@/lib/push-notification";
import { EventSubscription } from "expo-modules-core";
import * as Notifications from "expo-notifications";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
  
  interface NotificationContextType {
    expoPushToken: string | null;
    notification: Notifications.Notification | null;
    error: Error | null;
  }
  
  const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
  );
  
  export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
      throw new Error(
        "useNotification must be used within a NotificationProvider"
      );
    }
    return context;
  };
  
  interface NotificationProviderProps {
    children: ReactNode;
  }
  
  export const NotificationProvider: React.FC<NotificationProviderProps> = ({
    children,
  }) => {
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
    const [notification, setNotification] =
      useState<Notifications.Notification | null>(null);
    const [error, setError] = useState<Error | null>(null);
  
    const notificationListener = useRef<EventSubscription | null>(null);
    const responseListener = useRef<EventSubscription | null>(null);
  
    useEffect(() => {
      registerForPushNotificationsAsync().then(
        (token) => setExpoPushToken(token),
        (error) => setError(error)
      );
  
    // Listen for incoming notifications while the app is in the foreground
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          console.log("🔔 Notification Received: ", notification);
          setNotification(notification);
        });
  
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(
            "🔔 Notification Response: ",
            JSON.stringify(response, null, 2),
            JSON.stringify(response.notification.request.content.data, null, 2)
          );
          // Handle the notification response here
        });
  
      return () => {
        if (notificationListener.current) {
          Notifications.removeNotificationSubscription(
            notificationListener.current
          );
        }
        if (responseListener.current) {
          Notifications.removeNotificationSubscription(responseListener.current);
        }
      };
    }, []);
  
    return (
      <NotificationContext.Provider
        value={{ expoPushToken, notification, error }}
      >
        {children}
      </NotificationContext.Provider>
    );
  };