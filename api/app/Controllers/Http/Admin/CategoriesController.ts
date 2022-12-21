import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CategoriesController {
  public async index({view}: HttpContextContract) {
    return view.render('category.index')
  }

  public async create({ view }: HttpContextContract) {
    return view.render("category.create");
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
