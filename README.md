 # Add Reviewers to Pull Request

This action will add reviewers to a pull request. It will not add reviewers that are not collaborators on the repository.
### Inputs
| Name      | Description | Required|
| :----------     | :----   | :----:
| `reviewers`     | List of user `logins`, comma separated, that will be requested. Must be collaborators.| _no_ |
| `team_reviewers`| List of `team names`, comma separated, that will be requested. Must be collaborators.   | _no_ |
| `token`| `${{ secrets.GITHUB_TOKEN }}` | *yes*

### Example Usage:
*You must provide either `reviewers`, `team_reviewers` or both for this action to run.*  

Add reviewer(s) to a pull request on the working repository
```yaml
...
- uses: ryaugusta/pr-add-reviewers-action@v1
  with:
    token: ${{ github.token }}
    reviewers: '<user_name>'
    # team_reviewers: '<team_name>'
...
```

### Note
In some cases you may see an error where there are invalid permissions if using the `GITHUB_TOKEN` secret. You can add specific [permissions](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token) in your workflow for this:

```yaml
runs-on: ubuntu-latest
permissions: write-all 
steps:
...
```
### License
[MIT](https://github.com/ryaugusta/pr-add-reviewers-action/blob/main/LICENSE)