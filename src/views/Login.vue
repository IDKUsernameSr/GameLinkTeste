<template>
  <section
  class="normal-breadcrumb set-bg"
  :style="{ backgroundImage: 'url(/img/normal-breadcrumb.jpg)' }"
>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 text-center">
        <div class="normal__breadcrumb__text">
          <h2>Entrar</h2>
          <p>Bem vindo ao Gamelink.</p>
        </div>
      </div>
    </div>
  </div>
</section>
  <section class="login spad">
    <div class="container">
      <div class="row">
        <!-- Login -->
        <div class="col-12 col-lg-6 mb-6">
          <div class="login__form">
            <h3>Entre na sua conta!</h3>
            <form @submit.prevent="handleLogin">
              <div class="input__item">
                <input v-model="loginEmail" type="email" placeholder="Endereço de email" />
                <span class="icon_mail"></span>
              </div>
              <div class="input__item">
                <input v-model="loginPassword" type="password" placeholder="Senha" />
                <span class="icon_lock"></span>
              </div>
              <button type="submit" class="site-btn">Entrar</button>
            </form>
            <a href="#" class="forget_pass">Esqueceu sua senha?</a>
          </div>
        </div>

        <!-- Register -->
        <div class="col-12 col-lg-6 mb-6">
          <div class="login__register">
            <div class="signup">
              <h3>Cadastre-se!</h3>
              <form @submit.prevent="handleRegister">
                <div class="input__item">
                  <input v-model="registerEmail" type="email" placeholder="Endereço de email" />
                  <span class="icon_mail"></span>
                </div>
                <div class="input__item">
                  <input v-model="registerName" type="text" placeholder="Seu nome" />
                  <span class="icon_profile"></span>
                </div>
                <div class="input__item">
                  <input v-model="registerPassword" type="password" placeholder="Senha" />
                  <span class="icon_lock"></span>
                </div>
                <button type="submit" class="site-btn">Cadastrar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const loginEmail = ref('')
const loginPassword = ref('')

const registerEmail = ref('')
const registerName = ref('')
const registerPassword = ref('')

const router = useRouter()

function saveUser(email, name, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]")
  users.push({ email, name, password })
  localStorage.setItem("users", JSON.stringify(users))
}

function findUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]")
  return users.find(u => u.email === email && u.password === password)
}

function handleRegister() {
  saveUser(registerEmail.value, registerName.value, registerPassword.value)
  alert("Cadastro realizado com sucesso!")
  registerEmail.value = ''
  registerName.value = ''
  registerPassword.value = ''
}

function handleLogin() {
  const user = findUser(loginEmail.value, loginPassword.value)
  if (user) {
    localStorage.setItem("isLoggedIn", "true")
    alert(`Bem-vindo, ${user.name}!`)
    window.location.href = 'perfil.html'
  } else {
    alert("Email ou senha incorretos.")
  }
}
</script>