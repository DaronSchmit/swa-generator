import { Actions, ActionType, AddActionConfig } from "node-plop";

export enum RepoHost {
  azureRepos = "Azure Repos",
  github = "Github",
};

export enum DeploymentSolution {
  azureSwa = "Azure SWA",
  githubPages = "Github Pages",
};

 enum DeploymentFile {
  'Azure SWA' = 'templates/azureSwaDeployTemplate.txt',
  'Github Pages' = 'templates/githubPagesDeployTemplate.txt'
}

export enum FrontendLibrary {
  angular = "Angular",
  react = "React",
}

const getPackageJsonAction = (root: string, library: FrontendLibrary): AddActionConfig => {
  switch (library) {
    case FrontendLibrary.angular:
      return {
        type: 'add',
      path: `${root}/frontend/package.json`,
        templateFile: 'templates/frontend/angularPackageJson.txt'}
    case FrontendLibrary.react:
       return {
        type: 'add',
        path: `${root}/frontend/package.json`,
        templateFile: 'templates/frontend/vitePackageJson.txt'
       };
    default:
      return {
        type: 'add',
        templateFile: '',
        path: '',
      };
  }
}

const getDeploymentAction = (root: string, repoHost: RepoHost, deploymentSolution: DeploymentSolution): AddActionConfig => {
  switch (deploymentSolution) {
    case DeploymentSolution.azureSwa: 
      if (repoHost === RepoHost.azureRepos) {
        return {
          type: 'add',
          path: `${root}/configuration.yaml`,
          templateFile: DeploymentFile[DeploymentSolution.azureSwa]
        }
      } 
      if (repoHost === RepoHost.github) {
        // TODO: GH Actions yml
        return {
        type: 'add',
        path: '',
        templateFile: '',
      }}
    case DeploymentSolution.githubPages:
      if (repoHost === RepoHost.github) {
        return {
          type: 'add',
          path: `${root}/.github/workflows/deploy.yaml`,
          templateFile: DeploymentFile[DeploymentSolution.githubPages]
        }
      }
      if(repoHost === RepoHost.azureRepos) {
        // TODO: Azure => GH actions deployment (I don't think you should actually do this)
        return {
          type: 'add',
          path: '',
          templateFile: '',
        }
      }
    default:
      return {
      type: 'add',
      templateFile: '',
      path: '',
    }
  }
}

export const buildActionsArray = (projectName: string, library: FrontendLibrary, repoHost: RepoHost, deploymentSolution: DeploymentSolution): ActionType[] => {
  const root = `../${projectName}`;
  const arr: Actions = [];
  arr.push(
    // library package.json
    getPackageJsonAction(root, library),
    // deployment config
    getDeploymentAction(root, repoHost, deploymentSolution),
  );
  return arr;
}
