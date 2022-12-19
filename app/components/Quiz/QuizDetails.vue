<template>
  <div class="col_12 quiz__bg_color">
    <div class="row">
      <div class="col_12">
        <div class="row justify_content_between">
          <div class="col_12">
            <h1 class="d_inline_block">Quiz: One Piece</h1>
          </div>
        </div>
        <div class="line my_3"></div>
        <div class="row py_3">
          <div class="col_12 col_md_4">
            <div class="col_sticky_top mb_5">
              <img class="img__fluid w_100 shadow" width="600" height="900"
                   src="https://demo.ramsthemes.com/projects/animace/wp-content/uploads/2022/01/Vagabond_-_Volume_1-600x900.jpg"
                   alt="">
            </div>
          </div>
          <div class="col_12 col_md_8">
            <div class="my_auto">
              <div class="d_inline_block">
                <ButtonBadge label="Commencer le quiz" />
              </div>
            </div>
            <div class="row my_3">
              <div class="col_12">
                <Card class-name="mb_3">
                  <CardBody class-name="p_2">
                    <Table class-name="table__borderless">
                      <tr>
                        <th scope="row">Author</th>
                        <td>
                          <a href="https://demo.ramsthemes.com/projects/animace/manga_authors/takehiko-inoue/">Takehiko
                            Inoue</a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Author</th>
                        <td>
                          <a href="https://demo.ramsthemes.com/projects/animace/manga_authors/takehiko-inoue/">Takehiko
                            Inoue</a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Author</th>
                        <td>
                          <a href="https://demo.ramsthemes.com/projects/animace/manga_authors/takehiko-inoue/">Takehiko
                            Inoue</a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Author</th>
                        <td>
                          <a href="https://demo.ramsthemes.com/projects/animace/manga_authors/takehiko-inoue/">Takehiko
                            Inoue</a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Author</th>
                        <td>
                          <a href="https://demo.ramsthemes.com/projects/animace/manga_authors/takehiko-inoue/">Takehiko
                            Inoue</a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Author</th>
                        <td>
                          <a href="https://demo.ramsthemes.com/projects/animace/manga_authors/takehiko-inoue/">Takehiko
                            Inoue</a>
                        </td>
                      </tr>
                    </Table>
                  </CardBody>
                </Card>
                <Card class-name="mb_3">
                  <CardBody>
                    <h5>Description</h5>
                    <p>Comic adaptation of one of the classics of Japanese literature, the biographical novel by Eiji
                      Yoshikawa: “Musashi”. tells the story of the legendary swordsman Musashi Miyamoto, Japan’s most
                      important historical figure in the development of sword fighting techniques. At the beginning of
                      the story we see the protagonist as a violent and angry teenager named Takezo, who survives (even
                      being on the losing side) one of the bloodiest battles in history: Sekigahara. After his life is
                      turned upside down thanks to the intervention of a monk named Takuan, Takezo changes his name to
                      Musashi and embarks on a quest for self-improvement that will bring him face to face with the
                      greatest experts in the arts. country martial. So little by little, with blood and sweat, he
                      builds his own legend, that of the most powerful true “tramp” in all of Japan.</p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Card from "../Card/Card.vue";</script>

<style scoped>
.quiz__bg_color {
  background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(248, 247, 255, 1) 50%, rgba(255, 255, 255, 1) 100%);
}
</style>