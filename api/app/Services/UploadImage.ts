import Application from "@ioc:Adonis/Core/Application";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import FileNotFoundException from "../Exceptions/FileNotFoundException";
import { monthsNumber } from "../utils/Date";

export default class UploadImage {
  private extension = "jpg";

  private extensionsAllow = ["jpg", "png"];

  protected entity = "";

  public async upload(payload): Promise<string> {
    let date = new Date();

    let directoryPath = Application.publicPath("uploads");
    let monthNumber = date.getUTCMonth();
    let directory =
      "/" +
      this.entity +
      "/" +
      date.getFullYear().toString() +
      "/" +
      (monthsNumber[monthNumber] ?? "01");
    directoryPath = directoryPath + directory;

    let clientName = payload.image_upload.clientName as string;
    let partsClientName = clientName.trim().split(".");
    clientName = partsClientName[0] ?? "";
    let ext = partsClientName[1] ?? this.extension;
    if (!this.extensionsAllow.includes(ext)) {
      ext = this.extension;
    }
    let filename = clientName + "-" + uuidv4() + `.${ext}`;
    // Move filename
    await payload.image_upload.move(directoryPath, {
      name: filename
    });

    return `/uploads/${directory}/${filename}`;
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
