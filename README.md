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
    - This api service to create new trade within the /trades resource
    - Status code:
      400 Bad Request - If a trade with same id exists
      201 Created - No error
