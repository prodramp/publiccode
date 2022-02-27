# Clone private GitHub repo from single line command #

1. First get your access token

From your Github account, 
- Go to Settings
- Developer Settings
- Personal Access Token
- Generate New Token (Give your password)
- Check all the items which are applicable in the token release form
- Click Generate token
- Copy the generated Token to be used in the command below 

2. Here is the command format:

https://<PERSONAL-ACCESS-TOKEN>@github.com/<actual_github_account_name(not-email)" >/<repo_name>.git

3. Here is the command:

```
$ git clone https://[ghp_YOUR_ACCESS_TOKEN]@github.com/[YOUR_ACCOUNT_NAME]/[YOUR_REPO_NAME].git

```

Thants all.
