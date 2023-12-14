# Omah

In Javanese, `Omah` translates to `home`. In the context of this application, it serves as your personalized homepage, allowing you to conveniently store and organize various website links.

## Run with docker

```yaml
version: "3"
services:
  omah:
    container_name: omah
    image: subekti13/omah:latest
    restart: unless-stopped
    volumes:
      - ./data:/app/data
    ports:
      - 7000:7000
```

| key           | value                 |
| ------------- | --------------------- |
| url           | http://localhost:7000 |
| default email | admin@admin.com       |
| default pass  | admin                 |

## Screenshot

![ss](./ss/screenshot_1.png)
