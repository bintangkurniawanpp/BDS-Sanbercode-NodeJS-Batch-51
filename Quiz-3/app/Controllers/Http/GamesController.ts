import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import GameValidator from "App/Validators/GameValidator";
import Database from "@ioc:Adonis/Lucid/Database";

export default class GamesController {
  public async index({ response }: HttpContextContract) {
    try {
      const gamesData = await Database.from("games").select("*");

      response.json({
        status: "success retrieving games data",
        data: gamesData,
      });
    } catch (error) {
      console.error("Error fetching games:", error);

      return response.status(500).json({
        status: "Error fetching genres",
        message: "Internal server error",
      });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(GameValidator);
      const formattedDate = payload.release_date.toFormat("yyyy-MM-dd");

      const gameData = await Database.table("games").insert({
        title: payload.title,
        gameplay: payload.gameplay,
        release_date: formattedDate,
        genres_id: payload.genre_id,
      });

      response.status(201).json({
        status: "success inserting game",
        data: gameData,
      });
    } catch (error) {
      if (error.code === "E_VALIDATION_FAILURE") {
        return response.status(400).json({
          status: "error validating game data",
          errors: error.messages,
        });
      } else {
        console.log(error);

        return response.status(500).json({
          status: "error inserting game",
          message: "Internal server error",
        });
      }
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const gameId = request.param("id");
    try {
      const gameData = await Database.from("games").where("id", gameId).first();

      if (!gameData) {
        return response.status(404).json({
          status: "error",
          message: "Game not found",
        });
      }
      response.json({
        status: "success retrieving game",
        data: gameData,
      });
    } catch (error) {
      console.error("Error fetching game:", error);

      return response.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const gameId = request.param("id");

    try {
      const payload = await request.validate(GameValidator);
      const formattedDate = payload.release_date.toFormat("yyyy-MM-dd");

      const updatedRows = await Database.from("games")
        .where("id", gameId)
        .update({
          title: payload.title,
          gameplay: payload.gameplay,
          release_date: formattedDate,
          genres_id: payload.genre_id,
        });

      response.json({
        status: "success updated",
        data: updatedRows,
      });
    } catch (error) {
      console.log(error);

      return response.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const gameId = request.param("id");

    try {
      await Database.from("games").where("id", gameId).delete();

      return response.json({
        status: "success",
        message: "Game deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting game:", error);

      return response.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}
