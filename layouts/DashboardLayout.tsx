import DashboardNav from '@/components/DashboardNav';

const DashboardLayout = ({ ...props }) => {
  return (
    <div>
      <DashboardNav />
      {props.children}
    </div>
  );
};

export default DashboardLayout;
