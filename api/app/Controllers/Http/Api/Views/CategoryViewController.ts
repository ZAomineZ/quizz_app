import ViewsCategory from "../../../../Models/ViewsCategory";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Category from "../../../../Models/Category";

export default class CategoryViewController {
  public async createView({ params, response, request }: HttpContextContract) {
    let clientIP = request?.ip();
    let categorySlug = params?.slug as number;

    // Create viewCategory
    const category = (await Category.query()
      .where("slug", "=", categorySlug)
      .first()) as Category;
    const viewCategory = await ViewsCategory.query()
      .where("ip", "=", clientIP)
      .where("category_id", "=", category?.id)
      .first();

    if (!viewCategory) {
      await ViewsCategory.create({
        ip: clientIP,
        category_id: category?.id
      });
    }

    return response.ok({});
  }
}
