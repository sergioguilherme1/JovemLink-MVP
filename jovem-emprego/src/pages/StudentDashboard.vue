<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow p-4 flex justify-between">
      <h1 class="text-xl font-bold">Dashboard do Estudante</h1>
      <button @click="logout" class="text-red-600 font-medium">Sair</button>
    </header>

    <main class="p-6 max-w-4xl mx-auto">
      <h2 class="text-lg font-semibold mb-4">Vagas Disponíveis</h2>

      <div v-if="loading">Carregando...</div>

      <div v-else class="grid gap-4 md:grid-cols-2">
        <div
          v-for="job in jobs"
          :key="job.id_vaga"
          class="bg-white p-4 shadow rounded"
        >
          <h3 class="font-bold text-lg">{{ job.titulo }}</h3>
          <p class="text-gray-600">{{ job.empresa }}</p>

          <button
            @click="apply(job.id_vaga)"
            class="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Candidatar-se
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const jobs = ref([]);
const loading = ref(true);
const auth = useAuthStore();
const router = useRouter();

async function loadJobs() {
  loading.value = true;

  try {
    const res = await axios.get("http://localhost:3001/vagas");
    jobs.value = res.data;
  } catch (err) {
    console.error("Erro ao carregar vagas:", err);
  }

  loading.value = false;
}

function logout() {
  auth.logout();
  router.push("/login");
}

function apply(id) {
  alert(`Candidatado à vaga ${id}! (MVP)`);
}

onMounted(() => {
  if (!auth.isAuthenticated) {
    router.push("/login");
  }
  loadJobs();
});
</script>
