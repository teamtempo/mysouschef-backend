# mysouschef-backend

Provides API access to the mySousChef mobile application.
/recipe?url=RECIPE_URL
will return the following JSON
```
[
    {
        step: 1,
        details : "how to prepare this step in the recipe",
        timer: number (represents number of seconds)
    }
]
```