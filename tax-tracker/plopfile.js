const path = require('path');
const inquirer = require('inquirer');

const componentTemplatePath = 'plop-templates/component';
const componentPaths = new Map([
  ['components', 'src/components'],
  ['containers', 'src/containers'],
]);

const componentActions = ({
  component_name,
  component_type,
  component_path,
  component_relative_folder = '',
  component_story,
  component_fn,
}) => {
  const componentPath = component_path
    ? 'src/' + component_path
    : path.join(componentPaths.get(component_type), component_relative_folder);
  const commonActions = [
    {
      type: 'add',
      templateFile: componentTemplatePath + '/common/component.scss.hbs',
      path:
        componentPath +
        '/{{kebabCase component_name}}/{{kebabCase component_name}}.module.scss',
    },
    {
      type: 'add',
      templateFile: componentTemplatePath + '/common/index.js.hbs',
      path: componentPath + '/{{kebabCase component_name}}/index.js',
    },
    component_fn && {
      type: 'add',
      templateFile: componentTemplatePath + '/stateless/component.jsx.hbs',
      path:
        componentPath +
        '/{{kebabCase component_name}}/{{kebabCase component_name}}.js',
    },
    !component_fn && {
      type: 'add',
      templateFile: componentTemplatePath + '/statefull/component.jsx.hbs',
      path:
        componentPath +
        '/{{kebabCase component_name}}/{{kebabCase component_name}}.js',
    },
  ].filter(Boolean);
  return commonActions;
};

module.exports = (plop) => {
  plop.addPrompt('directory', require('inquirer-directory'));
  plop.setGenerator('component', {
    description: 'React Component',
    prompts: [
      {
        type: 'input',
        name: 'component_name',
        message: 'Name:',
        validate: (answer) =>
          (typeof answer === 'string' && !!answer.trim()) ||
          'Component name should not be empty',
      },
      {
        type: 'list',
        name: 'component_type',
        message: 'Type:',
        choices: [
          { name: 'Component', value: 'components' },
          { name: 'Container', value: 'containers' },
          new inquirer.Separator(),
          { name: 'Custom Folder', value: false },
        ],
      },
      {
        type: 'directory',
        basePath: path.join(plop.getPlopfilePath(), 'src/'),
        name: 'component_path',
        message: 'Custom Folder:',
        when: ({ component_type }) => !component_type,
      },
      {
        type: 'list',
        name: 'component_in_subfolder',
        message: 'Should be in a sub folder?',
        choices: [
          { name: 'Yes', value: true },
          { name: 'No', value: false },
        ],
        default: false,
        when: ({ component_type }) =>
          ['containers'].indexOf(component_type) !== -1,
      },
      {
        type: 'directory',
        basePath: path.join(
          plop.getPlopfilePath(),
          componentPaths.get('containers')
        ),
        name: 'component_relative_folder',
        message: 'Container Path:',
        when: ({ component_in_subfolder, component_type }) =>
          component_in_subfolder && component_type === 'containers',
      },

      {
        type: 'list',
        name: 'component_fn',
        message: 'Should be functional?',
        choices: [
          { name: 'Yes', value: true },
          { name: 'No', value: false },
        ],
        default: true,
      },
    ],
    actions: componentActions,
  });
};
