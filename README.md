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

#### Analyzers

- Standard analyzer were used to analyze the non unicode fields such as title, singer, composer, etc.
- Custom analyzer were used to analyze the sinhala unicode fields. I used ICU tokenizer, Edge Gram filter,
    and Char filter while defining this analyzer

#### Queries

- Bool Queries
- Fuzzy Matching
- Boost Scores
- Nested Queris

