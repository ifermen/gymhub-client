const TOKEN_KEY = "TOKEN";

export const LocalStorageUtility = {

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  }
}