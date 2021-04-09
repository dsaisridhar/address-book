# AddressBook

This project is a simple address book developed using `angular-11.2.8`, `ngrx-11.1.0` with minimal external libs. This project works best with node versions of `10.13.x/12.11.x or later minor`

## Functionality
The Address book has 6 rows `(id, name, location, office, officePhone and cellPhone)`. At the beginning of the table there are checkboxes to select each row. This project has been developed to support two languages(English and French).
All fields in the table are editable except for ID Column.

### Buttons
- `Add` : This button adds an empty row to the table(ID gets generated only after Update).
- `Update` : Major functionality of this button is to save all the updated and newly added records and generate ids for newly added rows/contacts
- `Delete`: This button works only if there are any checked rows. Multiple records can be deleted at a time.

## Development

## Installation

To get started locally, follow these instructions:

1. If you haven't done it already, [make a clone of this repo](https://github.com/dsaisridhar/address-book).
1. Clone to your local computer using `git`.
1. Make sure that you have Node 10.13 or later installed. See instructions [here](https://nodejs.org/en/download/).
1. Run `npm ci`
1. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
