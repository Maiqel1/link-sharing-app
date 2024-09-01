export interface Link {
    id?: string;
    platform: string;
    url: string;
  }
  
  export interface Profile {
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
  }
  
  export interface UserData {
    links: Link[];
    profile: Profile;
  }
  
  export interface LinkOption {
    platform: string;
    color: string;
    logo: React.ReactNode;
  }
  
  export interface LinkContextProps {
    links: Link[];
    profile: Profile;
    addLink: (link: Link) => void;
    removeLink: (id: string) => void;
    updateLink: (link: Link) => void;
    setProfile: (profile: Profile) => void;
    user: any;
    signUp: (email: string, password: string) => void;
    signIn: (email: string, password: string) => void;
    signOutUser: () => void;
    shareableLink: string | null;
    generateShareableLink: () => Promise<string>;
  }