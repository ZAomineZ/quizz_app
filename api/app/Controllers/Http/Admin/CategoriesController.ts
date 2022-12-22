import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CategoryValidator from "../../../Validators/CategoryValidator";
import Category from "../../../Models/Category";

export default class CategoriesController {
  public async index({ view }: HttpContextContract) {
    return view.render("category.index");
  }

  public async create({ view }: HttpContextContract) {
    return view.render("category.create");
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CategoryValidator);

    await Category.create(payload);

    return response.redirect("/category");
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
