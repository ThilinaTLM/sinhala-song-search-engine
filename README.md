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
2. Use docker-compose file in rest-api project to setup the mongodb database and elasticsearch cluster
3. Create new database in mongodb named 'songs-db' and add corpus as a new collection named 'songs'
3. Start the backend api
4. Call http://<host>:3000/api/search/index to create elasticsearch index
5. Run the frontend app (search-app) using `npm run dev`

> Keep note that all nodejs components are needed to setup by running `npm install` before start them.

## Text Corpus 

More than 100 sinhala songs were collected including following details about each songs,

1. Title
2. Singer
3. Composer
4. Lyricist
5. Year 
6. Album 
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

## ElasticSearch

### ElasticSearch Index

#### Index & Analyzers

- Standard analyzer were used to analyze the non unicode fields such as title, singer, composer, etc.
- Custom analyzer were used to analyze the sinhala unicode fields. I used ICU tokenizer, Edge Gram filter,
    and Char filter while defining this analyzer

#### Elasticseach Queries & Features

- Bool Queries
- Fuzzy Queries
- Match Queries
- Nested Queris

- Boost Scores
- Inner Hits

