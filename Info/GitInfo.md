# How to push and pull:

- Before committing to the project, please make sure that you are on a separate branch. **Avoid committing directly to the main branch.**
- Create a pull request when you want to merge your work with the main branch. 
- When approving a pull request, please **choose** the **Squash and merge** option instead of the default Create a merge commit. (These options are only visible on GitHub.com.). Squash and merge is used to keep commit history in the main branch clean.

Each branch is used for a separate feature (or bug fix). When the feature is ready, it is merged with the main branch.)
Branch name must start as follows:
- The branch name should start with the first letter of the person's first name and the first letter of their surname.
- Then, the branch name should contain the task number.
- Lastly, the branch name should contain the name of the feature or bug fix.

Example:
- Branch name: `AA-1-Add-Login-Page`
- This branch name is used for the task number 1 and the feature is to add a login page.

[Task table](Tasks.xlsx) (excel file)

# commit message

The commit may include hashtags such as:
- `#bug` - for bug fixes
- `#feature` - for new features
- `#refactor` - for code refactoring
- `#test` - for adding tests
- `#docs` - for documentation changes
- `#perf` - for performance improvements
<?--
- `#style` - for code style changes
- `#revert` - for reverting changes 
- `#chore` - for changes that do not affect the code
- `#ci` - for changes in the CI/CD pipeline
- `#security` - for security improvements
- `#breaking` - for changes that break backward compatibility
- `#other` - for other changes
- `#wip` - for work in progress
- `#release` - for release commits
- `#hotfix` - for hotfixes
--?>

[Main page](../README.md)