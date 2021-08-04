import { Grid } from "@material-ui/core";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import HeadsetMicOutlinedIcon from "@material-ui/icons/HeadsetMicOutlined";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import React from "react";
import AppHeader from "../shared/components/AppHeader/AppHeader";
import HelpCard from "./helpCard";
import PlayCircleFilledOutlinedIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

const helpCards = [
  {
    title: "LIVE CHAT",
    icon: <HeadsetMicOutlinedIcon style={{ fontSize: 80, color: "silver" }} />,
    content:
      "Live Chat is available Monday-Friday 9AM-5PM PST and in many cases after hours & weekends. Contact us at +1 949-522-1879 whatsapp, viber, etc...",
  },
  {
    title: "GROUP CHAT",
    icon: <MessageOutlinedIcon style={{ fontSize: 80, color: "silver" }} />,
    content:
      "Group chat with us on whatsapp, slack, telegram or BiP. If you are not already a member in a group please send us a live chat request. We will introduce you to a number of groups. ",
  },
  {
    title: "E-MAIL",
    icon: <EmailOutlinedIcon style={{ fontSize: 80, color: "silver" }} />,
    content:
      "Send us an email to hajonsoft@gmail.com or Create a Help Ticket in slack. Creating a ticket is easy. Tickets are a great way to keep a request visible",
  },
  {
    title: "BOOK A MEETING",
    linkElement: (
      <a href="https://meetings.hubspot.com/haj-onsoft">schedule a meeting </a>
    ),
    icon: <EventOutlinedIcon style={{ fontSize: 80, color: "silver" }} />,
    content:
      "Book a live meeting for training or support, we will use google meet to screen share.... Since the technician who will meet you may be in a different time zone, it is important to use this link to ",
  },
  {
    title: "COMMUNITY SUPPORT",
    linkElement: (
      <span> <a href="https://hajonsoft.on.spiceworks.com/portal">Tickets</a><span> or </span><a href="https://hajonsoft.on.spiceworks.com/portal">join the community</a></span>
    ),
    icon: <FavoriteBorderOutlinedIcon style={{ fontSize: 80, color: "silver" }} />,
    content:
      "visa by proxy service does not cover payments to a third party provider. You are the responsible verifier to the data. Track ",
  },
  {
    title: "VIDEO LIBRARY",
    linkElement: <a href="https://hajonsoft.talentlms.com/shared/start/key:LZSIDNHR"> watch video</a>,
    icon: <PlayCircleFilledOutlinedIcon style={{ fontSize: 80, color: "silver" }} />,
    content: 'Watch "how to" videos to learn about many different features. click here to ',
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
