# API Specification for Productivity App

## **Get all Courses**
 **GET** /api/courses/
 ###### Response
 ```yaml
 <HTTP STATUS CODE 200>
 {
    "courses": [
        {
            "id": <ID>,
            "name": <USER INPUT>,
            "code": <USER INPUT>,
            "description": <USER INPUT>
        },
        {
            "id": <ID>,
            "name": <USER INPUT>,
            "code": <USER INPUT>,
            "description": <USER INPUT>
        }
        ...
    ]
 }
```

## **Create a Courses**
**POST** /api/course/
###### Response
```yaml
<HTTP STATUS CODE 201>
{
    "id": <ID>,
    "name": <USER INPUT>,
    "code": <USER INPUT>,
    "description": <USER INPUT>
}
```

## **Get a Course by ID**
**GET** /api/course/<int:course_id>/
###### Response
```yaml
<HTTP STATUS CODE 200>
{
    "id": <ID>,
    "name": <USER INPUT>,
    "code": <USER INPUT>,
    "description": <USER INPUT>
}
```

## **Get all of a Users Courses**
**GET** /api/courses/<int:user_id>/
###### Response
```yaml
<HTTP STATUS CODE 200>
{
    "courses": [ <SERIALIZED COURSE WITHOUT ASSIGNMENTS>, ... ]
}
```

## **Change a Users Course**
**POST** /api/course/<course_id>/
###### Response
```yaml
<HTTP STATUS CODE 200>
{
    "id": <ID>,
    "name": <USER INPUT>,
    "code": <USER INPUT>,
    "description": <USER INPUT>
}
```

## **Delete a Course**
**DELETE** /api/course/<course_id>/
###### Response
```yaml
<HTTP STATUS CODE 200>
{
    "id": <ID>,
    "name": <USER INPUT>,
    "code": <USER INPUT>,
    "description": <USER INPUT>
}
```

## **Create a User**
**POST** /api/users/
###### Response
```yaml
<HTTP STATUS CODE 201>
{
    "id": <ID>,
    "name": <USER INPUT>,
    "courses": []
    "timers": []
}
```

## **Get User by ID**
**GET** /api/users/<int:user_id>/
###### Response
```yaml
<HTTP STATUS CODE 200>
{
    "id": <ID>,
    "name": <STORED NAME FOR USER WITH ID >,
    "courses": [ <SERIALIZED COURSE WITHOUT ASSIGNMENT FIELD>, ... ],
    "timers": [ <SERIALIZED TIMER, ... ]
}
```

## **Get a User Session**
**GET** /api/users/
###### Response
```yaml
<HTTP STATUS CODE 200>
{
    "session": <SERIALIZED SESSION>
    "name": <USER INPUT>,
    "courses": [<SERIALIZED COURSE WITHOUT ASSIGNMENTS>, ...],
    "timers": [<SERIALIZED TIMER>, ...],
    "position": <STORED POSITION FOR USER WITH SESSION_TOKEN>
}
```

## **Login to Account**
**POST** /api/users/login/
###### Response
```yaml
<HTTP STATUS CODE 200>
{
    "session": <SERIALIZED SESSION>
    "name": <USER INPUT>,
    "courses": [<SERIALIZED COURSE WITHOUT ASSIGNMENTS>, ...],
    "timers": [<SERIALIZED TIMER>, ...],
    "position": <STORED POSITION FOR USER WITH SESSION_TOKEN>
}
```

## **Logout of Account**
**POST** /logout/
###### Response
```yaml
<HTTP STATUS CODE 200>
{
    "description": "Logged Out"
}
```

## **Delete Assignment**
**DELETE** /api/assignment/<int:assignment_id>/
###### Response
```yaml
<HTTP STATUS CODE 200>
{   
    "id": <ID>,
    "name": <USER INPUT>,
    "description": <USER INPUT>,
    "due_date": <USER INPUT>,
    "done": <USER INPUT>,
    "course_id": <STORED COURSE_ID FOR COURSE WITH ID>
}
```

## **Change Assignment**
**POST** /api/assignment/<int:assignment_id>/
###### Response
```yaml
<HTTP STATUS CODE 200>
{   
    "id": <ID>,
    "name": <USER INPUT>,
    "description": <USER INPUT>,
    "due_date": <USER INPUT>,
    "done": <USER INPUT>,
    "course_id": <STORED COURSE_ID FOR COURSE WITH ID>
}
```

## **Add Course to Assignment**
**POST** /api/courses/<int:course_id>/assignment/
###### Response
```yaml
<HTTP STATUS CODE 201>
{   
    "id": <ID>,
    "name": <USER INPUT>,
    "description": <USER INPUT>,
    "due_date": <USER INPUT>,
    "done": <USER INPUT>,
    "course_id": <STORED COURSE_ID FOR COURSE WITH ID>
}
```

## **Add Timer to User**
**POST** /api/timer/
###### Response
```yaml
<HTTP STATUS CODE 201>
{   
    "id": <ID>,
    "elapsed_time": <TIME>,
    "hours": <TIME IN HOURS>,
    "minutes": <TIME IN MINUTES>,
    "seconds": <TIME IN SECONDS>,
    "date": <DATE>,  
    "user": {
        "id": <ID>,
        "name": <STORED NAME FOR USER WITH ID >,
        "courses": [ <SERIALIZED COURSE WITHOUT ASSIGNMENT FIELD>, ... ],
        "timers": [ <SERIALIZED TIMER, ... ]
    }
}
```

## **Get all Tomers from a User**
**GET** /api/timer/
###### Response
```yaml
<HTTP STATUS CODE 201>
{   
    "timers": [ <SERIALIZED TIMER>, ...]
}
```

## **Gets Leaderboard Times**
**GET** /api/timer/leader_board/<time_span>/
###### Response
```yaml
<HTTP STATUS CODE 201>
{   
    [<"user.id": <ID>, "total": <TIME>, ...]
}
```

## **Gets Leaderboard Position**
**GET** /api/timer/leader_board/<time_span>/<int:user_id>/
###### Response
```yaml
<HTTP STATUS CODE 201>
{   
    "position": <STORED POSITION FOR USER WITH ID>
}
```