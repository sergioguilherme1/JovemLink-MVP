<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">

    <div class="w-full max-w-2xl h-80 bg-white rounded-2xl shadow-xl overflow-hidden flex">

      <!-- ✅ LADO ESQUERDO -->
      <div class="w-1/2 bg-sky-400 text-white flex flex-col justify-center items-center p-10 relative">

        <!-- 🔹 LOGO + TEXTO -->
        <div class="absolute top-4 left-4 flex items-center space-x-2">
          <img
            src="/jovemlink2.png"
            alt="JovemLink"
            class="h-12 w-auto object-contain"
          />
        </div>

        <h2 class="text-2xl font-bold mb-4 mt-6">Bem-vindo!</h2>

        <p class="text-center opacity-90 mb-3 text-sm">
          Para continuar conectado, faça login com suas informações pessoais.
        </p>

        <p class="text-center text-sm opacity-90 mb-4">
          Caso seja novo.
        </p>

        <router-link class="text-teal-600 font-semibold hover:underline" to="/register">
            <button

                class="bg-white px-10 py-2 rounded-full font-semibold hover:bg-gray-300 hover:text-teal-600 transition"
                >
                Cadastre-se
            </button>
        </router-link>

      </div>


      <!-- ✅ LADO DIREITO: LOGIN -->
      <div class="w-1/2 p-10 flex flex-col justify-center bg-white">

        <h2 class="text-2xl font-bold text-teal-600 mb-2 text-center">Entrar</h2>

        <form @submit.prevent="handleLogin" class="space-y-4">

          <div>
            <label class="block text-gray-600 font-semibold text-sm">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="Digite seu email"
              class="w-full p-1 border rounded-xl focus:ring-teal-500 focus:ring-2 outline-none"
            />
          </div>

          <div>
            <label class="block text-gray-600 font-semibold text-sm">Senha</label>
            <input
              v-model="password"
              type="password"
              placeholder="Digite sua senha"
              class="w-full p-1 border rounded-xl focus:ring-teal-500 focus:ring-2 outline-none"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-teal-500 hover:bg-teal-600 text-white p-1 rounded-xl font-semibold text-lg transition"
          >
            Entrar
          </button>

        </form>
      </div>

    </div>
  </div>
</template>
  
<script setup>
import axios from "axios";
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");

const router = useRouter();
const auth = useAuthStore();

async function handleLogin() {
  try {
    const res = await axios.post("http://localhost:3001/auth/login", {
      email: email.value,
      senha: password.value,
    });

    auth.login(res.data.user, res.data.token);

    if (res.data.user.tipo === "empresa") {
      router.push("/company");
    } else {
      router.push("/student");
    }
  } catch (e) {
    console.error(e);
    alert("Login inválido");
  }
}
</script>
