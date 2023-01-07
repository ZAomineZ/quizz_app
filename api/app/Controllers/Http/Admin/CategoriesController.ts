import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CategoryValidator from "../../../Validators/CategoryValidator";
import Category from "../../../Models/Category";
import { inject } from "@adonisjs/fold";
import UploadCategoryImage from "../../../Services/UploadCategoryImage";

@inject(["Upload/CategoryImage"])
export default class CategoriesController {
  public constructor(protected uploadCategoryService: UploadCategoryImage) {}

  public async index({ request, view }: HttpContextContract) {
    const qs = request?.qs();

    let limit = qs.limit ? parseInt(qs.limit) : 10;
    let page = qs.page ? parseInt(qs.page) : 1;
    let search = qs.s ?? null;

    let query = Category.query().orderBy("created_at");

    if (search) {
      query = query?.whereRaw(`LOWER(name) LIKE ?`, [`%${search}%`]);
    }

    let categories = await query.paginate(page, limit);

    return view.render("category.index", { categories, page, limit, search });
  }

  public async create({ view }: HttpContextContract) {
    return view.render("category.create");
  }

  public async store({ request, response, session }: HttpContextContract) {
    const payload = await request.validate(CategoryValidator);

    // Image upload
    payload["image"] = await this.uploadCategoryService.upload(payload);
    // @ts-ignore
    delete payload["image_upload"];
    await Category.create(payload);

    session.flash("success", "You have created a new category !");

    return response.redirect("/category");
  }

  public async show({}: HttpContextContract) {}

  public async edit({ params, view }: HttpContextContract) {
    let id = params?.id;

    let category = await Category.findOrFail(id);

    return view.render("category.edit", { category });
  }

  public async update({
    params,
    request,
    response,
    session
  }: HttpContextContract) {
    const id = params?.id;

    let category = await Category.findOrFail(id);

    const payload = await request.validate(CategoryValidator);
    // New upload image
    if (payload.image_upload) {
      await this.uploadCategoryService.delete(category.image);
      payload["image"] = await this.uploadCategoryService.upload(payload);
    }
    // @ts-ignore
    delete payload["image_upload"];
    // Update category
    await category.merge(payload);
    await category.save();

    session.flash(
      "success",
      `You have edited "${category.name}" category with success !`
    );

    return response.redirect(`/category/${id}/edit`);
  }

  public async destroy({ params, response, session }: HttpContextContract) {
    let id = params?.id;

    let category = await Category.findOrFail(id);
    await category.delete();

    // Delete file
    this.uploadCategoryService.delete(category.image);

    session.flash(
      "success",
      `You have deleted "${category.name}" category with success !`
    );

    return response.redirect("/category");
  }
}
