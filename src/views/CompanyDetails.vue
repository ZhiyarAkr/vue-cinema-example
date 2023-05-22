<template>
  <div class="w-full flex justify-center">
    <div class="w-1/2">
      <transition name="fade" mode="out-in">
        <div v-if="company" class="container mx-auto">
          <div class="bg-gray-950 text-gray-300 rounded-lg shadow-lg p-8">
            <div class="flex flex-col">
              <div class="relative mr-8 w-full h-96 bg-white rounded-lg">
                <img
                  :src="imageURL"
                  :alt="company.name"
                  class="absolute inset-0 w-full h-full"
                />
              </div>
              <div>
                <h1
                  class="text-4xl font-bold my-4 p-4 bg-[#ffd700] rounded-lg text-gray-950"
                >
                  {{ company.name }}
                </h1>
                <div class="text-gray-300 mb-4 text-xl">
                  <span class="title-span">Origin Country:</span>
                  {{ company.origin_country }}
                </div>
                <div class="text-gray-300 mb-4 text-xl">
                  <span class="title-span">Headquarters:</span>
                  {{ company.headquarters }}
                </div>
                <div class="text-gray-300 mb-4 text-xl">
                  <span class="title-span">Homepage:</span>
                  <a
                    v-if="company.homepage"
                    :href="company.homepage"
                    target="_blank"
                    class="text-blue-400 hover:underline"
                    >{{ company.homepage }}</a
                  >
                  <span v-else class="not-available">Not Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span v-else>Loading Details...</span>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { fullImageUrl } from "@/helpers";
import { useRoute } from "vue-router";
import axios from "@/http";

const company = ref();
const route = useRoute();
const fetchCompanyDetails = async () => {
  const { data } = await axios.get(`/company/${route.params.id}`);
  company.value = data;
};

const imageURL = computed(() => {
  return fullImageUrl(company.value.logo_path);
});

onMounted(() => {
  fetchCompanyDetails();
});
</script>

<style scoped>
.title-span {
  @apply font-bold bg-[#ffd700] text-gray-950 p-1 rounded-sm;
}

.not-available {
  @apply text-red-400;
}
</style>
