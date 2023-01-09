<template>
  <div class="row">
    <div class="col_12">
      <Card class-name="card_custom">
        <CardBody class-name="p_3">
          <Table class-name="table_bordered">
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Participations</th>
            </tr>
            <tr v-for="ranking in rankings">
              <th>
                <img
                  class="img__res img__wrap img__res_avatar"
                  :src="`${runtimeConfig.public.apiURL}${ranking?.user?.image}`"
                  alt=""
                />
              </th>
              <th>{{ ranking?.user?.username }}</th>
              <th>{{ ranking.meta.count_participations }}</th>
            </tr>
          </Table>
        </CardBody>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import Ranking from "~/utils/api/Ranking/Ranking";
import { onMounted, ref } from "vue";
import { RankingParticipations } from "~/types/Ranking";
import { useRuntimeConfig } from "#app";

const rankingAPI = new Ranking();

const runtimeConfig = useRuntimeConfig();

const rankings = ref<RankingParticipations[]>([]);

onMounted(async () => {
  const response = await rankingAPI.participations();
  rankings.value = response.rankings.data;
});
</script>

<style scoped></style>
