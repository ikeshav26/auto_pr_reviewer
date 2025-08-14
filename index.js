const core = require('@actions/core');
const github = require('@actions/github');
const OpenAI = require('openai');

async function run() {
  try {
    const token = process.env.OPENAI_API_KEY;
    const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
    const { context } = github;
    const { pull_request } = context.payload;

    if (!pull_request) {
      core.setFailed('No PR found');
      return;
    }

    const diffResponse = await octokit.request(
      'GET /repos/{owner}/{repo}/pulls/{pull_number}',
      {
        owner: context.repo.owner,
        repo: context.repo.repo,
        pull_number: pull_request.number,
        mediaType: { format: 'diff' }
      }
    );

    const diff = diffResponse.data;

    const openai = new OpenAI({ apiKey: token });

    const gptResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a senior code reviewer.' },
        { role: 'user', content: `Review the following PR diff:\n\n${diff}` }
      ]
    });

    const reviewComment = gptResponse.choices[0].message.content;

    await octokit.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: pull_request.number,
      body: reviewComment
    });

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();