import { createStore } from 'vuex';
import { auth, db } from '@/plugins/firebase';
import {
  doc, addDoc, setDoc, getDoc, getDocs, deleteDoc, collection,
} from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';

export default createStore({
  state: {
    orders: [],
    isLoading: false,
    selectedOrder: null,
    showAuthModal: false,
    isUserLoggedIn: false,
    showOrderFormModal: false,
  },
  mutations: {
    TOGGLE_ORDER_FORM_MODAL: (state) => {
      state.showOrderFormModal = !state.showOrderFormModal;
    },
    TOGGLE_AUTH: (state) => {
      state.isUserLoggedIn = !state.isUserLoggedIn;
    },
    SET_ORDERS: (state, payload) => {
      state.orders = payload;
    },
    SET_LOADING: (state) => {
      state.isLoading = !state.isLoading;
    },
    SET_SELECTED_ORDER: (state, payload) => {
      state.selectedOrder = payload;
    },
  },
  actions: {
    async register({ commit }, payload) {
      const userCred = await createUserWithEmailAndPassword(
        auth, payload.email, payload.password,
      );

      await setDoc(doc(db, 'users', userCred.user.uid), {
        name: payload.name,
        email: payload.email,
      });

      await updateProfile(auth.currentUser, {
        displayName: 'Usman',
      });

      commit('TOGGLE_AUTH');
    },
    async login({ commit }, payload) {
      await signInWithEmailAndPassword(auth, payload.email, payload.password);

      commit('TOGGLE_AUTH');
    },
    async init_login({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit('TOGGLE_AUTH');
      }
    },
    async signOut({ commit }) {
      await auth.signOut();

      commit('TOGGLE_AUTH');
    },
    async createOrder({ commit }, payload) {
      try {
        await addDoc(collection(db, 'orders'), {
          name: payload.name,
          price: payload.price,
          createdOn: Date.now(),
          updatedOn: Date.now(),
          packageType: payload.packageType,
        });
      } catch (e) {
        console.error('Error adding document: ', e);
      }

      commit('TOGGLE_ORDER_FORM_MODAL');
    },
    async updateOrder({ commit }, payload) {
      try {
        await setDoc(doc(db, 'orders', payload.id), {
          name: payload.name,
          price: payload.price,
          updatedOn: Date.now(),
          packageType: payload.packageType,
        });
      } catch (e) {
        console.error('Error updating document: ', e);
      }

      commit('TOGGLE_ORDER_FORM_MODAL');
    },
    async fetchOrder({ commit }, payload) {
      commit('SET_LOADING');

      const docRef = doc(db, 'orders', payload);
      const res = await getDoc(docRef);

      if (res.exists()) {
        commit('SET_SELECTED_ORDER', res.data());
      }
      commit('SET_LOADING');
    },
    async fetchOrders({ commit }) {
      commit('SET_LOADING');

      const orders = [];
      const querySnapshot = await getDocs(collection(db, 'orders'));
      querySnapshot.forEach(
        (_doc) => {
          orders.push({
            ..._doc.data(),
            id: _doc.id,
          });
        },
      );

      commit('SET_ORDERS', orders);
      commit('SET_LOADING');
    },
    async deleteOrder({ commit, dispatch }, payload) {
      commit('SET_LOADING');
      await deleteDoc(doc(db, 'orders', payload));
      commit('SET_LOADING');
      dispatch('fetchOrders');
    },
  },
});
