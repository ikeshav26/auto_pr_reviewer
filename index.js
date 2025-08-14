const core = require('@actions/core');
const github = require('@actions/github');
const { GoogleGenAI } = require('@google/genai'); 

async function run() {
  try {
    const token = process.env.GEMINI_API_KEY;
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

    
    const gemini = new GoogleGenAI({ apiKey: token });

    
    const geminiResponse = await gemini.models.generateContent({
      model: 'gemini-2.0-flash-001', 
      contents: `You are a senior code reviewer.\nReview the following PR diff:\n\n${diff}`
    });

    const reviewComment = geminiResponse?.text || 'No review generated.';

    
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