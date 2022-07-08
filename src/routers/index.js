import { createWebHistory, createRouter } from "vue-router";
import MenuFood from '../pages/menu-food/MenuFood.vue';

const routes = [
    { path: '/', component: MenuFood },
    { path: '/menu-food', component: MenuFood },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;