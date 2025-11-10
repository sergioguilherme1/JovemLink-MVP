<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      @submit.prevent="register"
      class="bg-white p-8 rounded shadow-md w-full max-w-md"
    >
      <h2 class="text-2xl font-bold mb-4 text-center">Cadastro</h2>

      <!-- Seletor de tipo -->
      <div class="flex gap-2 mb-4">
        <button
          type="button"
          @click="role = 'estudante'"
          :class="buttonClass('estudante')"
          class="flex-1 p-2 rounded border"
        >
          Sou Estudante
        </button>

        <button
          type="button"
          @click="role = 'empresa'"
          :class="buttonClass('empresa')"
          class="flex-1 p-2 rounded border"
        >
          Sou Empresa
        </button>
      </div>

      <input
        v-model="name"
        placeholder="Nome"
        class="w-full p-2 border rounded mb-3"
      />

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full p-2 border rounded mb-3"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Senha"
        class="w-full p-2 border rounded mb-3"
      />

      <!-- Campos específicos para empresa -->
      <div v-if="role === 'empresa'" class="space-y-3">
        <input
          v-model="nomeFantasia"
          placeholder="Nome fantasia"
          class="w-full p-2 border rounded"
        />
        <input
          v-model="cnpj"
          placeholder="CNPJ"
          class="w-full p-2 border rounded"
        />
      </div>

      <!-- Campos específicos para estudante -->
      <div v-if="role === 'estudante'" class="space-y-3">
        <input
          v-model="curso"
          placeholder="Curso"
          class="w-full p-2 border rounded"
        />
        <input
          v-model="instituicao"
          placeholder="Instituição"
          class="w-full p-2 border rounded"
        />
      </div>

      <div class="flex gap-2 mt-4">
        <button
          type="submit"
          class="flex-1 bg-green-600 hover:bg-green-700 text-white p-2 rounded"
        >
          Cadastrar
        </button>

        <button
          type="button"
          @click="goBack"
          class="flex-1 bg-gray-400 hover:bg-gray-500 text-white p-2 rounded"
        >
          Voltar
        </button>
      </div>

    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("estudante");

// empresa
const nomeFantasia = ref("");
const cnpj = ref("");

// estudante
const curso = ref("");
const instituicao = ref("");

const router = useRouter();

async function register() {
  try {
    const body = {
      nome: name.value,
      email: email.value,
      senha: password.value,
      tipo: role.value,
    };

    if (role.value === "empresa") {
      body.cnpj = cnpj.value;
      body.nome_fantasia = nomeFantasia.value;
    }

    if (role.value === "estudante") {
      body.curso = curso.value;
      body.instituicao = instituicao.value;
    }

    await axios.post("http://localhost:3001/auth/register", body);

    alert("✅ Cadastro realizado com sucesso!");

    if (role.value === "empresa") {
      router.push("/company");
    } else {
      router.push("/student");
    }
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.error || "Erro ao cadastrar");
  }
}

function buttonClass(type) {
  return role.value === type
    ? "bg-blue-600 text-white"
    : "bg-gray-200 hover:bg-gray-300";
}

function goBack() {
  router.push("/login");
}
</script>
