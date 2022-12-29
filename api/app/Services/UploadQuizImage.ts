import Application from "@ioc:Adonis/Core/Application";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import FileNotFoundException from "../Exceptions/FileNotFoundException";

export default class UploadQuizImage {
  private extension = "jpg";

  public async upload(payload): Promise<string> {
    let date = new Date();

    let directoryPath = Application.publicPath("uploads");
    let directory =
      "/" + date.getFullYear().toString() + "/" + date.getMonth().toString();
    directoryPath = directoryPath + directory;

    let clientName = payload.image_upload.clientName as string;
    let partsClientName = clientName.trim().split(".");
    clientName = partsClientName[0] ?? "";
    let ext = partsClientName[1] ?? this.extension;
    let filename = clientName + "-" + uuidv4() + `.${ext}`;
    // Move filename
    await payload.image_upload.move(directoryPath, {
      name: filename
    });

    return `/uploads${directory}/${filename}`;
  }

  public delete(file: string) {
    fs.unlink(Application.publicPath(file), (err) => {
      if (err) {
        new FileNotFoundException(
          "This file not found !",
          500,
          "E_RUNTIME_EXCEPTION"
        );
      }
    });
  }
}
