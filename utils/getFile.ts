import { Octokit } from 'octokit';
import parseGitHubUrl from 'parse-gitHub-url';

const getFileContent = async (
  repoLink: string,
  fileName: string,
  gitHubAccessToken?: string
) => {
  const octokit = new Octokit({
    auth: gitHubAccessToken,
  });

  const repoLinkData = parseGitHubUrl(repoLink);

  const fileContent = await octokit.rest.repos.getContent({
    owner: repoLinkData?.owner as string,
    repo: repoLinkData?.repo?.split('/')[1] as string,
    path: `docs/${fileName}`,
  });

  const decodedFileContent = Buffer.from(
    // @ts-ignore
    fileContent.data?.content,
    'base64'
  ).toString('utf8');

  return decodedFileContent;
};

export default getFileContent;
