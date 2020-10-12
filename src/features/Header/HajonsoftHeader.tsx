import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import EmojiPeopleOutlinedIcon from '@material-ui/icons/EmojiPeopleOutlined';
import NaturePeopleOutlinedIcon from '@material-ui/icons/NaturePeopleOutlined';
import PeopleIcon from '@material-ui/icons/People';
import StorageOutlinedIcon from '@material-ui/icons/StorageOutlined';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import React from 'react';
import logo from '../../images/allied_logo_svg.svg';
import smallLogo from '../../images/AU_initials.png';
import AppHeader from '../shared/components/AppHeader/AppHeader';
import { IHeaderConfig } from '../shared/components/interfaces';

const HajonsoftHeader: React.FC = () => {
  const config: IHeaderConfig = {
    logo,
    smallLogo,
    elevation: 2,
    sideMenu: {
      title: "HajOnSoft",
      items: [
        {
          title: "Dashboard",
          icon: DashboardOutlinedIcon,
        },
        {
          title: "Personnel Scheduling",
          icon: EmojiPeopleOutlinedIcon,
          menuItems: [
            { title: "Master", icon: NaturePeopleOutlinedIcon },
            { title: "Confirmed", icon: PeopleIcon },
            { title: "Archived", icon: SupervisedUserCircleIcon },
          ],
        },
        { title: "Jobs", icon: AccountTreeOutlinedIcon },
        { title: "Compliance", icon: AccountTreeOutlinedIcon },
        { title: "PSTT", icon: AccountTreeOutlinedIcon },
        {
          title: "Self Help",
          icon: AccountTreeOutlinedIcon,
          menuItems: [
            { title: "Ticket System", icon: NaturePeopleOutlinedIcon },
            { title: "Uniform", icon: PeopleIcon },
            { title: "Certifications", icon: SupervisedUserCircleIcon },
          ],
        },
      ],
    },
    buttons: [
      {
        title: "Help",
        icon: ContactSupportIcon,
        menuItems: [{ title: "Firebase", icon: StorageOutlinedIcon }],
      },
    ],
    bookmarks: [],
  };

  return <AppHeader config={config} />;
};

export default HajonsoftHeader;
