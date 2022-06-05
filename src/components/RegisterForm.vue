<template>
  <!-- Registration Form -->
  <div
    v-if="show_alert"
    :class="alert_variant"
    class="text-white text-center font-bold p-5 mb-4"
  >
    {{ alert_message }}
  </div>
  <vee-form
    :validation-schema="schema"
    @submit="register"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field type="text" name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name" />
        <ErrorMessage class="text-red-600" name="name" />
    </div>
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
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          v-bind="field"
          type="password"
          placeholder="Password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field type="password" name="confirm_password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password" />
      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <!-- TOS -->
    <div class="mb-6 pl-6">
      <vee-field
        name="tos" type="checkbox" value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage class="text-red-600 block" name="tos" />
    </div>
    <button type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
        hover:bg-purple-700"
      :disabled="in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        password: 'required|min:3|max:100',
        confirm_password: 'passwords_mismatch:@password',
        tos: 'tos',
      },
      show_alert: false,
      in_submission: false,
      alert_variant: 'bg-blue-500',
      alert_message: 'Please wait! Your account is being created.',
    };
  },
  methods: {
    async register(values) {
      this.show_alert = true;
      this.in_submission = true;
      this.alert_variant = 'bg-blue-500';
      this.alert_message = 'Please wait! Your account is being created.';

      try {
        await this.$store.dispatch('register', values);
      } catch (error) {
        this.in_submission = false;
        this.alert_variant = 'bg-red-500';
        this.alert_message = 'An unexpected error occurred. Please try again later.';
        return;
      }

      this.alert_variant = 'bg-green-500';
      this.alert_message = 'Success! Your account has been created.';
      this.$router.push({
        name: 'Home',
      });
    },
  },
};
</script>
