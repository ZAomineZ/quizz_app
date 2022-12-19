<template>
  <AppLayout>
    <div class="page__content">
      <div class="col">
        <h1 class="my_3">Search Quiz</h1>
        <div class="line my_3"></div>
      </div>
      <div class="col">
        <ButtonBadge label="Filters">
          <i class="fa fa-solid fa-arrow-down-wide-short"></i>
        </ButtonBadge>
        <div class="collapse show">
          <Card class-name="mb_3">
            <CardBody>
              <div class="row">
                <div class="col_12">
                  <div class="d_inline_block">
                    <span class="mr_3">Select one or more Filters below</span>
                  </div>
                  <div class="d_inline_block">
                    <div class="input_group_search">
                      <Button class-name="btn_secondary border_class" label="Reset all Filters" />
                    </div>
                  </div>
                </div>
                <div class="line my_3"></div>
                <div class="col_12 col_md_6 col_lg_3">
                  <div>
                    <h6>Search</h6>
                    <div class="input_group_search">
                      <span class="input_group_search_wrap">
                        <i></i>
                        <Input placeholder="Search..." type="text" className="form_control form_control_sm rounded" />
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col_12 col_md_6 col_lg_3">
                  <div>
                    <h6>Catégories</h6>
                    <div class="input_group_search">
                      <InputCheckbox label="One Piece" count="20" />
                      <InputCheckbox label="One Piece" count="20" />
                      <InputCheckbox label="One Piece" count="20" />
                      <InputCheckbox label="One Piece" count="20" />
                      <InputCheckbox label="One Piece" count="20" />
                      <a href="#" class="input_group_toggle">See more</a>
                      <a href="#" class="input_group_toggle input_group_hidden">See less</a>
                    </div>
                  </div>
                </div>
                <div class="col_12 col_md_6 col_lg_3">
                  <div>
                    <h6>Sort</h6>
                    <div class="input_group_search">
                      <Select>
                        <option value="">Sort by</option>
                        <option value="title_a_z">Title (A-Z)</option>
                        <option value="title_z_a">Title (Z-A)</option>
                        <option value="date_newest">Date (Newest)</option>
                        <option value="date_oldest">Date (Oldest)</option>
                        <option value="update_newest">Update (Newest)</option>
                        <option value="update_oldest">Update (Oldest)</option>
                        <option value="post_type">Post Type</option>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <h6>Authors</h6>
                    <div class="input_group_search">
                      <Select>
                        <option value="">Sort by</option>
                        <option value="title_a_z">Title (A-Z)</option>
                        <option value="title_z_a">Title (Z-A)</option>
                        <option value="date_newest">Date (Newest)</option>
                        <option value="date_oldest">Date (Oldest)</option>
                        <option value="update_newest">Update (Newest)</option>
                        <option value="update_oldest">Update (Oldest)</option>
                        <option value="post_type">Post Type</option>
                      </Select>
                    </div>
                  </div>
                </div>
                <div class="col_12 col_md_6 col_lg_3">
                  <div>
                    <h6>Years</h6>
                    <div class="input_group_search">
                      <Select>
                        <option value="">Sort by</option>
                        <option value="title_a_z">Title (A-Z)</option>
                        <option value="title_z_a">Title (Z-A)</option>
                        <option value="date_newest">Date (Newest)</option>
                        <option value="date_oldest">Date (Oldest)</option>
                        <option value="update_newest">Update (Newest)</option>
                        <option value="update_oldest">Update (Oldest)</option>
                        <option value="post_type">Post Type</option>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <h6>Studios</h6>
                    <div class="input_group_search">
                      <Select>
                        <option value="">Sort by</option>
                        <option value="title_a_z">Title (A-Z)</option>
                        <option value="title_z_a">Title (Z-A)</option>
                        <option value="date_newest">Date (Newest)</option>
                        <option value="date_oldest">Date (Oldest)</option>
                        <option value="update_newest">Update (Newest)</option>
                        <option value="update_oldest">Update (Oldest)</option>
                        <option value="post_type">Post Type</option>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col_6 col_md_4 col_xl_2 p_3" v-for="item in [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]">
            <CardWrap />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="col_12 py-2">
          <div class="my_3">
            <div class="row">
              <div class="col_12">
                <div class="my_3 text_center">
                  <Pagination />
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
import Card from "~/components/Card/Card.vue";
import CardBody from "~/components/Card/CardBody.vue";
import ButtonBadge from "~/components/Button/ButtonBadge.vue";
import Button from "~/components/Button/Button.vue";
import Input from "~/components/Form/Input.vue";
import InputCheckbox from "~/components/Form/InputCheckbox.vue";
import Select from "~/components/Form/Select.vue";</script>

<style scoped lang="scss">
.input_group_search {
  margin-bottom: 1.5rem;
}

.input_group_search_wrap {
  display: inline-block;
  position: relative;

  i {
    position: absolute;
    right: 0;
    line-height: 1;
    opacity: .5;
    height: 100%;
    cursor: pointer;

    &:before {
      content: '';
      display: inline-block;
      width: 30px;
      height: 100%;
      background: url("/img/icon-search.png") no-repeat 5px 50%;
      background-size: 20px 20px;
    }
  }

  input {
    min-width: 240px;
    margin: 0;
    padding-right: 30px;
  }
}

.input_group_hidden {
  display: none;
}

.input_group_toggle {
  cursor: pointer;
}
</style>