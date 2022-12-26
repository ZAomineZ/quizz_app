import Quiz from "../../../Models/Quiz";
import { ModelQueryBuilderContract } from "@ioc:Adonis/Lucid/Orm";
import { QuizDifficulty } from "../../../enums/Quiz";

export default class QuizSortController {
  public async index({ response, params }) {
    let search = params?.s ?? "";
    let categoryID = params?.categoryId ?? null;
    let sort = params?.sort ?? null;
    let difficulty = params?.difficulty ?? (null as QuizDifficulty | null);
    let year = params?.year ?? null;
    let limit = params?.limit ?? 18;
    let page = params?.page ?? 1;

    let query = Quiz.query() as ModelQueryBuilderContract<typeof Quiz, Quiz>;

    if (search.length !== 0) {
      query = Quiz.query().whereRaw("title like %?%", [search]);
    }

    if (categoryID) {
      query = query?.where("category_id", "=", categoryID);
    }

    if (sort) {
      // @ts-ignore
      query = await this.sort<ModelQueryBuilderContract<typeof Quiz, Quiz>>(
        sort,
        query
      );
    }

    if (difficulty) {
      query = query?.where("difficulty", "=", difficulty);
    }

    if (year) {
      query = query.whereRaw(`YEAR(created_at) = ?`, [year]);
    }

    let quizzes = query.paginate(page, limit);

    return response.json({
      success: true,
      quizzes
    });
  }

  private async sort<T extends ModelQueryBuilderContract<typeof Quiz, Quiz>>(
    sort: string,
    query: T
  ): Promise<T> {
    if (sort === "title_a_z") {
      query = query.orderBy("title", "asc");
    }

    if (sort === "title_z_a") {
      query = query.orderBy("title", "desc");
    }

    if (sort === "date_newest") {
      query = query.orderBy("created_at", "desc");
    }

    if (sort === "date_oldest") {
      query = query.orderBy("created_at", "asc");
    }

    if (sort === "update_newest") {
      query = query.orderBy("updated_at", "desc");
    }

    if (sort === "update_oldest") {
      query = query.orderBy("updated_at", "asc");
    }

    if (sort === "questions_desc") {
      query = query.withCount("questions").orderBy("questions_count", "desc");
    }

    if (sort === "questions_asc") {
      query = query.withCount("questions").orderBy("questions_count", "asc");
    }

    return query;
  }
}
