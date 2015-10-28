#Styleguide

Adding documentation is easy...

1. add an $componentName.html file to /components
2. add an optional $componentName.md file to /components with notes about your component
3. add an $componentName.less to styles/modules with the styling for your component

This project should then be included in any project that requires it's components using Bower and Less imports.

#Local Usage

To build local environment you'll need to run the following commands from the root of the project folder.

- sudo npm install
- bower install
- grunt build
- grunt watch
