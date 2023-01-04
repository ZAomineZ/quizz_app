<template>
  <div class="row">
    <div class="col_12">
      <Card class-name="card_custom">
        <CardBody class-name="p_3">
          <Table class-name="table_responsive table_bordered">
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
            <tr v-for="ranking in rankings">
              <th>LOL</th>
              <th>{{ ranking?.user?.username }}</th>
              <th>{{ ranking.meta.scoreTotal }}</th>
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
import { RankingScores } from "~/types/Ranking";

const rankingAPI = new Ranking();

const rankings = ref<RankingScores[]>([]);

onMounted(async () => {
  const response = await rankingAPI.scores();
  rankings.value = response.rankings.data;
});
</script>

<style scoped></style>
