import { create } from 'zustand';

const useAuthStore = create((set) => ({
  // issiue - Auto-Login After Logout
  user: null,

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
}));

export default useAuthStore;
