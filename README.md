# frontend-data
A data visualisation (using the d3 library) based on given data where data can be explored through interaction using enter, update, and exit.

## Ideas
I've got information about locations. Such as the cities that publishers are located in. I could use those, or the locations of the different OBA holdings.

There's also a lot of information about different books in there (duh). I could make a scatterplot where I can let the user decide which X and Y values to compare. The values of books that one could compare would be:

* Page number
* Target-audience
* Genre
* Language
* Publication-year

Probably more difficult:
* Author
* Publisher
* physical description
* color

The difficult part here would be to know which ones would be compared in their value-name such as "English" or the as numerical value that it is "1 book written in English"

I'd also have to check the indexValue of the selected value so one does not compare page numbers with page numbers and create a nonsensical graph.
