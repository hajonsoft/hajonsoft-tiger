import { Grid } from "@material-ui/core";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import HeadsetMicOutlinedIcon from "@material-ui/icons/HeadsetMicOutlined";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import React from "react";
import AppHeader from "../../shared/macaw/AppHeader";
import HelpCard from "./helpCard";
import PlayCircleFilledOutlinedIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import t from '../../shared/util/trans';

const helpCards = [
  {
    title: t('live-chat'),
    icon: <HeadsetMicOutlinedIcon style={{ fontSize: 80, color: "silver" }} />,
    content:
      t('live-chat-is-available-monday-friday-9am-5pm-pst-and-in-many-cases-after-hours-and-weekends-contact-us-at-1-949-522-1879-whatsapp-viber-etc'),
  },
  {
    title: t('group-chat'),
    icon: <MessageOutlinedIcon style={{ fontSize: 80, color: "silver" }} />,
    content:
      t('group-chat-with-us-on-whatsapp-slack-telegram-or-bip-if-you-are-not-already-a-member-in-a-group-please-send-us-a-live-chat-request-we-will-introduce-you-to-a-number-of-groups'),
  },
  {
    title: "E-MAIL",
    icon: <EmailOutlinedIcon style={{ fontSize: 80, color: "silver" }} />,
    content:
      t('send-us-an-email-to-hajonsoft-gmail-com-or-create-a-help-ticket-in-slack-creating-a-ticket-is-easy-tickets-are-a-great-way-to-keep-a-request-visible'),
  },
  {
    title: "BOOK A MEETING",
    linkElement: (
      <a href="https://meetings.hubspot.com/haj-onsoft">{t('schedule-a-meeting-0')} </a>
    ),
    icon: <EventOutlinedIcon style={{ fontSize: 80, color: "silver" }} />,
    content:
      t('book-a-live-meeting-for-training-or-support-we-will-use-google-meet-to-screen-share-since-the-technician-who-will-meet-you-may-be-in-a-different-time-zone-it-is-important-to-use-this-link-to'),
  },
  {
    title: t('community-support'),
    linkElement: (
      <span> <a href="https://hajonsoft.on.spiceworks.com/portal">{t('tickets')}</a><span> or </span><a href="https://on.spiceworks.com">{t('join-the-community')}</a></span>
    ),
    icon: <FavoriteBorderOutlinedIcon style={{ fontSize: 80, color: "silver" }} />,
    content:
      t('visa-by-proxy-service-does-not-cover-payments-to-a-third-party-provider-you-are-the-responsible-verifier-to-the-data-track'),
  },
  {
    title: t('video-library'),
    linkElement: <a href="https://hajonsoft.talentlms.com/shared/start/key:LZSIDNHR"> {t('watch-video')}</a>,
    icon: <PlayCircleFilledOutlinedIcon style={{ fontSize: 80, color: "silver" }} />,
    content: t('watch-how-to-videos-to-learn-about-many-different-features-click-here-to'),
  },
];
const Help = () => {
  return (
    <React.Fragment>
      <AppHeader />

      <div
        style={{
          display: "flex",
          padding: "10rem",
          justifyContent: "center",
        }}
      >
        <Grid container justify="center" spacing={4} alignItems="center">
          {helpCards.map((help) => (
            <HelpCard
              title={help.title}
              iconElement={help.icon}
              content={help.content}
              linkElement={help.linkElement}
            />
          ))}
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Help;
