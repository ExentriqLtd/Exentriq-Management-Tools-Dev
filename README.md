# EXENTRIQ-MANAGEMENT-TOOLS - DEV

## Create a local file named: .gitmodules

```
[submodule "app"]
	path = app
	url = https://myusername@github.com/ExentriqLtd/Exentriq-Management-Tools.git
```

remplace myusername for you username

## Tools Installation

Install the main tools (require sudo on certain systems):

```
npm install -g grunt
npm install -g grunt-cli
npm install -g bower
```

Install the project dependencies, change to the project's root directory (require sudo on certain systems):

```
bower install
npm install
```

Run Grunt:

```
grunt
```

Grunt will then watch concurrently for changes to .js and .scss files build each as required.

## i18n Extract Tool Usage

Extract messages:

```
grunt pot_compile
```

Compile messages:

```
grunt json_compile
```

## Run App

```
cd app
meteor
```
