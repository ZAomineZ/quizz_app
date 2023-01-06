<template>
  <AppLayout>
    <div class="page__content">
      <div class="col">
        <div class="my_3">
          <div class="row">
            <div class="col_12">
              <div class="row">
                <div class="col_12">
                  <div class="row justify_content_between">
                    <div class="col_12">
                      <h1 class="d_inline_block">Paramètres</h1>
                    </div>
                  </div>
                  <div class="line my_3"></div>
                  <div class="row py_3">
                    <div class="col_12 col_xl_9">
                      <TabMenu>
                        <TabItem
                          title="Change credentials"
                          @click="handleClickChangeCredentialsTab"
                          :active="changeCredentialsTabActive"
                        />
                        <TabItem
                          title="Change image"
                          @click="handleClickChangeImageTab"
                          :active="changeImageTabActive"
                        />
                        <TabItem
                          title="Change passwords"
                          @click="handleClickChangePasswordsTab"
                          :active="changePasswordsTabActive"
                        />
                      </TabMenu>
                      <TabContent v-if="changeCredentialsTabActive">
                        <SettingFormCredentials />
                      </TabContent>
                      <TabContent v-if="changeImageTabActive">
                        <SettingFormImage />
                      </TabContent>
                      <TabContent v-if="changePasswordsTabActive">
                        <SettingFormPasswords />
                      </TabContent>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import SettingFormCredentials from "~/components/Setting/SettingFormCredentials.vue";
import SettingFormPasswords from "~/components/Setting/SettingFormPasswords.vue";
import SettingFormImage from "~/components/Setting/SettingFormImage.vue";
import { definePageMeta } from "#imports";
import { ref } from "vue";

definePageMeta({
  middleware: ["auth"]
});

const changeCredentialsTabActive = ref<boolean>(true);
const changeImageTabActive = ref<boolean>(false);
const changePasswordsTabActive = ref<boolean>(false);

// Methods
const handleClickChangeCredentialsTab = () => {
  changeCredentialsTabActive.value = true;
  changeImageTabActive.value = false;
  changePasswordsTabActive.value = false;
};

const handleClickChangeImageTab = () => {
  changeCredentialsTabActive.value = false;
  changeImageTabActive.value = true;
  changePasswordsTabActive.value = false;
};

const handleClickChangePasswordsTab = () => {
  changeCredentialsTabActive.value = false;
  changeImageTabActive.value = false;
  changePasswordsTabActive.value = true;
};
</script>

<style scoped></style>
