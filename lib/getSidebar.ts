import getFileContent from '@/utils/getFile';
import { NavbarLink, Site } from '@prisma/client';

const getSidebar = async (
  siteData:
    | (Site & {
        navbarLinks: NavbarLink[];
      })
    | null
) => {
  const sidebarFileContent = await getFileContent(
    siteData?.repoLink || '',
    '_sidebar.txt',
    siteData?.gitHubAccessToken || ''
  );

  const sidebar = sidebarFileContent
    .trim()
    .split('\n')
    .map((file) => file.trim().replace(/\.md$/, ''));

  return sidebar;
};

export default getSidebar;
