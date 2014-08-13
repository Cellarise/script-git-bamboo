# {name}
[![view on npm](http://img.shields.io/npm/v/{name}.svg)](https://www.npmjs.org/package/{name})
[![npm module downloads per month](http://img.shields.io/npm/dm/{name}.svg)](https://www.npmjs.org/package/{name})
[![Dependency Status](https://david-dm.org/Cellarise/{name}.svg)](https://david-dm.org/Cellarise/{name})

> {description}


##Installation 

Install as a global package to call git-bamboo from any location.

This git-bamboo command executes bash scripts which require the git command and ssh.  

We recommend using [CYGWIN](https://www.cygwin.com/) and installing the following:
* in devel : git-completion, git-gui and gitk
* in net : openssh


##Usage 

### From the command line

The git-bamboo command accepts one argument - the name of the bash script to be executed.

```cmd
git-bamboo Git-clone
```

Each bash script uses Atlassian Bamboo build variables.  These variables can be set manually if calling the script outside of Atlassian Bamboo or if you want to override the variable.  For example, to override the build repository:

```cmd
set bamboo_planRepository_repositoryUrl="git@github.com:Cellarise/script-git-bamboo.git"
git-bamboo Git-clone
```


#Scripts

##Git-clone

Clone the first repository linked to the bamboo build plan. Clone into folder Git.

```sh
git clone "$bamboo_planRepository_repositoryUrl" Git
exit
```

##Git-release-version

Clone the first repository linked to the bamboo build plan. Clone into folder Git. Then create a new branch to track the change and tag it with the Atlassian Bamboo Jira version. Finally merge the release branch into the production branch.

```sh
git clone "$bamboo_planRepository_repositoryUrl" Git
cd Git
git checkout master
git checkout -b "release/$bamboo_jira_version"
git tag -a "v$bamboo_jira_version" -m "Release v$bamboo_jira_version"
git push origin "release/$bamboo_jira_version" --tags
git checkout production
git merge "release/$bamboo_jira_version"
git tag -a "v$bamboo_jira_version" -m "Release v$bamboo_jira_version" production
git push origin production --tags
exit
```

##Github-clone

Clone repository from github using the Atlassian Bamboo Jira project name. Clone into folder Build.

```sh
git clone git@github.com:"$bamboo_jira_projectName".git Build
exit
```

##Github-release-version

Stage all changes, commit, and push to the master branch.  Then create a new branch to track the change and tag it with the Atlassian Bamboo Jira version.

```sh
git rm . -r --cached
git add .
git status
git commit -m "Deploy release $bamboo_jira_version"
git push origin master
git checkout -b "release/$bamboo_jira_version"
git tag -a "v$bamboo_jira_version" -m "Release v$bamboo_jira_version"
git push -u origin "release/$bamboo_jira_version" --tags
exit
```


# License

MIT License (MIT)

Copyright (c) 2014 {author}