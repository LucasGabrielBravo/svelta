package dotenv

import (
	"errors"
	"os"

	"github.com/joho/godotenv"
)

type dotenv struct {
	GoEnv string
}

func LoadEnv() error {
	err := godotenv.Load()

	if err != nil && !os.IsNotExist(err) {
		return errors.New("error loding .env")
	}

	return nil
}

func GetEnv() dotenv {
	return dotenv{
		GoEnv: os.Getenv("GO_ENV"),
	}
}
