# Nodepop

API for selling second-hand items

## DevOps

Node App:   

  Register User:    POST https://nodepop.javierfinez.com/apiv1/users/register
  
                        - Body x-www-form-urlencoded
                        - name:     yourname
                        - mail:     yourmail
                        - password: yourpwd
                        
  Login User:       POST https://nodepop.javierfinez.com/apiv1/users/login
  
                        - Body x-www-form-urlencoded
                        - mail:     yourmail
                        - password: yourpwd
  
  Get Ads:          GET https://nodepop.javierfinez.com/apiv1/ads?token=VALIDJWTTOKEN


Static Files:       https://nodepop.javierfinez.com/images/adds/barman.jpg

Bootstrap Template: http://18.205.127.46


## Installation

Goto Nodepop root directory and install dependencies with:

```shell
npm install
```
Nodepop API requires a MongoDB database (nodepop). It's connection parameters can be defined in connectMongoose.js file.

To reset the database and add test data you can run:

```shell
npm run installDB
```

## Development

To start the application in development mode use:

```shell
npm run dev
```
To stop de app press CTRL + C keys.

## Cluster Mode

To take full advantage of the system CPU cores we will start the cluster mode

```shell
npm run cluster
```
To stop de app press CTRL + C keys.

## API Documentation

### Users

In order to use the API you must be authenticated by calling HTTP method POST /apiv1/users/register with name, email & password, and get a token with method POST /apiv1/users/login with email & password

use that token in the rest of request in:
  - header: 'x-access-token'
  - body: token
  - query string: token


You can add a new user with the register method and use it to login and test the API 

| Method | Result         | Route                 |
| ------ | -------------- | --------------------- |
| POST   | Register       | /apiv1/users/register |
| POST   | Sign In        | /apiv1/users/login    |

### Ads

Actually you can only get the ads and the tags

| Method | Result          | Route          |
| ------ | --------------- | -------------- |
| GET    | List all ads    | apiv1/ads      |
| GET    | List all tags   | apiv1/ads/tags |

You can use the following filters and parameters combined in the query string

#### Filters:

| Filter     | Sample                  | Notes                 |
| ---------- | ----------------------- | --------------------- |
| by name    | apiv1/ads?name=iWatch   | filter by string      |
| by forSale | apiv1/ads?sale=true     | true or false         |
| by price   | apiv1/ads?price=200     | price = number        |
| by price   | apiv1/ads?price=200-    | price >= number       |
| by price   | apiv1/ads?price=-200    | price =< number       |
| by price   | apiv1/ads?price=200-500 | price between numbers |
| by tag     | apiv1/ads?tags=mobile   | ads with tag = mobile |

### Parameters:


| Parameter | Sample               | Notes                     |
| --------- | -------------------- | ------------------------- |
| limit     | apiv1/ads?limit=2    | Show only 2 ads           |
| skip      | apiv1/ads?skip=3     | Fetch 3 ads               |
| sort      | apiv1/ads?sort=name  | Sort ads by name          |
