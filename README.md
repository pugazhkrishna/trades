# Trades
Managing and maintaining `Trades`

**1) Class Diagram**

![alt text](https://github.com/pugazhkrishna/trades/blob/master/Trades.PNG)


**2) API Documentation**

i) DELETE /erase

    - This api service to erase all the trades
    
    - Status Code:
      200 OK - No error

ii) POST /trades

    - This api service is to create new trade within the /trades resource
    
    - Status Code:
      400 Bad Request - If a trade with same id exists
      201 Created - No error

iii) GET /trades

    - This api service is to return the JSON array of all the trades
    
    - Status Code:
      200 OK - JSON array sorted in ascending order by trade ID
      
iv) GET /trades/users/{userID}
    
    - This api service is to return the JSON array of all the trades by filtering the user ID
    
    - Status Code:
      200 OK - JSON array sorted in ascending order by trade ID
      404 Not Found - Error
      
v) GET /stocks/{stockSymbol}/trades?type={tradeType}&start={startDate}&end={endDate}

    - This api service is to return the JSON array of all the trades by filtering the stock symbol, trade type, start date, end date
    
    - Status Code:
      200 OK - JSON array sorted in ascending order by trade ID
      404 Not Found - Error
      
vi) GET /stocks/{stockSymbol}/price?start={startDate}&end={endDate}

    - This api service is to return the highest and lowest price for the stock symbol and given date range
    
    - Status Code:
      200 OK - JSON with symbol, highest, lowest as key.
      404 Not Found - Error

**3) Instructions to install and build**

- Install Node with this link as reference - `https://nodejs.org/en/download/`
- Install mongodb with this link as reference - `https://docs.mongodb.com/manual/administration/install-community/`
- Install git with this link as reference - `https://git-scm.com/downloads`
- Install visual studio (Text Editor) with this link as reference - `https://code.visualstudio.com/download`
- Clone the project with this url - `https://github.com/pugazhkrishna/trades.git`
- `trades` is the git folder name
- Run `npm install` command -  this will install all the npm packages listed in package.json
- Run `npm run` command
- Now `Trading management platform` is ready to serve with rest API's

**4) Instructions to run test and generate coverage**

- Rest API can be tested with the tool `Postman-Rest Client` and the link is `https://www.getpostman.com/downloads/`.
- Launch the postman desktop application once it is installed successfully.
- Enter the url of the api in the `Request section`.
- Select the type of HTTP method from the dropdown to hit- e.g. POST.
- Under the `Body section` select the radio button `x-www-form-urlencoded`.
- Under the `Body` section, pass the request body of the API in the form of key-value pairs. If it is post API, then we need to pass body or parameters.
- Hit the send button. After clicking on "send" button, you will see `Response` in the `Response Section`.
- Here, we have used "POST" method, in the same way, we can use remaining methods like GET, PUT, DELETE, etc
![alt text](https://github.com/pugazhkrishna/trades/blob/master/get_all_trades.png)
