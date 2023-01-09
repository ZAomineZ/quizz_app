import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Category from "../../../Models/Category";

export default class CategoryController {
  public async all({ response }: HttpContextContract) {
    let categories = await Category.query().orderBy("name", "asc");

    return response.json({ success: true, categories });
  }

  public async list({ request, response }: HttpContextContract) {
    let qs = request?.qs();
    let limit = qs?.limit ?? 12;
    let page = qs?.page ?? 1;

    let categories = await Category.query()
      .orderBy("created_at")
      .paginate(page, limit);
    return response.json({
      success: true,
      categories
    });
  }

  public async showSlug({ params, response }: HttpContextContract) {
    let categorySlug = params?.categorySlug;

    // Find category
    let category = await Category.query()
      .where("slug", "=", categorySlug)
      .firstOrFail();

    return response.json({
      success: true,
      category
    });
  }
}
