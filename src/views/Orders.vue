<template>
  <div class="container mx-auto px-4 py-4">
    <div class="flex items-center mb-8">
      <h1 class="text-2xl flex-grow">Orders</h1>
      <button
        @click.prevent="TOGGLE_ORDER_FORM_MODAL"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded grow-0"
      >
        Create Order
      </button>
    </div>
    <OrdersList
      :items="orders"
    />
    <OrderForm
      @orderCreated="fetchOrders"
    />
  </div>
</template>

<script>
import OrderForm from '@/components/OrderForm.vue';
import OrdersList from '@/components/Orders/List.vue';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'Orders',
  components: {
    OrderForm,
    OrdersList,
  },
  computed: {
    ...mapState(['orders', 'showOrderFormModal']),
  },
  methods: {
    ...mapMutations(['TOGGLE_ORDER_FORM_MODAL']),
    ...mapActions(['fetchOrders']),
  },
  mounted() {
    if (!this.orders.length) {
      this.fetchOrders();
    }
  },
};
</script>
