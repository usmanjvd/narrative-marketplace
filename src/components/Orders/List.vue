<template>
  <Loading
    v-if="isLoading"
  />
  <div v-else>
    <div
      v-if="items.length"
      class="not-prose relative bg-slate-50 rounded-xl overflow-hidden"
    >
      <div class="relative rounded-xl overflow-auto">
        <div class="shadow-sm overflow-hidden mt-4">
          <table class="border-collapse table-auto w-full text-sm">
            <thead>
              <tr>
                <!-- eslint-disable-next-line -->
                <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Sr.</th>
                <!-- eslint-disable-next-line -->
                <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Name</th>
                <!-- eslint-disable-next-line -->
                <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Price</th>
                <!-- eslint-disable-next-line -->
                <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Package Type</th>
                <!-- eslint-disable-next-line -->
                <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Created On</th>
                <!-- eslint-disable-next-line -->
                <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Updated On</th>
                <!-- eslint-disable-next-line -->
                <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200">&nbsp;</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-slate-800">
              <tr
                :key="item.name"
                v-for="(item, index) in items"
              >
                <!-- eslint-disable-next-line -->
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{{ index + 1 }}</td>
                <!-- eslint-disable-next-line -->
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                  <a
                    href="#"
                    class="underline"
                    @click.prevent="() => onNameClick(item.id)"
                  >{{ item.name }}</a>
                </td>
                <!-- eslint-disable-next-line -->
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{{ item.price }}</td>
                <!-- eslint-disable-next-line -->
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{{ item.packageType }}</td>
                <!-- eslint-disable-next-line -->
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{{ moment(item.createdOn).format() }}</td>
                <!-- eslint-disable-next-line -->
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{{ moment(item.updatedOn).format() }}</td>
                <!-- eslint-disable-next-line -->
                <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-red-700">
                  <i
                    @click="() => onOrderDelete(item.id)"
                    class="far fa-times-circle fa-fw text-xl cursor-pointer"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div
      v-else
      class="text-center text-slate-400"
    >No Records Found</div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapState, mapActions } from 'vuex';
import Loading from '@/components/Loading.vue';

export default {
  name: 'OrdersList',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Loading,
  },
  data() {
    return {
      moment,
    };
  },
  computed: {
    ...mapState(['isLoading']),
  },
  methods: {
    ...mapActions(['deleteOrder']),
    onNameClick(id) {
      this.$router.push({
        name: 'OrderDetail',
        params: { id },
      });
    },
    onOrderDelete(id) {
      this.deleteOrder(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-slate-50 {
  background-color: rgb(248, 250, 252);
}

.text-slate-400 {
  color: rgb(148, 163, 184);
}
</style>
