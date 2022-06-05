<template>
  <div class="container mx-auto px-4 py-4">
    <div class="flex items-center mb-4">
      <h1 class="text-2xl flex-grow text-center">Buy Order Detail</h1>
    </div>
    <Loading
      v-if="isLoading"
    />
    <div v-else>
      <div
        class="max-w-sm rounded overflow-hidden shadow-lg mx-auto"
      >
        <div class="p-6">
          <div v-if="selectedOrder">
            <div class="mb-2">
              <div class="font-bold text-xl">Order Name</div>
              <p class="text-gray-700 text-base">{{ selectedOrder.name }}</p>
            </div>
            <div class="mb-2">
              <div class="font-bold text-xl">Price</div>
              <p class="text-gray-700 text-base">{{ selectedOrder.price }}</p>
            </div>
            <div class="mb-4">
              <div class="font-bold text-xl">Package Type</div>
              <p class="text-gray-700 text-base">{{ selectedOrder.packageType }}</p>
            </div>
            <div class="flex">
              <div class="flex-grow pr-2">
                <!-- eslint-disable-next-line -->
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" @click.prevent="TOGGLE_ORDER_FORM_MODAL">
                  Edit
                </button>
              </div>
              <div class="flex-grow pl-2">
                <button
                  @click="onOrderDelete"
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div
            v-else
            class="text-center"
          >Record Not Found</div>
        </div>
      </div>
    </div>
    <OrderForm
      :initial-values="selectedOrder"
      @orderUpdated="fetchOrderDetail"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import Loading from '@/components/Loading.vue';
import OrderForm from '@/components/OrderForm.vue';

export default {
  name: 'OrderDetail',
  components: {
    Loading,
    OrderForm,
  },
  computed: {
    ...mapState([
      'isLoading',
      'selectedOrder',
      'showOrderFormModal',
    ]),
  },
  methods: {
    ...mapMutations(['TOGGLE_ORDER_FORM_MODAL']),
    ...mapActions(['fetchOrder', 'deleteOrder']),
    async onOrderDelete() {
      await this.deleteOrder(this.$route.params.id);
      this.$router.push({ name: 'Orders' });
    },
    fetchOrderDetail() {
      this.fetchOrder(this.$route.params.id);
    },
  },
  mounted() {
    if (!this.selectedOrder) {
      this.fetchOrderDetail();
    }
  },
};
</script>
