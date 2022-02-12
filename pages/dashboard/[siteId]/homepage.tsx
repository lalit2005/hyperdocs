import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TextSmall } from '@/components/ui/Typography';
import { Site } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';

const Blog = () => {
  return (
    <DashboardLayout
      title='Homepage'
      subtitle={`Create the homepage of your documentation with pre-made components. Want a new component? Just ask for it [here](https://github.com/lalit2005/hyperdocs/issues/new)`}
      active='homepage'>
      Homepage
    </DashboardLayout>
  );
};

export default Blog;
