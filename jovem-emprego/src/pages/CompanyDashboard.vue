<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow p-4 flex justify-between">
      <h1 class="text-xl font-bold">Painel da Empresa</h1>
      <button @click="logout" class="text-red-600 font-medium">Sair</button>
    </header>

    <main class="p-6 max-w-4xl mx-auto">
      <h2 class="text-lg font-semibold mb-4">Publicar Nova Vaga</h2>

      <form @submit.prevent="postJob" class="bg-white p-4 rounded shadow mb-8 space-y-2">
        <input
          v-model="title"
          placeholder="Título da vaga"
          class="w-full border p-2 rounded"
        />

        <input
          v-model="description"
          placeholder="Descrição"
          class="w-full border p-2 rounded"
        />

        <button
          type="submit"
          class="bg-green-600 text-white px-4 py-2 rounded"
        >
          Publicar
        </button>
      </form>

      <h2 class="text-lg font-semibold mb-4">Vagas Cadastradas</h2>

      <div v-if="jobs.length === 0" class="text-gray-500">
        Nenhuma vaga cadastrada.
      </div>

      <div
        v-for="job in jobs"
        :key="job.id_vaga"
        class="bg-white p-4 rounded shadow mb-3"
      >
        <h3 class="font-bold text-lg">{{ job.titulo }}</h3>
        <p class="text-gray-600">{{ job.descricao }}</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const title = ref("");
const description = ref("");
const jobs = ref([]);

const auth = useAuthStore();
const router = useRouter();

async function loadJobs() {
  try {
    const res = await axios.get("http://localhost:3001/vagas");
    jobs.value = res.data;
  } catch (e) {
    console.error("Erro carregando vagas", e);
  }
}

async function postJob() {
  try {
    await axios.post(
      "http://localhost:3001/vagas",
      {
        titulo: title.value,
        descricao: description.value,
        id_usuario: auth.user.id_usuario
      },
      { headers: { Authorization: `Bearer ${auth.token}` } }
    );

    alert("✅ Vaga cadastrada!");
    title.value = "";
    description.value = "";
    loadJobs();

  } catch (e) {
    console.error("Erro ao cadastrar vaga:", e);
    alert("Erro ao cadastrar vaga");
  }
}

function logout() {
  auth.logout();
  router.push("/login");
}

onMounted(() => {
  if (!auth.isAuthenticated) {
    router.push("/login");
  } else {
    loadJobs();
  }
});
</script>
