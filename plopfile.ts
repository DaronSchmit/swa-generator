import { ActionType, NodePlopAPI } from 'plop';
import { buildActionsArray, DeploymentSolution, FrontendLibrary, RepoHost } from './definitions';

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
      {
        type: 'list',
        name: 'repoHost',
        message: 'Where are you hosting your repo?',
        choices: Object.values(RepoHost),
      },
      {
        when(context) {
          return context.repoHost === RepoHost.github;
        },
        type: 'list',
        name: 'deploymentSolution',
        message: 'What service are you using to deploy the site?',
        choices: Object.values(DeploymentSolution),
      },
      {
        when(context) {
          return context.repoHost === RepoHost.azureRepos;
        },
        type: 'list',
        name: 'deploymentSolution',
        message: 'What service are you using to deploy the site?',
        choices: Object.values(DeploymentSolution).filter((s) => s !== DeploymentSolution.githubPages),
      },
      {
        type: 'list',
        name: 'frontendLibrary',
        message: 'What frontend library are you using?',
        choices: Object.values(FrontendLibrary),
      },
    ],
    actions: (data) => {
      if (!data) {
        return [];
      }
      const library: FrontendLibrary = data.frontendLibrary;
      const repoHost: RepoHost = data.repoHost;
      const deploymentSolution: DeploymentSolution = data.deploymentSolution;
      const arr: ActionType[] = buildActionsArray(data.projectName, library, repoHost, deploymentSolution);
      return arr;
    },
  });
}
