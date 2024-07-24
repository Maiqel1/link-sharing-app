import React from "react";
import { FacebookLogo, GithubLogo,GitlabLogo,LinkedinLogo, StackOverflowLogo, TwitchLogo, TwitterLogo, YoutubeLogo } from "phosphor-react";

export const linkOptions = [
    { platform: 'Select a platform', color: '',  },
    { platform: 'GitHub', color: '#1A1A1A', logo: <GithubLogo size={16} weight="fill"/> },
    { platform: 'LinkedIn', color: '#2D68FF', logo: <LinkedinLogo size={16} weight="fill"/> },
    { platform: 'Twitter', color: '#43B7E9', logo: <TwitterLogo size={16} /> },
    { platform: 'Youtube', color: '#EE3939', logo: <YoutubeLogo size={16} /> },
    { platform: 'Facebook', color: '#2442AC', logo: <FacebookLogo size={16} /> },
    { platform: 'Twitch', color: '#EE3FC8', logo: <TwitchLogo size={16} /> },
    { platform: 'Gitlab', color: '#EB4925', logo: <GitlabLogo size={16} /> },
    { platform: 'Stack Overflow', color: '#EC7100', logo: <StackOverflowLogo size={16} /> },

  ];
  