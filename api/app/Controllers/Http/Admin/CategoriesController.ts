import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CategoryValidator from "../../../Validators/CategoryValidator";
import Category from "../../../Models/Category";

export default class CategoriesController {
  public async index({ view }: HttpContextContract) {
    const categories = await Category.query().orderBy("created_at");

    return view.render("category.index", { categories });
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

  public async edit({ params, view }: HttpContextContract) {
    let id = params?.id;

    let category = await Category.findOrFail(id);

    return view.render("category.edit", { category });
  }

  public async update({ params, request, response }: HttpContextContract) {
    const id = params?.id;

    let category = await Category.findOrFail(id);

    const payload = await request.validate(CategoryValidator);
    // Update category
    await category.merge(payload);
    await category.save();

    return response.redirect(`/category/${id}/edit`);
  }

  public async destroy({ params, response }: HttpContextContract) {
    let id = params?.id;

    let category = await Category.findOrFail(id);
    await category.delete();

    return response.redirect("/category");
  }
}
