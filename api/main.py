import uvicorn
from routers import app

def main():
    uvicorn.run(
        "main:app", host="0.0.0.0", port=8000, reload=False, log_level="debug"
    )

if __name__ == "__main__":
    main()
