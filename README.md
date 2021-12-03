# Todo-app

A Web Application for securely managing a To Do List

## Requirements

### Phase 1 Application Setup

* Implement basic To Do List Management, using Hooks

* Style the application using the Blueprint Component API

* Properly modularize the application into separate components

* Implement the Context API to make some basic application settings available to components
  * How many todo Items to show at once
  * Whether or not to show completed todo items
  * Which sort to apply to todo items

### Phase 2 User Settings Config

* Provide the users with a form where they can change the values for those settings

* Save the users choices in Local Storage
  * Retrieve their preferences from Local Storage and apply them to the application on startup

------------

### Assignment Notes

#### Global State

* This application manages global state by using the React Context API. An instance of this API related to application theming was created. This design decision was made since such values did not need to change during program execution. The related ThemeContext's Provider wrapped the entire application. Consumers used the useContext hook to obtain the necessary theming values.

#### Custom Hooks

* The custom useForm hook was created to add highly reusable form actions. The handleChange method first called event.persist to allow the program to access a syntethic event inside an async callback function. Then it could modify its value state using the useState hook without any side effects. The handleSubmit function allowed a submission to be done with any callback function that was passed into the hook, if an event was present.

### Deployment

  _Live application code found [here](https://beers15.github.io/todo-app/)_

### Diagram

![diagram](./todoApp.png)
