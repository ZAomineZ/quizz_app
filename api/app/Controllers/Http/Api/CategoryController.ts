import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Category from "../../../Models/Category";

export default class CategoryController {
  public async list({ params, response }: HttpContextContract) {
    let limit = params?.limit ?? 12;

    let categories = await Category.query().orderBy("created_at").limit(limit);
    return response.json({
      success: true,
      categories
    });
  }
}
