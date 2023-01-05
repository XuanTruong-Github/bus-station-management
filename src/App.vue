<script setup>
import { onMounted } from "vue";
import supabase from "./plugins/supabase";
import useAuthStore from "./stores/auth";
const authStore = useAuthStore();
authStore.getSession();
onMounted(() => {
  supabase.auth.onAuthStateChange((_, _session) => {
    authStore.session = _session;
  });
});
</script>
<template>
  <component :is="$route.meta.layout"><RouterView /></component>
</template>
