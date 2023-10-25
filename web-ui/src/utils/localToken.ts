import settings from '@/config/settings';

// Get Token from local storage
export const getToken = () => localStorage.getItem(settings.siteTokenKey);

// Set Token in local storage
export const setToken = (token: string) => {
  localStorage.setItem(settings.siteTokenKey, token);
};

// Remove Token from local storage
export const removeToken = () => {
  localStorage.removeItem(settings.siteTokenKey);
};
