import { CustomLink } from '@/components/ui/Link';
import { Markdown, TextSmall } from '@/components/ui/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Feedback, NavbarLink, Site } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/router';
import { Octokit } from 'octokit';
import useSWR from 'swr';
import parseGhUrl from 'git-url-parse';
import { useState } from 'react';
import Badge from '@/components/docs/documentation/Badge';

const Index = () => {
  const router = useRouter();
  const siteId = router.query.siteId as string;

  const [repoData, setRepoData] = useState([]);

  const { data } = useSWR<
    Site & {
      navbarLinks: NavbarLink[];
      feedbacks: Feedback[];
    }
  >(`/api/get/site/?siteId=${siteId}`);

  const octokit = new Octokit({
    auth: data?.gitHubAccessToken,
  });

  const repoLinkData = data && parseGhUrl(data?.repoLink);

  data &&
    octokit.rest.repos
      .getContent({
        owner: repoLinkData?.owner as string,
        repo: repoLinkData?.full_name.split('/')[1] as string,
        path: `docs`,
      })
      .then((data) => {
        // @ts-ignore
        setRepoData(data.data);
      });

  console.log(repoData);

  return (
    <DashboardLayout
      siteName={data?.siteName}
      active='overview'
      title='Overview'
      subtitle={`A brief overview and status of **${
        data?.siteName || '...'
      }**`}>
      <div>
        <CustomLink
          className='my-2 mr-2 block sm:my-auto sm:inline'
          href={`https://hyperdocs.netlify.app/${data?.siteSlug}`}
          target='_blank'
          noInvert
          rel='noopener noreferrer'>
          Visit site
        </CustomLink>
        <CustomLink
          className='my-2 mr-2 block sm:my-auto sm:inline'
          noInvert
          href={`https://pagespeed.web.dev/report/?url=https://hyperdocs.netlify.app/${data?.siteSlug}`}
          target='_blank'
          rel='noopener noreferrer'>
          View Lighthouse score
        </CustomLink>
        <CustomLink
          className='my-2 block sm:my-auto sm:inline'
          noInvert
          href={data?.repoLink}
          target='_blank'
          rel='noopener noreferrer'>
          View repository on GitHub
        </CustomLink>
      </div>
      <div className='mt-10'>
        {/* <pre>{data && JSON.stringify(repoData, null, 2)}</pre> */}
        {data && repoData.length === 0 && (
          <div className='my-5'>
            <Badge color='red'>
              No docs found. Please make sure you have a folder named{' '}
              <code>`docs`</code> in your repository. More info{' '}
              <a
                href='https://hyperdocs.netlify.app/hyperdocs/docs/getting-started'
                target='_blank'
                className='underline'
                rel='noopener noreferrer'>
                here
              </a>
            </Badge>
          </div>
        )}

        {data &&
          repoData.length > 0 &&
          // @ts-ignore
          repoData.filter((file) => file.name.includes('.md')).length === 0 && (
            <div className='my-5 max-w-3xl'>
              <Badge block color='red'>
                You seem to have a non markdown file in your docs folder. <br />{' '}
                Please make sure <code>`docs/`</code> folder only contains
                markdown files and a <code>`_sidebar.txt`</code>. More info{' '}
                <a
                  href='https://hyperdocs.netlify.app/hyperdocs/docs/getting-started#all-done'
                  target='_blank'
                  className='underline'
                  rel='noopener noreferrer'>
                  here
                </a>
              </Badge>
            </div>
          )}

        {/* if everything is fine, show a success message */}
        {data &&
          repoData.length > 0 &&
          // @ts-ignore
          repoData.filter((file) => file.name.includes('.md')).length > 0 && (
            <div className='my-5'>
              <Badge color='green'>
                All good!! {data?.siteName} seems to have no problem!
              </Badge>
            </div>
          )}

        <TextSmall>
          <Markdown
            text={`Site was last updated **${
              (data?.updatedAt &&
                formatDistanceToNow(new Date(data?.updatedAt), {
                  addSuffix: true,
                })) ||
              '...'
            }**`}
          />
        </TextSmall>
      </div>
    </DashboardLayout>
  );
};

export default Index;
