# mysouschef-backend

Provides API access to the mySousChef mobile application.
/recipe?url=RECIPE_URL&unit=metric||imperial
will return the following JSON
```
[
    { recipe title }
    { ingredients : [list of ingredients] }
    {
        step: 1,
        details : "how to prepare this step in the recipe",
        timer: number (represents number of seconds)
    }
]
```

The below error messages may be displayed in place of data
```
"Failed to parse domain"
"Site not yet supported"
"No recipe found on page"
"url provided must include '#subUrl'"
```
