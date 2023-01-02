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
            <ul class="nav nav_pills mb_3" role="tablist">
              <li class="nav_item" role="presentation">
                <a href="#" class="nav_link active" role="tab">Test</a>
              </li>
              <li class="nav_item" role="presentation">
                <a href="#" class="nav_link" role="tab">Test 1</a>
              </li>
              <li class="nav_item" role="presentation">
                <a href="#" class="nav_link" role="tab">Test 2</a>
              </li>
            </ul>
            <div class="tab_content">
              <div class="tab_pane fade active show">
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
                          <tr>
                            <td>Avatar.png</td>
                            <td>BluupA0mine</td>
                            <td>10/10</td>
                          </tr>
                          <tr>
                            <td>Avatar.png</td>
                            <td>BluupA0mine</td>
                            <td>10/10</td>
                          </tr>
                          <tr>
                            <td>Avatar.png</td>
                            <td>BluupA0mine</td>
                            <td>10/10</td>
                          </tr>
                          <tr>
                            <td>Avatar.png</td>
                            <td>BluupA0mine</td>
                            <td>10/10</td>
                          </tr>
                          <tr>
                            <td>Avatar.png</td>
                            <td>BluupA0mine</td>
                            <td>10/10</td>
                          </tr>
                        </Table>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
