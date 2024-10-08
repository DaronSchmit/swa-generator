import { NodePlopAPI } from 'plop';

export default function (plop: NodePlopAPI) {
  plop.setHelper('trim', (txt) => txt.trim());

  plop.setGenerator('basics', {
    description: 'this is a skeleton plopfile',
    prompts: [
      {
        type: 'input',
        name: 'projectName',
        message: 'project name please',
      },
      {
        type: 'input',
        name: 'projectAuthor',
        message: 'project author please',
      },
      // {
      //   type: 'list',
      //   name: 'repoHost',
      //   message: 'Where are you hosting your repo?',
      //   choices: ['Github', 'Azure Repos'],
      // },
      {
        type: 'list',
        name: 'frontendLibrary',
        message: 'What frontend library are you using?',
        choices: ['Angular', 'Other'],
      },
    ],
    actions: (data) => {
      const root = `../${data?.projectName}`;
      const arr = [
        {
          type: 'add',
          path: `${root}/configuration.yaml`,
          templateFile: 'plop-templates/configuration.yaml',
        },
        {
          type: 'add',
          path: `${root}/package.json`,
          templateFile: 'plop-templates/frontend/{{frontendLibrary}}-package.txt',
        },
      ];

      return arr;
    },
  });
}
