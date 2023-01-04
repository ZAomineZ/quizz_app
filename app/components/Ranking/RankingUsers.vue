<template>
  <div class="col_12">
    <div class="row">
      <div class="col_12">
        <div class="row justify_content_between">
          <div class="col_12">
            <h1 class="d_inline_block">Classement</h1>
          </div>
        </div>
        <div class="line my_3"></div>
        <div class="row py_3">
          <div class="col_12 col_xl_9">
            <TabMenu>
              <TabItem
                title="Scores"
                @click="handleClickScoresTab"
                :active="scoresTabActive"
              />
              <TabItem
                title="Participations"
                @click="handleClickParticipationsTab"
                :active="participationsTabActive"
              />
              <TabItem
                title="Publications"
                @click="handleClickPublicationsTab"
                :active="publicationsTabActive"
              />
            </TabMenu>
            <TabContent v-if="scoresTabActive">
              <RankingScores />
            </TabContent>
            <TabContent v-if="participationsTabActive">
              <RankingParticipations />
            </TabContent>
            <TabContent v-if="publicationsTabActive">
              <RankingPublications />
            </TabContent>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "#imports";

const scoresTabActive = ref<boolean>(true);
const participationsTabActive = ref(false);
const publicationsTabActive = ref(false);

// Methods
const handleClickScoresTab = () => {
  scoresTabActive.value = true;
  participationsTabActive.value = false;
  publicationsTabActive.value = false;
};

const handleClickParticipationsTab = () => {
  scoresTabActive.value = false;
  participationsTabActive.value = true;
  publicationsTabActive.value = false;
};

const handleClickPublicationsTab = () => {
  scoresTabActive.value = false;
  participationsTabActive.value = false;
  publicationsTabActive.value = true;
};
</script>

<style scoped></style>
