import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
   state: {
       mediaBreadcrumbList: []
   },
    mutations: {
        setMediaBreadcrumbList(state,data) {
            state.mediaBreadcrumbList = data
        }
    }
})

export default store
