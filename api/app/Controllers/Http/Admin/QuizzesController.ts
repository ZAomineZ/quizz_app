import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class QuizzesController {
  public async index({view}: HttpContextContract) {
    return view.render('quiz/index')
  }

  public async create({ view }: HttpContextContract) {
    return view.render("quiz/create");
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
