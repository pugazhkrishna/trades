# trades
Managing and maintaining `Trades`

1) Class Diagram

![alt text](https://github.com/pugazhkrishna/trades/blob/master/Trades.PNG)


2) API Documentation

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




