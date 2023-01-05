import Quiz from "../../../Models/Quiz";
import { ModelQueryBuilderContract } from "@ioc:Adonis/Lucid/Orm";
import { QuizDifficulty } from "../../../enums/Quiz";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { QuizState } from "../../../enums/QuizState";
import Database from "@ioc:Adonis/Lucid/Database";
import User from "../../../Models/User";

export default class QuizSortController {
  public async index({ response, request }: HttpContextContract) {
    const qs = request.qs();

    let search = qs?.s ?? "";
    let categoryID = qs?.categoryId ?? null;
    let sort = qs?.sort ?? null;
    let difficulty = qs?.difficulty ?? (null as QuizDifficulty | null);
    let year = qs?.year ?? null;
    let creatorID = qs?.creatorId;
    let limit = qs?.limit ?? 18;
    let page = qs?.page ?? 1;

    let query = Quiz.query() as ModelQueryBuilderContract<typeof Quiz, Quiz>;

    if (search.length !== 0) {
      query = query?.whereRaw(`LOWER(title) LIKE ?`, [`%${search}%`]);
    }

    if (categoryID) {
      query = query?.where("category_id", "=", categoryID);
    }

    if (sort) {
      query = this.sort(sort, query);
    }

    if (difficulty) {
      query = query?.where("difficulty", "=", difficulty);
    }

    if (year) {
      query = query.whereRaw(`extract(year from created_at) = ?`, [year]);
    }

    if (creatorID) {
      query = query?.where("user_id", "=", creatorID);
    }

    let quizzes = await query
      .where("is_public", "=", QuizState.IS_PUBLIC)
      .paginate(page, limit);

    // Years label
    let years = await Quiz.query()
      .select(Database.raw("extract(year from created_at)"))
      .distinct()
      .groupBy("created_at");
    years = years.map((item: any) => item.$extras.date_part);
    // Creators label
    let creators = await User.query()
      .select("id", "username")
      .distinct()
      .whereHas("quizzes", (builder) => {
        builder.where("is_public", "=", QuizState.IS_PUBLIC);
      })
      .has("quizzes", ">=", 1)
      .groupBy("id", "username");

    return response.json({
      success: true,
      years: years,
      quizzes,
      creators
    });
  }

  private sort<T extends ModelQueryBuilderContract<typeof Quiz, Quiz>>(
    sort: string,
    query: T
  ): T {
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
