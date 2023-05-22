<template>
  <div class="container mx-auto">
    <div class="bg-gray-950 text-gray-300 rounded-lg shadow-lg p-8">
      <div class="flex flex-col">
        <div class="relative mr-8 w-full h-96">
          <img
            :src="imageURL"
            :alt="movie.title"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div>
          <h1
            class="text-4xl font-bold my-4 p-4 bg-[#ffd700] rounded-lg text-gray-950"
          >
            {{ movie.title }}
          </h1>
          <div class="text-gray-300 mb-4 text-xl">
            <span class="title-span">Release Date:</span>
            {{ movie.release_date }}
          </div>
          <div class="text-gray-300 mb-4 text-xl">
            <span class="title-span">Rating:</span>
            {{ movie.vote_average }}
          </div>
          <div class="text-gray-300 mb-4 text-xl">
            <span class="title-span">Overview:</span>
            {{ movie.overview }}
          </div>
          <div
            class="text-gray-300 mb-4 text-xl"
            :class="{ 'not-available': !movie.budget }"
          >
            <span class="title-span">Budget:</span>
            {{ formatCurrency(movie.budget) }}
          </div>
          <div
            class="text-gray-300 mb-4 text-xl"
            :class="{ 'not-available': !movie.revenue }"
          >
            <span class="title-span">Revenue:</span>
            {{ formatCurrency(movie.revenue) }}
          </div>
          <div class="text-gray-300 mb-4 text-xl">
            <span class="title-span">Genres:</span>
            <span v-for="(genre, index) in movie.genres" :key="genre.id">
              {{ genre.name }}
              <span v-if="index !== movie.genres.length - 1">,</span>
            </span>
          </div>
          <div class="text-gray-300 mb-4 text-xl">
            <span class="title-span">Production Companies:</span>
            <ul v-if="movie.production_companies.length" class="list-disc pl-6">
              <li
                v-for="company in movie.production_companies"
                :key="company.id"
                class="hover:bg-blue-500 hover:text-gray-950 hover:font-bold"
              >
                <router-link
                  class="flex"
                  :to="{ name: 'Company', params: { id: company.id } }"
                >
                  {{ company.name }}
                </router-link>
              </li>
            </ul>
            <span v-else class="not-available">Not Available</span>
          </div>
          <div class="text-gray-300 mb-4 text-xl">
            <span class="title-span">Homepage:</span>
            <a
              v-if="movie.homepage"
              :href="movie.homepage"
              target="_blank"
              class="text-blue-400 hover:underline"
              >{{ movie.homepage }}</a
            >
            <span v-else class="not-available">Not Available</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { fullImageUrl } from "@/helpers";

const props = defineProps({
  movie: Object,
});
const imageURL = computed(() => {
  return fullImageUrl(props.movie.backdrop_path);
});

const formatCurrency = (value) => {
  if (!value) {
    return "Not Available";
  }

  if (value >= 1e6) {
    return (value / 1e6).toFixed(1) + "M USD";
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(1) + "K USD";
  } else {
    return value + " USD";
  }
};
</script>

<style scoped>
.title-span {
  @apply font-bold bg-[#ffd700] text-gray-950 p-1 rounded-sm;
}

.not-available {
  @apply text-red-400;
}
</style>
