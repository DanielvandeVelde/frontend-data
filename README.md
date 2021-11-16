# frontend-data

<kbd>![Site image](https://raw.githubusercontent.com/DanielvandeVelde/frontend-data/master/hero.svg "Site image")</kbd>

A live version of this fully responsive application is running [here](https://datafish.herokuapp.com/)  
I suggest checking out the [Wiki](https://github.com/DanielvandeVelde/frontend-data/wiki) for information on the process.

## ✅ To-do

- [x] Create wiki
- [x] Set-up the project
- [x] Add in D3
- [x] Figure out what to do???
- [x] Create API connection
- [x] Display API data in D3
- [x] Create GeoJSON
- [x] Display path of ISS on a map
- [x] Drag and zoom
- [x] Refactor a lot of code
- [x] Remove global variables
- [x] Create modules
- [x] Type something about the data I'm using
- [x] Update the resources part of the readme
- [x] Write more in my wiki

## 📋 Concept

I'm going to show a data visualisation and it's going to be awesome.

## ⚙️ Installation

Clone this repository to your own device:

```bash
$ git clone https://github.com/DanielvandeVelde/frontend-data.git
```

Then, navigate to this folder and run:

```bash
npm install
```

To start:

```bash
npm start
```

## 🗃 Data

I'm using data that tells me the position of the ISS.  
The [documentation can be found here](https://wheretheiss.at/w/developer).
There's a ratelimit of roughly 1 request per second and I'm polling it once every 1200ms.

With various endpoints to get all the sattelites this API has, positions of those sattelites , TLE data and even one to get the countrycode, timezone and current time when giving it a latitude and longitude.

I am only using the `/sattelites/[id]` endpoint.  
For the ISS that url looks like this: `https://api.wheretheiss.at/v1/satellites/25544`

<details>
<summary>Example response</summary>

```json
{
  "name": "iss",
  "id": 25544,
  "latitude": 50.11496269845,
  "longitude": 118.07900427317,
  "altitude": 408.05526028199,
  "velocity": 27635.971970874,
  "visibility": "daylight",
  "footprint": 4446.1877699772,
  "timestamp": 1364069476,
  "daynum": 2456375.3411574,
  "solar_lat": 1.3327003598631,
  "solar_lon": 238.78610691196,
  "units": "kilometers"
}
```

</details>

## ℹ️ Resources

- [CMD-TT FD course](https://github.com/cmda-tt/course-21-22/tree/main/fd)
- [Where the ISS at?](https://wheretheiss.at/w/developer)
- [🚀 Angle calculation](https://stackoverflow.com/a/59906056)
- [Favicon](https://favicon.io/emoji-favicons/rocket/)

## 🗺️ License

Author:

- [Daniel van de Velde](https://github.com/DanielvandeVelde)

License by
[MIT](https://opensource.org/licenses/MIT)
