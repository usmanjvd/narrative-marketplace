<template>
  <div>
    <!-- Login Form -->
    <div
      v-if="show_alert"
      :class="alert_variant"
      class="text-white text-center font-bold p-5 mb-4"
    >
      {{ alert_message }}
    </div>
    <vee-form
      :validation-schema="schema"
      @submit="login"
    >
      <!-- Email -->
      <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <vee-field type="email" name="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Email" />
          <ErrorMessage class="text-red-600" name="email" />
      </div>
      <!-- Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <vee-field type="password" name="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password" />
          <ErrorMessage class="text-red-600" name="password" />
      </div>
      <button
        type="submit"
        :disabled="in_submission"
        class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
          hover:bg-purple-700">
        Submit
      </button>
    </vee-form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      show_alert: false,
      in_submission: false,
      alert_variant: 'bg-blue-500',
      alert_msg: 'Please wait! We are loggin you in.',
      schema: {
        email: 'required|email',
        password: 'required|min:3|max:32',
      },
    };
  },
  methods: {
    async login(values) {
      this.show_alert = true;
      this.in_submission = true;
      this.alert_variant = 'bg-blue-500';
      this.alert_message = 'Please wait! We are loggin you in.';

      try {
        await this.$store.dispatch('login', values);
      } catch {
        this.in_submission = false;
        this.alert_variant = 'bg-red-500';
        this.alert_msg = 'Invalid Auth Details';
      }

      this.alert_variant = 'bg-green-500';
      this.alert_message = 'Success! You are now logged in.';
      this.$router.push({
        name: 'Home',
      });
    },
  },
};
</script>
