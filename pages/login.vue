<template lang="">
  <div
    class="flex gap-3 absolute top-0 bottom-0 right-0 left-0 flex-col justify-center items-center bg-gradient-to-r from-sky-500 to-red-400"
  >
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col gap-2">
      <div class="">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <input
          v-model="username"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Username"
        />
      </div>
      <div class="">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          v-model="password"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="******************"
        />
      </div>
      <recaptcha />
      <div class="flex items-center justify-between w-full">
        <button
          @click="login()"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="button"
        >
          Sign In
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
    }
  },
  methods: {
    async login() {
      try {
        const token = await this.$recaptcha.getResponse()

        this.error = null
        this.$auth
          .loginWith('local', {
            data: {
              username: this.username,
              password: this.password,
              token,
            },
          })
          .catch((err) => {
            console.log(err)
          })
        await this.$recaptcha.reset()
      } catch (error) {
        console.log('Login error:', error)
      }
    },
  },
}
</script>
<style lang=""></style>
