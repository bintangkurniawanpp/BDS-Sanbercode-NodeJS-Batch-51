import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import GenreValidator from "App/Validators/GenreValidator";
import Database from "@ioc:Adonis/Lucid/Database";

export default class GenresController {
  public async index({ response }: HttpContextContract) {
    try {
      const genresData = await Database.from("genres").select("*");

      response.json({
        status: "success retrieving genres data",
        data: genresData,
      });
    } catch (error) {
      console.error("Error fetching genres:", error);

      return response.status(500).json({
        status: "Error fetching genres",
        message: "Internal server error",
      });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(GenreValidator);
      const genreData = await Database.table("genres").insert(payload);

      response.status(201).json({
        status: "success inserting genre",
        data: genreData,
      });
    } catch (error) {
      if (error.code === "E_VALIDATION_FAILURE") {
        return response.status(400).json({
          status: "error validating genre data",
          errors: error.messages,
        });
      } else {
        return response.status(500).json({
          status: "error inserting genre",
          message: "Internal server error",
        });
      }
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const genreId = request.param("id");
    try {
      const genreData = await Database.from("genres")
        .where("id", genreId)
        .first();

      if (!genreData) {
        return response.status(404).json({
          status: "error",
          message: "Genre not found",
        });
      }
      response.json({
        status: "success retrieving genre",
        data: genreData,
      });
    } catch (error) {
      console.error("Error fetching genre:", error);

      return response.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const genreId = request.param("id");
    try {
      const payload = await request.validate(GenreValidator);

      const updatedRows = await Database.from("genres")
        .where("id", genreId)
        .update(payload);

      response.json({
        status: "success updated",
        data: updatedRows,
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const genreId = request.param("id");

    try {
      await Database.from("genres").where("id", genreId).delete();

      return response.json({
        status: "success",
        message: "Genre deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting genre:", error);

      return response.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}
