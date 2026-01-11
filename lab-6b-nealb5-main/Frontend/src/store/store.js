import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";

export default createStore({
    state: {
        isLoggedIn: false,
        accessToken: null,
        cart: [],
        orderAddress: null,
        orderCard: null,
    },
    mutations: {
        SET_ACCESS_TOKEN(state, token) {
            state.accessToken = token;
        },
        SET_LOGGED_IN(state, status) {
            state.isLoggedIn = status;
        },
        ADD_TO_CART(state, item) {
            state.cart.push(item);
        },
        REMOVE_FROM_CART(state, itemIndex) {
            state.cart.splice(itemIndex, 1);
        },
        LOGOUT_USER(state) {
            state.userId = null;
            state.userEmail = null;
            state.isLoggedIn = false;
            state.accessToken = null;
            state.cart = [];
            state.userRole = null;
            state.orderAddress = null;
            state.orderCard = null;
        },
        CLEAR_CART(state) {
            state.cart = [];
        },
        SET_ORDER_ADDRESS(state, address) {
            state.orderAddress = address;
        },
        SET_ORDER_CARD(state, card) {
            state.orderCard = card;
        }
    },
    actions: {
        setAccessToken({ commit }, token) {
            commit('SET_ACCESS_TOKEN', token);
            // Cookies.set('accessToken', token);
        },
        setLoggedIn({ commit }, status) {
            commit('SET_LOGGED_IN', status);
        },
        addToCart({ commit, state }, item) {
            commit('ADD_TO_CART', item);
        },
        removeFromCart({ commit, state }, itemIndex) {
            commit('REMOVE_FROM_CART', itemIndex);
        },
        logoutUser({ commit }) {
            Cookies.remove('accessToken');
            commit('LOGOUT_USER');
        },
        clearCart({ commit }) {
            commit('CLEAR_CART');
        },
        setOrderAddress({ commit }, address) {
            commit('SET_ORDER_ADDRESS', address);
        },
        setOrderCard({ commit }, cardId) {
            commit('SET_ORDER_CARD', cardId);
        }
    },

    getters: {
        isLoggedIn: (state) => state.isLoggedIn,
        accessToken: (state) => state.accessToken,
        cartItems: (state) => state.cart,
        cartCount: (state) => state.cart.reduce((total, item) => total + item.quantity, 0),
        orderAddress: (state) => state.orderAddress,
        orderCard: (state) => state.orderCard,
        userId: (state) => state.accessToken ? jwt_decode(state.accessToken).id : null,
        userUsername: (state) => state.accessToken ? jwt_decode(state.accessToken).username : null,
        userEmail: (state) => state.accessToken ? jwt_decode(state.accessToken).userEmail : null,
        userRole: (state) => state.accessToken ? jwt_decode(state.accessToken).role : null,
        expiration: (state) => state.accessToken ? jwt_decode(state.accessToken).exp : null,
    },

    // persistance for the state
    plugins: [
        createPersistedState({
            paths: ['isLoggedIn', 'accessToken', 'cart', 'orderAddress', 'orderCard'],
            storage: {
                getItem: (key) => Cookies.get(key),
                setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),  // expires in 3 days
                removeItem: (key) => Cookies.remove(key),
            },
        }),
    ]
})
