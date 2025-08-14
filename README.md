# Auto PR Reviewer

A GitHub Action that automatically reviews Pull Requests using Google's Gemini AI and posts intelligent code review comments.

## Features

- 🤖 **AI-Powered Reviews**: Uses Google Gemini AI for intelligent code analysis
- 📝 **Automatic Comments**: Posts review comments directly on PRs
- 🔍 **Diff Analysis**: Analyzes the complete diff of PR changes
- ⚡ **Fast Processing**: Quick turnaround on review generation
- 🔧 **Easy Setup**: Simple configuration with minimal setup required

## Prerequisites

- A Google AI API key (for Gemini access)
- GitHub repository with Actions enabled
- Proper permissions for the GitHub token to comment on PRs

## Setup

### 1. Get Google AI API Key

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Create an account or sign in
3. Generate an API key for Gemini
4. Copy the API key for use in the next step

### 2. Add Repository Secrets

Add the following secrets to your GitHub repository:

1. Go to your repository → Settings → Secrets and variables → Actions
2. Add a new repository secret:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your Google AI API key

### 3. Create Workflow File

Create `.github/workflows/pr-review.yml` in your repository:

```yaml
name: PR Review

on:
  pull_request:
    types: [opened, synchronize]

permissions:
  contents: read
  pull-requests: write
  issues: write

jobs:
  review:
    runs-on: ubuntu-latest
    
    steps:
    - name: Auto PR Review
      uses: ikeshav26/auto_pr_reviewer@main
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

## Usage

Once set up, the action will automatically:

1. **Trigger** on new PRs or when PRs are updated
2. **Analyze** the diff of all changes in the PR
3. **Generate** an intelligent review using Gemini AI
4. **Post** the review as a comment on the PR

## Permissions

The action requires the following permissions:

- `contents: read` - To read the repository content
- `pull-requests: write` - To comment on pull requests
- `issues: write` - To create issue comments (PRs are issues)

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | Yes | Automatically provided by GitHub Actions |
| `GEMINI_API_KEY` | Yes | Your Google AI API key for Gemini access |

### Action Inputs

| Input | Required | Description |
|-------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google AI API key for accessing Gemini |

## Example Review Output

The AI reviewer will analyze your code changes and provide feedback such as:

- Code quality improvements
- Potential bugs or issues
- Best practice suggestions
- Security considerations
- Performance optimization tips

## Troubleshooting

### Common Issues

1. **"No PR found" error**
   - Ensure the workflow is triggered on `pull_request` events
   - Check that the workflow file is in the correct location

2. **Permission denied errors**
   - Verify that the `GITHUB_TOKEN` has proper permissions
   - Ensure the workflow has `pull-requests: write` permission

3. **Gemini API errors**
   - Check that your `GEMINI_API_KEY` is valid and not expired
   - Ensure you have sufficient API quota

### Debug Mode

To enable debug logging, add this to your workflow:

```yaml
- name: Auto PR Review
  uses: ikeshav26/auto_pr_reviewer@main
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
    ACTIONS_RUNNER_DEBUG: true
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Author

Keshav Gilhotra

## Changelog

### v1.0.0

- Initial release with Gemini AI integration
- Automatic PR review and commenting functionality
- Support for diff analysis and intelligent feedback

## Support

If you encounter any issues or have questions:

1. Check the [troubleshooting section](#troubleshooting)
2. Open an issue in this repository
3. Provide detailed information about the error and your setup

---

⭐ If you find this action helpful, please give it a star!