<template>
  <!-- Auth Modal -->
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modalOrderForm"
    :class="{hidden: !showOrderFormModal}"
  >
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center
      sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
        shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-6 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Create Order</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click.prevent="TOGGLE_ORDER_FORM_MODAL">
              <i class="fas fa-times"></i>
            </div>
          </div>
          <vee-form
            @submit="creatOrder"
            :validation-schema="schema"
            :initial-values="initialValues"
          >
            <div
              v-if="show_alert"
              :class="alert_variant"
              class="text-white text-center font-bold p-5 mb-4"
            >
              {{ alert_message }}
            </div>
            <!-- Name -->
            <div class="mb-3">
              <label class="inline-block mb-2">Name</label>
              <vee-field type="text" name="name"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Name" />
                <ErrorMessage class="text-red-600" name="name" />
            </div>
            <!-- Price -->
            <div class="mb-3">
              <label class="inline-block mb-2">Price</label>
              <vee-field type="number" name="price"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Price" />
                <ErrorMessage class="text-red-600" name="price" />
            </div>
            <!-- Data Package Type -->
            <div class="mb-6">
              <label class="inline-block mb-2">Data Package Type</label>
              <vee-field as="select" name="packageType"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Select A Data Type"
              >
                <option value="" disabled>Select Package Type</option>
                <option value="device-location">Device Location</option>
                <option value="device-behavior">Device Behavior</option>
                <option value="id-mapping">ID Mapping</option>
              </vee-field>
              <ErrorMessage class="text-red-600" name="packageType" />
            </div>
            <button
              type="submit"
              :disabled="in_submission"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
              <span v-if="isEditMode">Update Order</span>
              <span v-else>Create Order</span>
            </button>
          </vee-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'OrderForm',
  props: {
    initialValues: {
      type: Object,
    },
  },
  data() {
    return {
      show_alert: false,
      in_submission: false,
      alert_variant: 'bg-blue-500',
      alert_msg: 'Please wait! We are loggin you in.',
      schema: {
        name: 'required',
        price: 'required',
        packageType: 'required',
      },
    };
  },
  computed: {
    ...mapState(['showOrderFormModal']),
    isEditMode() {
      return this.initialValues;
    },
  },
  methods: {
    ...mapMutations(['TOGGLE_ORDER_FORM_MODAL']),
    async creatOrder(values) {
      this.show_alert = true;
      this.in_submission = true;
      this.alert_variant = 'bg-blue-500';

      try {
        if (this.isEditMode) {
          this.alert_message = 'Please wait! Your order is being updated.';

          await this.$store.dispatch(
            'updateOrder',
            {
              ...values,
              id: this.$route.params.id,
            },
          );
          this.$emit('orderUpdated');
        } else {
          this.alert_message = 'Please wait! Your order is being created.';
          await this.$store.dispatch('createOrder', values);
          this.$emit('orderCreated');
        }
      } catch (error) {
        this.in_submission = false;
        this.alert_variant = 'bg-red-500';
        this.alert_message = 'An unexpected error occurred. Please try again later.';
        return;
      }

      this.alert_variant = 'bg-green-500';
      this.alert_message = 'Success! Your order has been created.';
    },
  },
};
</script>
