const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    try {
        const token = core.getInput('token', {required: true});
        const owner = core.getInput('owner', {required: true}); 
        const repo = core.getInput('repo', {required: true}); 
        const reviewers = core.getInput('reviewers'); 
        const user_reviewers = reviewers.split(',');
        const team_reviewers = core.getInput('team_reviewers'); 
        const slug_reviewers = team_reviewers.split(',');
        const octokit = new github.getOctokit(token); 

        if (octokit.context.payload.pull_request == null) {
            core.setFailed("No pull request found.");
            return;
        }
    
        if(reviewers != '') {
            await octokit.rest.pulls.requestReviewers({
                owner: owner,
                repo: repo,
                pull_number: octokit.context.payload.pull_request.number,
                reviewers: user_reviewers
            });
        }
        
        else if(team_reviewers != '') {
            await octokit.rest.pulls.requestReviewers({
                owner: owner,
                repo: repo,
                pull_number: octokit.context.payload.pull_request.number,
                team_reviewers: slug_reviewers
            });
        }

        else if(reviewers != '' && team_reviewers != '') {
            await github.rest.pulls.requestReviewers({
                owner: owner,
                repo: repo,
                pull_number: octokit.context.payload.pull_request.number,
                reviewers: user_reviewers,
                team_reviewers: slug_reviewers
            });
        }
        else {
            console.log("No reviewers or team reviewers specified");
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

main();
