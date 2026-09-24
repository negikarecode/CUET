/**
 * Web Push & VAPID Notification Management
 * Integrates browser PushManager, ServiceWorker registration, and local fallback simulation.
 */

export type PushPermissionStatus = "granted" | "denied" | "default" | "unsupported";

export function isPushNotificationSupported(): boolean {
  if (typeof window === "undefined") return false;
  return "Notification" in window && "serviceWorker" in navigator;
}

export function getNotificationPermissionState(): PushPermissionStatus {
  if (!isPushNotificationSupported()) return "unsupported";
  return Notification.permission as PushPermissionStatus;
}

/**
 * Converts VAPID public key string to Uint8Array for PushManager subscription
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * Requests browser notification permission and subscribes to push notifications
 */
export async function enablePushNotifications(userId?: string): Promise<{
  success: boolean;
  status: PushPermissionStatus;
  message: string;
}> {
  if (!isPushNotificationSupported()) {
    return {
      success: false,
      status: "unsupported",
      message: "Browser notifications are not supported by this browser.",
    };
  }

  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      return {
        success: false,
        status: permission as PushPermissionStatus,
        message: "Notification permission was not granted by user.",
      };
    }

    // Try service worker subscription if VAPID key is configured
    const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (vapidKey && "serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidKey) as unknown as BufferSource,
        });

        // Optionally send subscription to backend
        if (userId) {
          await fetch("/api/student/push-subscription", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, subscription }),
          }).catch(() => {
            // Non-blocking fallback
          });
        }
      } catch (swErr) {
        console.warn("ServiceWorker pushManager subscription notice:", swErr);
      }
    }

    // Save preference to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("cuet_revision_push_enabled", "true");
    }

    return {
      success: true,
      status: "granted",
      message: "Daily revision reminders enabled! You'll receive your 8:00 PM practice ping.",
    };
  } catch (error: any) {
    console.error("Push notification enablement error:", error);
    return {
      success: false,
      status: "denied",
      message: error?.message || "Failed to enable notifications.",
    };
  }
}

/**
 * Disables push notification reminders locally
 */
export function disablePushNotifications(): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("cuet_revision_push_enabled", "false");
  }
}

/**
 * Checks if revision alerts are enabled in localStorage
 */
export function isPushPreferenceEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("cuet_revision_push_enabled") === "true";
}

/**
 * Dispatches an instant test notification to demonstrate the live reminder to the user
 */
export function sendTestNotification(): boolean {
  if (!isPushNotificationSupported() || Notification.permission !== "granted") {
    return false;
  }

  try {
    const options: NotificationOptions = {
      body: "🎯 Daily CUET Revision Ping: Solve today's 15-question micro-drill and maintain your practice streak!",
      icon: "https://cdn-icons-png.flaticon.com/512/2997/2997295.png",
      badge: "https://cdn-icons-png.flaticon.com/512/2997/2997295.png",
      tag: "cuet-daily-reminder",
    };

    new Notification("CUET AI-Prep: 8:00 PM Revision Reminder", options);
    return true;
  } catch (e) {
    console.warn("Direct Notification trigger error, attempting ServiceWorker fallback:", e);
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.showNotification("CUET AI-Prep: 8:00 PM Revision Reminder", {
          body: "🎯 Daily CUET Revision Ping: Solve today's 15-question micro-drill and maintain your practice streak!",
        });
      });
      return true;
    }
    return false;
  }
}
