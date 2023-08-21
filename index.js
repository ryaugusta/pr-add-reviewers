const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const token = core.getInput('token', { required: true });
        const reviewers = core.getInput('reviewers');
        const user_reviewers = reviewers.split(',');
        const team_reviewers = core.getInput('team_reviewers');
        const slug_reviewers = team_reviewers.split(',');
        const octokit = github.getOctokit(token);
        const context = github.context;

        if (context.payload.pull_request == null) {
            core.setFailed("No pull request found.");
            return;
        }

        const owner = context.repo.owner;
        const repo = context.repo.repo;
        const pr_number = context.payload.pull_request.number;

        if (reviewers) {
            const params = {
                owner: owner,
                repo: repo,
                pull_number: pr_number,
                reviewers: user_reviewers,
            }
            await octokit.rest.pulls.requestReviewers(params);
        }
        
        else if (team_reviewers) {
            const params = {
                owner: owner,
                repo: repo,
                pull_number: pr_number,
                team_reviewers: slug_reviewers,
            }
            await octokit.rest.pulls.requestReviewers(params);
        }

        else if (reviewers && team_reviewers) {
            const params = {
                owner: owner,
                repo: repo,
                pull_number: pr_number,
                reviewers: user_reviewers,
                team_reviewers: slug_reviewers,
            };
            await octokit.rest.pulls.requestReviewers(params);
        }

        else {
            console.log("No reviewers or team reviewers specified");
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();


// const core = require('@actions/core');
// const github = require('@actions/github');

// async function run() {
//     const token = core.getInput('token', {required: true});
//     const reviewers = core.getInput('reviewers'); 
//     const user_reviewers = reviewers.split(',');
//     const team_reviewers = core.getInput('team_reviewers'); 
//     const slug_reviewers = team_reviewers.split(',');
//     const octokit = new github.getOctokit(token); 
//     const context = github.context;
//     const owner = context.repo.owner;
//     const repo = context.repo.repo;
//     const pr_number = context.payload.pull_request.number;

//     const params = {
//         owner: owner,
//         repo: repo,
//         pr_number: pr_number,
//         reviewers: user_reviewers,
//         team_reviewers: slug_reviewers
//     };

//     try {

//         if (context.payload.pull_request == null) {
//             core.setFailed("No pull request found.");
//             return;
//         }
        
//         if(reviewers != '') {
//             await octokit.rest.pulls.requestReviewers({
//                 params,
//             });
//         } 
//         else if(team_reviewers != '') {
//             await octokit.rest.pulls.requestReviewers({
//                 params,
//             });
//         } 
//         else {
//             await octokit.rest.pulls.requestReviewers({
//                 params,
//             });
//         } 
//     } catch (error) {
//         console.log("No reviewers or team reviewers specified");
//         core.setFailed(error.message)
//     }
// }

// run();
