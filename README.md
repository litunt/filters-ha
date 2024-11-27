# Filters App (Askend test assignment)

## Project description

### Business idea
The idea of test assignment was to design such system that would allow user create their filters consisting of known components - name, 
criteria and selection. There are also some requirements on filter content, e.g. having at least one criteria. The UI should allow
user to view, create and edit filters. In addition, I also implemented filter deletion functionality.

### Result
The result of the assignment is working full-stack application with backend that is responsible for
heavy logic and calculations, and frontend part that provides UI solution to send requests and see
the result returned by backend application. 
The UI part takes most of the logic related to filter display, creating and editing since this involves a well thought-through 
communication between sub-components.

### Solution explanation

First of all, I designed the data structure that would be the base for the developments. The relation between components (filter, criteria),
as well as strict constraints regarding conditions used in criteria. For this case, I decided to model database-level inheritance that will 
be also projected in the code with entities, and therefore would allow smooth way to operate with the structure. 

Structure of possible criteria options uses `joined table` inheritance, meaning that there is a parent table that represents the criteria
base and contains columns that are shared between all the criteria types. And there are type tables that represent each criteria type. This
decision regarding joined table inheritance was made due to the fact tha each criteria type has different value (number, text, date).
Of course, all the data could be kept in one Criteria table. However, with this single table approach at leas two columns that represent the
value would be always empty, which affects data consistency not in a good way. Another option could be to map values into, e.g. string in 
database and map into required value type, based on criteria type. And this adds extra complexity on code implementation layer and might be
more error-prone. These are the main drawbacks why I decided to choose database inheritance for this solution.

Criteria also has condition, and condition directly depends on criteria type. There can be conditions for text values, numeric values and
date values. This is solved with one table in the database. However, on code level I wanted to achieve a better overview of what condition
condition type is being use now, as well as to avoid excessive conditional statements for type checking. For this case, a `single table` 
inheritance for entities was chosen and type based classes created, which mapping happens based on dedicated `discriminator column`.

This approach to building data structure helped me to reduce data relation complexity on code layer, as well as use all the advantages of 
object oriented programming.

Regarding the UI side, when deciding on suitable solution I always try to think of building the UI with framework approach in mind. 
It means that the final result consists of as small as possible independent components, no duplications and logic repetitions.
Besides, although I used component library (PrimeNG), I usually do not fully rely on component library functionality, especially from design
perspective. It is great when it is possible to mix the components provided by library and native HTML elements designed according to
overall theme. This is the approach I followed when solving test assignment. One of the examples is that I was not satisfied with visual 
representation of datepicker component from PrimeNG, therefore I used native HTML input of date type, designed the visual side of it 
accordingly, as well as adjusted data transfer logic between components.

In case of more real ife related situation, one of the details I would put more attention to could be runtime validation of user input. 
I have implemented some basic checks during filter creation, but could be done more precisely to make user experience more convenient 
(especially in case of larger data forms).

### Technology stack

- **Front-end:** Angular 18, TypeScript, RxJS
- **Back-end:** Java 21, Spring Boot, JPA, Flyway
- **Database:** PostgreSQL

## Architecture

### Back-end
To go through the structure of backend application, please look at following specifications.
Docs: [FiltersApp/README.md](FiltersApp/README.md)

### Front-end
To go through the structure of frontend application, please look at following specifications.
Docs: [frontend/README.md](frontend/README.md)

## Running application locally

Application can be run locally either by running each part separately

### With [docker-compose.yaml](docker/docker-compose.yaml) file

**Requirements**:

- Docker v20
- Docker Compose v2

Run command

```sh
docker-compose up -d
```
The command starts all the listed services and the result is running `Docker` containers of
frontend and backend applications, as well as Flyway (runs only once to perform migration tasks) and PostgreSQL database.

- to access UI: `http://localhost:4230/`
- Swagger UI: `http://localhost:8081/api/swagger-ui/index.html`
- Health check: `http://localhost:8081/api/actuator/health`