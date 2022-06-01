# brewery-tours 

## Description 
In this exercise we explore a common scenario in eCommerce and booking sites, using filters and search to modify what we render from the state. 

## Deliverables 
- A user can enter a US state and view a list of breweries in that state - The list has a maximum of 10 breweries on display 
- The list has three types of breweries that offer brewery tours: 
    - Micro 
    - Regional 
    - Brewpub 
- Do not show the other types of breweries 
- From the list of breweries, a user can view the following details about each brewery: 
    - Name 
    - Type of brewery 
    - Address 
        - Phone Number 
- From the list of breweries, a user can visit the website of a brewery 
- From the 'filter by type of brewery' section, a user can filter by type of brewery 
- From the 'filter by city' section, a user can filter by city, the location of the brewery 
- From the 'filter by city' section, a user can clear all filters 
- From the 'search' section, a user can search for breweries by: 
    - Name 
    - City 

## Instructions 
- Download the files from https://codesandbox.io/s/js-exercise-brewery-tour-starter-template-whq5i?file=/templates/main-section.html 
- Read the "Open Brewery DB" documentation: https://www.openbrewerydb.org/documentation/01-listbreweries - Think about which request type to use 
- Create a state object 
- Create a fetch function to get data 
- Create action functions that update state 
- Create render functions that read from state