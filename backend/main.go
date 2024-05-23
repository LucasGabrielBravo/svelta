package main

import (
	"log"

	"github.com/LucasGabrielBravo/svelta/backend/utils/dotenv"
	"github.com/pocketbase/pocketbase"
)

func main() {
	err := dotenv.LoadEnv()

	if err != nil {
		log.Fatal(err.Error())
	}

	app := pocketbase.New()

	loadEvents(app)
	loadRoutes(app)

	err = app.Start()

	if err != nil {
		log.Fatal(err.Error())
	}
}

func loadEvents(app *pocketbase.PocketBase) {}

func loadRoutes(app *pocketbase.PocketBase) {}
