import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class QuestionsController {
  public async update({ params }: HttpContextContract) {
    let id = params?.id;

    console.log(id);
  }
}
