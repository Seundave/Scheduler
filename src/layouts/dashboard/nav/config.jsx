// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'home',
    path: '/dashboard/app',
    icon: icon('ic_home'),
  },
  {
    title: 'Admin',
    path: '/dashboard/admin',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'schedules',
  //   path: '/dashboard/schedule',
  //   icon: icon('ic_schedule'),
  // },
  {
    title: 'gallery',
    path: '/dashboard/gallery',
    icon: icon('ic_gallery'),
  },
  {
    title: 'History',
    path: '/dashboard/history',
    icon: icon('ic_history'),
  },
  {
    title: 'logout',
    path: '/logout',
    icon: icon('ic_logout'),
    dropdown:false
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
