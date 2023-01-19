# Sinhala Songs Search Engine.

## Introduction

Text Corpus and Search Application that build to quickly extract 
information about metaphors and metaphor usage in Sinhala Songs.

> *CS4642 - Data Mining and Information Retrieval* Mini Project

Metaphors used in Sinhala Songs can be useful to many different people, 
but it is very hard to find for metaphors, metaphor usage, etc. using typical search engines.
This project is to build the full-text and query based search application for finding information 
about metaphors and usage of metaphors in Sinhala Songs.

## Objectives

- Building a text corpus dataset including metaphors and usage of metaphors of Sinhala Songs (at least 100).
- Building a search application with rich searching capabilities such as full-text search, 
  finding usage of metaphors, finding which metaphors are used to get a certain meaning.

## Use Cases
- Finding the meaning of metaphors that are used in a song. This would be helpful to people
  who are interested in understanding the meaning of the song.
- Finding the usage of metaphors in selected songs. This would be helpful to people who are 
  interested in composing songs, as well as people who are interested in metaphor usage of songs.
- Finding which metaphors are used in songs to get a certain meaning. 
  This would be helpful to people who are composing songs.
- Finding matching songs in terms of metaphor usage.

## How to setup

1. Clone the repository
2. Use `rest-api/docker-compose.yaml` file to setup the mongodb database and elasticsearch cluster.
3. Create new database in mongodb named 'songs-db' and add corpus as a new collection named 'songs'
3. Start the backend api
4. Call `http://host:3000/api/search/index` to create elasticsearch index
5. Run the frontend app (search-app) using `npm run dev`

> Keep note that all nodejs components are needed to setup by running `npm install` before start them.

## Text Corpus 

More than 100 sinhala songs were collected including following details about each songs,

1. Title (Singlish)
2. Singer (Singlish)
3. Composer (Singlish)
4. Lyricist (Singlish)
5. Year 
6. Album (Singlish)
7. Genre
8. Lyrics (Sinhala Unicode)
9. Metaphors with Explanations

#### Data Collection

I used a web scraping script to collect basic infomation about more than 100 songs.
Then I used song manager app that I have created to add lyrics, metaphors, and explanations to collected songs. 

#### Preprocssing

Preprocessing were done in the song manager app when the updated song is saved to the database,

- Replaced all empty fields (singer, composer, etc.) to 'Uknown'
- Remove trailing whitespaces and commas.
- Remove the songs that have less metaphor usage

## Project Architecture

Following component have used in this project,

- MongoDB as the persistant database
- ElasticSearch as search engine
- NestJs(NodeJs) backend API
    - Support adding new songs
    - Search for songs with elasticseach queries
- Songs search web app (Svelte)
- Songs manager web app (Svelte)

![image](https://user-images.githubusercontent.com/41065538/213356950-f967608c-cb7e-480e-909e-63233a967af7.png)

> Check bottom of the README for UI Screenshots

## ElasticSearch

### ElasticSearch Index

- Standard analyzer were used to analyze the non unicode fields such as title, singer, composer, etc.
- Custom analyzer were used to analyze the sinhala unicode fields.

```javascript
analyzer: {
  sinhala_analyzer: {
    type: 'custom',
    tokenizer: 'icu_tokenizer', // better unicode tokenizing
    filter: ['edgeNgram'], // better matching for unicode
    char_filter: ['dotFilter'], // better unicode tokenizing
  },
  singlish_analyzer: {
    type: 'custom',
    tokenizer: 'standard',
    filter: ['edgeNgram'], // better fuzzy matching
    char_filter: ['dotFilter'],
  },
  betterFuzzy: {
    type: 'custom',
    tokenizer: 'standard',
    filter: ['lowercase', 'edgeNgram'], // better fuzzy matching
  },
}
```


### Elasticseach Queries & Features

- Bool Queries <br>
  Used to combine multiple field to get the best results.
  
- Fuzzy Queries <br>
  Used to match the field even if there was a missing letters in the text query.
  
- Match Queries <br>
  Used to match keyword queries.
  
- Nested Queris <br>
  Used while matching the metaphors and explanations.

- Boost Scores <br>
  Used to boost some queries than other. As an example matching the title field have more impact than matching lyrics, match-query has more impact than fuzzy query
  
- Inner Hits <br>
  Used to get addtional information such as which metaphors or explanation are match in certaion hits.

### Query Building

![image](https://user-images.githubusercontent.com/41065538/213361121-c2ff3a6e-81dc-4022-9811-ea21b464a487.png)

## Screenshots

### Search App

1. Search UI
![Screenshot_20230119_101345](https://user-images.githubusercontent.com/41065538/213357238-e357784e-15d4-4333-b2c6-435cf03178f6.png)

2. Basic Search Result
![Screenshot_20230119_101750](https://user-images.githubusercontent.com/41065538/213357752-6bca6cfe-8f73-4666-a40f-e4030a0d61c5.png)
![Screenshot_20230119_101805](https://user-images.githubusercontent.com/41065538/213357773-34434742-f60f-4a3d-b945-3ff0604e5eaf.png)

3. Searching for Metaphor
![Screenshot_20230119_101504](https://user-images.githubusercontent.com/41065538/213357474-ce640b14-a5f8-4542-8dbe-c368c0436f06.png)
![Screenshot_20230119_101654](https://user-images.githubusercontent.com/41065538/213357674-997e65c9-53c1-474f-9e99-b00c1238a31e.png)

4. Searching for Singer, Composer, Lyricist
![Screenshot_20230119_101916](https://user-images.githubusercontent.com/41065538/213357876-c2caaae7-8380-44df-a153-bfd9f62fda6c.png)

### Song Manager

1. Songs List
![Screenshot_20230119_102105](https://user-images.githubusercontent.com/41065538/213358129-06160c2d-6b02-44fd-905d-05bf2412eba9.png)

2. Edit Song
![Screenshot_20230119_103445](https://user-images.githubusercontent.com/41065538/213359745-ef37b291-630e-4bc2-a51e-85a595ae9bac.png)
![Screenshot_20230119_103509](https://user-images.githubusercontent.com/41065538/213359806-147379eb-94f4-4a40-884d-99f3d7206702.png)
![Screenshot_20230119_103607](https://user-images.githubusercontent.com/41065538/213359920-a8fd68fa-6f50-4ab0-a658-7eecea1de9fa.png)
![Screenshot_20230119_103618](https://user-images.githubusercontent.com/41065538/213359946-4187682e-bddf-4f83-b2c3-0eb430414c6d.png)


